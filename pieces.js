// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

// ajout de la generation de la page
function genererPieces(pieces){
    // On va rattacher chaque éléments de pieces-auto.json a index.html
    for (let i = 0; i < pieces.length; i++)
    {
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");

        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");

        // On crée l’élément img.
        const imageElement = document.createElement("img");

        /* On accède à l’indice i de la liste pieces pour configurer 
        la source de l’image. */
        imageElement.src = pieces[i].image;

        // Idem pour le nom, le prix et la catégorie...
        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom

        const prixElement = document.createElement("p");
        /* Par exemple, ` l’addition est de ${2 +3} euros` affichera : 
        “l’addition est de 5 euros”.
        ici : prixElement.innerText = "Prix: " + article.prix + " €"; */
        prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        /* L’opérateur nullish (??) est très récent en JavaScript. 
        Avant, nous utilisions l’opérateur “ou logique” || */
        categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";

        const stockElement = document.createElement("p");
        stockElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";

        // On rattache la balise article à la section Fiches
        sectionFiches.appendChild(pieceElement);

        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);

        // Idem pour le nom, le prix et la catégorie...

        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);

    }
};

genererPieces(pieces);

// bouton pour organiser par prix croissant les articles
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
     });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
 });

// bouton pour filtrer les articles à ceux ayant un prix inférieur à 35
// pas besoin de créer de copie de la liste avec Array ici, car filter le fait déjà auto
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

/* fonction pour récupérer une liste de tous nos éléments mais avec uniquement
les noms :
const noms = map(function(piece) {
    return piece.nom;
});
qui devient avec fonction fléchée :
const noms = pieces.map(piece => piece.nom);
et finalement avec fonction lambda :
const noms = piece => piece.nom; */

/* exemple si on veut une nouvelle liste de nos éléments avec leur prix doublés :
const prix_doubles = pieces.map(piece => piece.prix * 2); */

/* supprimer les éléments d'une liste ac condition via la fonction splice :
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   }
}
console.log(noms) */

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1; i >=0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    };
};

//Création de la liste
const abordablesElements = document.createElement("ul");
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement("li");
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement);
};

// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
   .appendChild(abordablesElements);

const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

for(let i = pieces.length -1; i >=0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    };
};

const disponiblesElement = document.createElement("ul");

for(let i=0; i < nomsDisponibles.length; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElement.appendChild(nomElement);
};

document.querySelector(".disponibles").appendChild(disponiblesElement);
