async function api(method, url, data) {
    const options = {};
    if (method !== "GET") {
        options.method = method;

        if (data) {
            if (url !== `http://localhost:3003/data/sell`) {
                options.headers = {
                    'Content-Type': 'application/json'
                };
    
                options.body = JSON.stringify(data);
            } else {
                options.body = data
            }
        }
    }

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
        const token = user.accessToken;
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        };
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}

export async function get(url) {
    return api('GET', url);
}
export async function post(url, data) {
    return api('POST', url, data);
}
export async function del(url) {
    return api('DELETE', url);
}
export async function put(url, data) {
    return api('PUT', url, data);
}