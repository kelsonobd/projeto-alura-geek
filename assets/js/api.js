const API_URL = "http://localhost:3000/albums"


export const fetchAlbums = async () => {
    try{
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error("Erro ao buscar itens")
        }
        return await response.json();
    }catch (error) {
        console.log(error);
        return []
    }
};

export const addAlbum = async (albumData) => {
    try{
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json"
            },
            body: JSON.stringify(albumData),
        });
        if (!response.ok){
            throw new Error ("Erro ao adicionar item.")
        }
        return await response.json();
    } catch(error){
        console.log(error)
        return null
    }
}

export const deleteAlbum = async (albumId) => {
    try{
        const response = await fetch(`${API_URL}/${albumId}`, {
            method: "DELETE",
        })
        if (!response.ok) {
            throw new Error ("Erro ao deletar item.")
        }
 return true;

    } catch (error) {
        console.log(error);
        return false;
    }

   
}