import { goto } from "$app/navigation";
import { playerState } from "$lib/state/userstate.svelte";
import type { ApiResponse, ApiResponseFailure, ApiResponseSuccess, Row } from "$lib/types/types";

export interface GameServices {
    CreateLobby: (rows: Row[]) => Promise<void>
    JoinLobby: (id: string) => Promise<void>
}

function GameService(url: string): GameServices {

    const CreateLobby = async (rows: Row[]) => {
        const resp = await fetch(`${url}/createlobby`, {
            method: "POST",
            body: JSON.stringify(rows),
        });

        let msg: ApiResponse = await resp.json();
        let data = msg.data;

        if (msg.kind === "err") {
            data = data as ApiResponseFailure;
            console.error(data.err);
            return;
        }
        data = msg.data as ApiResponseSuccess;
        console.log(data.message);
        JoinLobby(data.message)
        goto(`lobbies/${data.message}`);

    }

    const JoinLobby = async (id: string) => {
        const sock = new WebSocket(`${url}/joinlobby`);
        sock.addEventListener("open", () => {
            console.log("Opened connection");
            sock.send(id);
        });

        sock.addEventListener("message", (msg) => {
            let resp: ApiResponse = JSON.parse(msg.data);
            let data = resp.data;
            switch (resp.kind) {
                case "err":
                    data = data as ApiResponseFailure;
                    console.error(data.err);
                    break;
                case "joinedLobby":
                    data = data as ApiResponseSuccess;
                    console.log("Message received", data.message);
                    goto(`/lobbies/${id}`);
                case "playersJoined":
                    data = data as ApiResponseSuccess;
                    playerState.players = data.message
                    console.log("Message received", data.message);

                case "createdLobby":
                    break;
            }
        });
    }
    return { JoinLobby, CreateLobby }
}

export default GameService
