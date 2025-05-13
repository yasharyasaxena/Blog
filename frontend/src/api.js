export const backend = "https://blog-s9ld.onrender.com"
export async function register(data) {
    const response = await fetch(`${backend}/register`, {
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
    const response = await fetch(`${backend}/login`, {
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
    const response = await fetch(`${backend}/blogs`);
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
    const response = await fetch(`${backend}/blog/${id}`);
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

export async function getUserBlogs(token) {
    const response = await fetch(`${backend}/blogs/user`, {
        headers: {
            Authorization: `Bearer ${await token}`,
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
    const response = await fetch(`${backend}/home`);
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
    const response = await fetch(`${backend}/dashboard`, {
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

export async function createBlog(data, token) {
    const response = await fetch(`${backend}/create-blog`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    let result = await response.json();
    let res = {
        status: response.status,
        ...result,
    }
    console.log(result);
    if (!response.ok) {
        throw {
            status: response.status,
            statusText: response.statusText,
            message: result.message,
        }
    }
    return res;
}

export async function getUserInfo(token) {
    const response = await fetch(`${backend}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    let result = await response.json();
    let res = {
        status: response.status,
        ...result,
    }
    if (!response.ok) {
        throw {
            status: response.status,
            statusText: response.statusText,
            message: result.message,
        }
    }
    return res;
}

export async function deleteBlog(id, token) {
    const response = await fetch(`${backend}/blog/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    let result = await response.json();
    let res = {
        status: response.status,
        ...result,
    }
    if (!response.ok) {
        throw {
            status: response.status,
            statusText: response.statusText,
            message: result.message,
        }
    }
    return res;
}