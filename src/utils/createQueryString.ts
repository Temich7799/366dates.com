export default function createQueryString(params: any): string {

    const searchParams = new URLSearchParams();

    for (const key in params) {

        const value = params[key];

        if (value) {
            searchParams.append(key, value);
        }
    }

    return `?${searchParams.toString()}`;
};