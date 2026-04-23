const API_URL = "http://localhost:5000";

export async function getRecipes() {
    const res = await fetch(`${API_URL}/recipe`);
    const data = await res.json();
    return data;
}

export async function createRecipe(title, ingredients, instructions, time, file) {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients.join('\n'));
    formData.append('instructions', instructions.join('\n'));
    formData.append('time', time);
    if (file) formData.append('file', file);
    
    const res = await fetch(`${API_URL}/recipe`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    return res;
}

export async function getRecipe(id) {
    const res = await fetch(`${API_URL}/recipe/${id}`);
    const data = await res.json();
    return data;
}

export async function updateRecipe(id, title, content) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/recipe/${id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title, content})
    });
    return res;
}

export async function deleteRecipe(id) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/recipe/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res;
}

export async function toggleFavourite(recipeId) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/favorites/toggle`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ recipeId })
    });
    return res.json();
}

export async function getFavourites() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/favorites`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export async function rateRecipe(recipeId, rating) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user._id : null;
    const res = await await fetch(`${API_URL}/recipe/${recipeId}/rate`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ rating, userId })
    });
    return res.json();
}
