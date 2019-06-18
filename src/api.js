export async function createToken(username, password) {
    const response = await fetch("http://localhost:5000/token", {
        mode: 'cors',
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    if (response.status !== 200) {
        const e = new Error();
        e.status = response.status;
        e.response = response;
        throw e;
    }
    return response.json().then(it => it.token);
}
