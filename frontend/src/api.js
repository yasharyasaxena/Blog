export async function register(data) {
    const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let result = await response.json();
    if (!response.ok) {
        throw {
            status: response.status,
            statusText: response.statusText,
            message: result.message,
        }
    }
    return result;
}

export async function login(data) {
    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let result = await response.json();
    if (!response.ok) {
        console.log("hi")
        throw {
            status: response.status,
            statusText: response.statusText,
            message: result.message,
        }
    }
    return result;
}