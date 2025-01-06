import type { PageLoad } from '../../lobbies/[slug]/$types';

export const load: PageLoad = ({ params }) => {
    return {
        params: {
            slug: params.slug,
        }
    };
};
