export const api = "https://blog-s9ld.onrender.com"

export async function register(data) {
    const response = await fetch(`${api}/register`, {
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
    const response = await fetch(`${api}/login`, {
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
    const response = await fetch(`${api}/blogs`);
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
    const response = await fetch(`${api}/blog/${id}`);
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
    const response = await fetch(`${api}/blogs/user`, {
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
    const response = await fetch(`${api}/home`);
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
    const response = await fetch(`${api}/dashboard`, {
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
    const response = await fetch(`${api}/create-blog`, {
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
    const response = await fetch(`${api}/profile`, {
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
    const response = await fetch(`${api}/blog/${id}`, {
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

export async function likeBlog(id, token) {
    const response = await fetch(`${api}/liked-blogs/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export async function unlikeBlog(id, token) {
    const response = await fetch(`${api}/liked-blogs/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export async function getLikedBlogs(id, token) {
    const response = await fetch(`${api}/liked-blogs/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export async function updateUserInfo(data, token) {
    const response = await fetch(`${api}/profile`, {
        method: "PUT",
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
    if (!response.ok) {
        throw {
            status: response.status,
            statusText: response.statusText,
            message: result.message,
        }
    }
    return res;
}

export async function updateBlog(data, id, token) {
    const response = await fetch(`${api}/blog-edit/${id}`, {
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
    if (!response.ok) {
        throw {
            status: response.status,
            statusText: response.statusText,
            message: result.message,
        }
    }
    return res;
}