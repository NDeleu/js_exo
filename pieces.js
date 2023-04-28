/* Mise en relation ac le json */
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

/* création des éléments dans le html en relation avec les éléments du json */
const article = pieces[0];
const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
/* Par exemple, ` l’addition est de ${2 +3} euros` affichera : 
“l’addition est de 5 euros”.
ici : prixElement.innerText = "Prix: " + article.prix + " €"; */
prixElement.innerText = `Prix: ${article.prix} €`;
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie;

/* mise en relation des balises html et de nos éléments créés ci dessus
par le biais d'une relation parent enfant */
const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);