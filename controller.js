console.log('controller.js loaded');
const docdatas = './recipes.json';
async function getDatas() {
    const response = await fetch(docdatas);
        console.log("reponse",response)
        const data = await response.json();
        console.log("data",data)
    try {
        //if(!response.status.toString(200)) throw new Error(`${data.message} tesssssstttt ${response.status}`);
        
        const recipesFiltered = data.map(element => element.ingredients)
        const recipesStensils = data.map(element => element.ustensils)
        console.log(recipesFiltered)
        console.log("ustensils", recipesStensils)
     
    }
    
    catch (e) {
        if (response.status == 404) {
            throw new Error("fichier non trouvé")
        }
        console.log(e)
        }
    }

getDatas()

