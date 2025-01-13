import { goto } from "$app/navigation";
import { playerState } from "$lib/state/userstate.svelte";
import type { ApiResponse, ApiResponseFailure, ApiResponseSuccess, Row } from "$lib/types/types";

export interface GameServices {
    CreateLobby: (rows: Row[], nickname: string) => Promise<void>
    JoinLobby: (id: string, nickname: string) => Promise<void>
}

function GameService(url: string): GameServices {

    const CreateLobby = async (rows: Row[], nickname: string) => {
        const resp = await fetch(`${url}/createlobby`, {
            method: "POST",
            body: JSON.stringify({
                "gameRows": rows,
                "creatorNickname": nickname
            }),
        });

        let msg: ApiResponse = await resp.json();
        console.log(msg)
        let data = msg.data;

        if (msg.kind === "err") {
            data = data as ApiResponseFailure;
            console.error(data.err);
            return;
        }
        data = msg.data as ApiResponseSuccess;
        console.log(data.message.code);
        JoinLobby(data.message.code, nickname)
        goto(`lobbies/${data.message.code}`);

    }

    const JoinLobby = async (id: string, nickname: string) => {
        const sock = new WebSocket(`${url}/joinlobby`);
        sock.addEventListener("open", () => {
            console.log("Opened connection");
            sock.send(JSON.stringify({ code: id, nickname }));
        });

        sock.addEventListener("message", (msg) => {
            let resp: ApiResponse = JSON.parse(msg.data);
            let data = resp.data;
            console.log(data)
            switch (resp.kind) {
                case "err":
                    data = data as ApiResponseFailure;
                    console.error(data.err);
                    break;
                case "joinedLobby":
                    data = data as ApiResponseSuccess;
                    console.log("Message received", data.message);
                    goto(`/lobbies/${id}`);
                    break
                case "playersJoined":
                    data = data as ApiResponseSuccess;
                    playerState.players = data.message
                    console.log("Message received", data.message);
                    break
                case "createdLobby":
                    break;
            }
        });
    }
    return { JoinLobby, CreateLobby }
}

export default GameService
