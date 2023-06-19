/* eslint-disable no-console */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved

class Recipe {
  constructor(
    appliance,
    description,
    id,
    image,
    ingredients,
    name,
    servings,
    time,
    ustensils
  ) {
    this.appliance = appliance;
    this.description = description;
    this.id = id;
    
      (this.image = `/assets/Images/Recipes/${image}`);
    this.ingredients = ingredients;
    this.name = name;
    this.servings = servings;
    this.time = time;
    this.ustensils = ustensils;
  }

  getName() {
    return this.name;
  }

  getIngredients() {
    return this.ingredients;
  }

  getTime() {
    return this.time;
  }

  getServings() {
    return this.servings;
  }

  getAppliance() {
    return this.appliance;
  }

  getUstensils() {
    return this.ustensils;
  }

  getId() {
    return this.id;
  }

  getCard() {
    // Création de la carte
    const recipeCard = document.createElement("article");
    recipeCard.classList.add("recipeCard");
    recipeCard.setAttribute("id", this.getId());

    // Création du header
    const recipeImgContainer = document.createElement("div");
    recipeImgContainer.classList.add("recipePictureContainer");
    recipeCard.appendChild(recipeImgContainer);

    // Création du body
    const recipeImg = document.createElement("img");
    recipeImg.setAttribute("src", this.image);
    recipeImg.setAttribute("alt", this.name);
    recipeImg.classList.add("recipePicture");
    recipeImgContainer.appendChild(recipeImg);

    //Création encart 'Time'
    const Time = document.createElement("span");
    Time.classList.add("CookingTime");
    Time.textContent = this.time + "min";
    recipeImgContainer.appendChild(Time);

    //création Contenu Texte
    const recipeContent = document.createElement("div");
    recipeContent.classList.add("recipeContent");
    recipeCard.appendChild(recipeContent);

    //Nom de la recette
    const recipeName = document.createElement("h2");
    recipeName.classList.add("recipeName");
    recipeName.textContent = this.name;
    recipeContent.appendChild(recipeName);

    //Titre de division Recette
    const recipeTitle = document.createElement("h3");
    recipeTitle.classList.add("cardTitle");
    recipeTitle.textContent = "recette";
    recipeContent.appendChild(recipeTitle);

    //Description de la recette
    const recipeDescription = document.createElement("div");
    recipeDescription.classList.add("recipeDescription");
    recipeDescription.textContent = this.description;
    recipeContent.appendChild(recipeDescription);

    //Titre de division Ingrédients
    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.classList.add("cardSubTitle");
    ingredientsTitle.textContent = "ingredients";
    recipeContent.appendChild(ingredientsTitle);

    //Création de la liste des ingrédients
    const ingredientsList = document.createElement("div");
    ingredientsList.classList.add("RecipeIngredients");

    //Boucle pour afficher les ingrédients
    for (let i = 0; i < this.ingredients.length; i += 1) {
        const ingredientItem = document.createElement("div");
        ingredientItem.classList.add("oneIngredientContainer");
        ingredientsList.appendChild(ingredientItem);
        const ingredientName = document.createElement("p");
        ingredientName.classList.add("ingredientName");
        ingredientName.textContent = this.ingredients[i].ingredient;
        ingredientItem.appendChild(ingredientName);

        recipeContent.appendChild(ingredientsList);

        const ingredientQuantity = this.ingredients[i].quantity;
        const ingredientUnit = this.ingredients[i].unit
        ? this.ingredients[i].unit
        : "";
        
        const IngredientMesure = `${ingredientQuantity} ${ingredientUnit}`;
        const ingredientMesure = document.createElement("p");
        ingredientMesure.classList.add("ingredientMesure");
        ingredientMesure.textContent = IngredientMesure;
        ingredientItem.appendChild(ingredientMesure);

    }
    
    
   
    

    

    return recipeCard;
  }
}

export { Recipe };
