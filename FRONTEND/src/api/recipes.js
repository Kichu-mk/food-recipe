export async function getRecipes() {
    const res = await fetch("http://localhost:5000/recipe");
    const data = await res.json();
    return data;
}

export async function createRecipe(title, ingredients, instructions, time, file) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients.join('\n'));
    formData.append('instructions', instructions.join('\n'));
    formData.append('time', time);
    if (file) formData.append('file', file);
    const res = await fetch("http://localhost:5000/recipe", {
        method: "POST",
        body: formData
    });
    return res;
}

export async function getRecipe(id) {
    const res = await fetch(`http://localhost:5000/recipe/${id}`);
    const data = await res.json();
    return data;
}

export async function updateRecipe(id, title, content) {
    const res = await fetch(`http://localhost:5000/recipe/${id}` , {
            method : "PUT", 
            body : JSON.stringify({title, content}),
            headers : {
              "content-Type" : "application/json" ,
    
            }
        });
        return res;
}

export async function deleteRecipe(id) {
    const res = await fetch(`http://localhost:5000/recipe/${id}` , {
            method : "DELETE", 
        });
        return res;
}