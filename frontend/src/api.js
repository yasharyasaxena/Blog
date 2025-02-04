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
        throw {
            status: response.status,
            statusText: response.statusText,
            message: result.message,
        }
    }
    return result;
}

export async function getBlogs() {
    const response = await fetch("http://localhost:3000/blogs");
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

export async function getBlog(id) {
    const response = await fetch(`http://localhost:3000/blogs/${id}`);
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

export async function getUserBlog(token) {
    const response = await fetch("http://localhost:3000/blogs/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

export async function getTopBlogs() {
    const response = await fetch("http://localhost:3000/home");
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

export async function getTopUserBlogs(token) {
    const response = await fetch("http://localhost:3000/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
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