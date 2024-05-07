export async function GET(req, res) {

    const {
        cookies
    } = req;

    if (!cookies.authToken) {
        return Response.json('User not authenticated', {
            status: 401
        });
    }

    return Response.json('User authenticated');
}