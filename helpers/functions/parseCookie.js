export function parseCookie(cookieString) {
    const cookies = {};

    cookieString.split(';').forEach(cookie => {
        const [key, value] = cookie.trim().split('=');

        if (key) {
            cookies[decodeURIComponent(key)] = decodeURIComponent(value || '');
        }
    });
    return cookies;
}
