export async function getRecipes() {
    const res = await fetch("http://localhost:5000/recipe");
    const data = await res.json();
    return data;
}

export async function createRecipe(title, content) {
    const res = await fetch("http://localhost:5000/recipe" , {
            method : "POST", 
            body : JSON.stringify({title, content}),
            headers : {
              "content-Type" : "application/json" ,
    
            }
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