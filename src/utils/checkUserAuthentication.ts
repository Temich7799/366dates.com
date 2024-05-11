export async function checkUserAuthentication(userId: string) {

    const requestOptions: any = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    };

    try {
        const response = await fetch(`/api/auth/me?userId=${userId}`, requestOptions);
        return response.ok;
    } catch (error: any) {
        console.error('Error fetching user authentication:', error.message);
        throw error;
    }
}
