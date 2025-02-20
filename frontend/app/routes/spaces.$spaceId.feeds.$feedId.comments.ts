import { ActionFunction, data, LoaderFunction } from "@remix-run/node";
import { requestGetFeedComments, requestPostFeedComment, requestPostFeedReply } from "~/network";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const feedId = pathParts[pathParts.indexOf('feeds') + 1];
    const spaceId = pathParts[pathParts.indexOf('spaces') + 1];

    try {
        const comments = await requestGetFeedComments(spaceId, feedId);

        return data(comments);
    } catch (error) {
        // TODO handle errors
        console.error('Error fetching comments:', error);
        throw new Response('Error fetching comments', { status: 500 });
    }
};

export const action: ActionFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const feedId = pathParts[pathParts.indexOf('feeds') + 1];
    const spaceId = pathParts[pathParts.indexOf('spaces') + 1];

    try {
        if (request.method === 'POST') {
            const formData = await request.formData();
            const body = formData.get('body');
            const parentId = formData.get('parentId');
            const userId = formData.get('userId');
            console.log('parentId', parentId, body);

            if (!userId) {
                throw new Error('User ID is required for posting a comment');
            }
            // TODO add validation on body
            if (!body) {
                throw new Error('Comment body is required');
            }

            const comment = !parentId ?
                await requestPostFeedComment(spaceId, feedId, userId, body) :
                await requestPostFeedReply(spaceId, feedId, userId, body, parentId);

            return data(comment);
        }
    } catch (error) {
        console.error('Error handling comment operation:', error);
        throw new Response('Error processing comment operation', { status: 500 });
    }
};
