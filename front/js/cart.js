// Récupère les données de mon stockage local
let canapLocalStorage = JSON.parse(localStorage.getItem("cart"));

//Fonction de mise à jour du panier du prix et de la quantité
function updateCart() {
  // Met à jour le stockage local
  localStorage.setItem("cart", JSON.stringify(canapLocalStorage));

  // Met à jour la quantité totale
  const totalQuantityElement = document.querySelector("#totalQuantity");
  totalQuantityElement.innerHTML = getTotalQuantity();

  // Met à jour le prix total
  const totalPriceElement = document.querySelector("#totalPrice");
  totalPriceElement.innerHTML = getTotalPrice();
}


// Insérer les éléments dans le html
const positionEmptyCart = document.querySelector("#cart__items");
function addCart(){
  if(canapLocalStorage == 0 || canapLocalStorage === null){
    const emptyCart = `<p>Votre panier est vide.</p>`;
    positionEmptyCart.innerHTML = emptyCart;
    const orderButton = document.querySelector("#order");
    orderButton.disabled = true;
    orderButton.style.backgroundColor = "grey";
    orderButton.style.cursor = "not-allowed";
    //console.log(emptyCart);
  } else {
      for (let cart in canapLocalStorage){
      // Insertion de l'élément "article"
      const canapArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(canapArticle);
      canapArticle.className = "cart__item";
      canapArticle.setAttribute('data-id', canapLocalStorage[cart].idKanap);

      // Insertion de l'élément "div"
      const canapDivImg = document.createElement("div");
      canapArticle.appendChild(canapDivImg);
      canapDivImg.className = "cart__item__img";
  
      // Insertion de l'image
      const canapImg = document.createElement("img");
      canapDivImg.appendChild(canapImg);
      canapImg.src = canapLocalStorage[cart].imageKanap;
      canapImg.alt = canapLocalStorage[cart].altKanap;
      
      // Insertion de l'élément "div"
      const canapItemContent = document.createElement("div");
      canapArticle.appendChild(canapItemContent);
      canapItemContent.className = "cart__item__content";
  
      // Insertion de l'élément "div"
      const canapItemContentTitlePrice = document.createElement("div");
      canapItemContent.appendChild(canapItemContentTitlePrice);
      canapItemContentTitlePrice.className = "cart__item__content__titlePrice";

      // Insertion du titre h3
      const canapName = document.createElement("h2");
      canapItemContentTitlePrice.appendChild(canapName);
      canapName.innerHTML = canapLocalStorage[cart].nameKanap;

      // Insertion de la couleur
      const canapColor = document.createElement("p");
      canapName.appendChild(canapColor);
      canapColor.innerHTML = canapLocalStorage[cart].colorKanap;
  
      // Insertion du prix
      const canapPrice = document.createElement("p");
      canapItemContentTitlePrice.appendChild(canapPrice);
      canapPrice.innerHTML = canapLocalStorage[cart].priceKanap + " €";

      // Insertion de l'élément "div"
      const canapItemContentSettings = document.createElement("div");
      canapItemContent.appendChild(canapItemContentSettings);
      canapItemContentSettings.className = "cart__item__content__settings";
  
      // Insertion de l'élément "div"
      const canapItemContentSettingsQuantity = document.createElement("div");
      canapItemContentSettings.appendChild(canapItemContentSettingsQuantity);
      canapItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
      
      // Insertion de "Qté : "
      const canapQte = document.createElement("p");
      canapItemContentSettingsQuantity.appendChild(canapQte);
      canapQte.innerHTML = "Qté : ";
  
      // Insertion de la quantité
      const canapQuantity = document.createElement("input");
      canapItemContentSettingsQuantity.appendChild(canapQuantity);
      canapQuantity.value = canapLocalStorage[cart].quantityKanap;
      canapQuantity.className = "itemQuantity";
      canapQuantity.setAttribute("type", "number");
      canapQuantity.setAttribute("min", "1");
      canapQuantity.setAttribute("max", "100");
      canapQuantity.setAttribute("name", "itemQuantity");

      // Insertion de l'élément "div"
      const canapDeleteSettings = document.createElement("div");
      canapItemContentSettings.appendChild(canapDeleteSettings);
      canapDeleteSettings.className = "cart__item__content__settings__delete";
  
      // Insertion de "p" supprimer
      const canapDelete = document.createElement("p");
      canapDeleteSettings.appendChild(canapDelete);
      canapDelete.className = "deleteItem";
      canapDelete.innerHTML = "Supprimer";
    }
  }
}
addCart();

// Supprimer un produit du panier
function deleteCanap() {
  const deleteButtons = document.querySelectorAll('.deleteItem');
  deleteButtons.forEach(button => {
    button.addEventListener('click', event => {
      const article = event.target.closest('article');
      const id = article.getAttribute('data-id');
      const color = article.querySelector('p').textContent;

      //Supprime l'article en fonction de son ID et de sa couleur
      canapLocalStorage.forEach((item, index) => {
        if (item.idKanap === id && item.colorKanap === color) {
          canapLocalStorage.splice(index, 1);

          // Mise à jour du panier, du prix total et de la quantité
          updateCart();

          article.remove();

          // Si le Local Storage est vide, exécute cette condition
          if (canapLocalStorage.length === 0) {
            const emptyCart = `<p>Vous n'avez plus d'articles dans le panier</p>`;
            positionEmptyCart.innerHTML = emptyCart;

            // Si le panier est vide, le bouton de commande sera grisé
            const orderButton = document.querySelector("#order");
            orderButton.disabled = true;
            orderButton.style.backgroundColor = "grey";
            orderButton.style.cursor = "not-allowed";
          }
        }
        getTotalPrice();
        getTotalQuantity();
      });
    });
  });
}

// Gère le prix total et la quantité totale du panier
function getTotalPrice() {
  let totalPrice = 0;
  canapLocalStorage.forEach(item => {
    totalPrice += item.priceKanap * item.quantityKanap;
  });
  return totalPrice.toFixed(0);
}

function getTotalQuantity() {
  let totalQuantity = 0;
  canapLocalStorage.forEach(item => {
    totalQuantity += item.quantityKanap;
  });
  return totalQuantity;
}
updateCart();

//Gestion de la quantité
function changeQuantity() {
  const quantityInputs = document.querySelectorAll('.itemQuantity');
  quantityInputs.forEach(input => {
    input.addEventListener('change', event => {
      const newQuantity = parseInt(event.target.value);
      const article = event.target.closest('article');
      const id = article.getAttribute('data-id');
      const color = article.querySelector('p').textContent;

      // Trouver l'élément correspondant dans le stockage local
      const itemIndex = canapLocalStorage.findIndex(item => item.idKanap === id && item.colorKanap === color);
      const item = canapLocalStorage[itemIndex];

      // Mettre à jour la quantité dans le stockage local
      // Avec une condition pour vérifier la validité de la quantité
      if (newQuantity > 0 && newQuantity <= 100) {
        item.quantityKanap = newQuantity;
        canapLocalStorage[itemIndex] = item;
        updateCart();
      } else {

        // Remettre la quantité d'origine si la nouvelle quantité est invalide
        alert("Quantié invalide");
        event.target.value = item.quantityKanap;
      }
    });
  });
}
changeQuantity();

// Partie Validation du formulaire avec Regex

// Validation du prénom
let firstNameInput = document.getElementById("firstName");

function validFirstName (input) {
  return/^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/.test(input)
}

firstNameInput.addEventListener("change", () =>{
  if(validFirstName(firstNameInput.value) === false){
    firstNameErrorMsg.innerText ="SAISIE INVALIDE"
  } else {
    firstNameErrorMsg.innerText = "Ok"
  }
});

//Validation du nom
let lastNameInput = document.getElementById("lastName");

function validLastName (input){
  return /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/.test(input)
}
lastNameInput.addEventListener("change", () => {
  if(validLastName(lastNameInput.value) === false){
    lastNameErrorMsg.innerText = "SAISIE INVALIDE"
  } else {
    lastNameErrorMsg.innerText = "Ok"
  }
});

// Validation de l'adresse
let adressInput = document.getElementById("address");
function valideAdress (input){
  return   /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s\,\'\-]*$/.test(input)
}
adressInput.addEventListener("change", () => {
  if(valideAdress(adressInput.value) === false){
    addressErrorMsg.innerText = "SAISIE INVALIDE"
  } else {
    addressErrorMsg.innerText = "Ok"
  }
});

// Validation de la ville
let cityInput = document.getElementById("city");
function validCity (input){
  return  /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s\,\'\-]*$/.test(input)
}
cityInput.addEventListener("change", ()=>{
  if(validCity(cityInput.value) === false){
    cityErrorMsg.innerText = "SAISIE INVALIDE"
  } else {
    cityErrorMsg.innerText = "Ok"
  }
});

//Validation du mail
let mailInput = document.getElementById("email");
function validMailInput (input){
  return  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input)
}
mailInput.addEventListener("change", ()=>{
  if(validMailInput(mailInput.value) === false){
    emailErrorMsg.innerText = "SAISIE INVALIDE"
  } else {
    emailErrorMsg.innerText = "Ok"
  }
});

//Variables contenant les messages d'erreur
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

// Commander
const postUrlApi = 'http://localhost:3000/api/products/order';

const submitBtn = document.getElementById("order");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  //On vérifie que le formulaire soit bien rempli
  if(validFirstName(firstNameInput.value) == false || validLastName(lastNameInput.value) == false || valideAdress(adressInput.value) == false || validCity(cityInput.value) == false || validMailInput(mailInput.value) == false){

    alert("Vérifier votre formulaire");

  } else if (confirm("Confirmez-vous votre commande ? ") === true) {

    let arrayKanap = []

    // On récupère les données du formulaire
    let dataOrder = {
      contact: {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: adressInput.value,
        city: cityInput.value,
        email: mailInput.value
      },
      products: arrayKanap
    };

    // Envoi du formulaire et redirection vers la page de confirmation
    const postForm = {
      method: 'POST',
      body: JSON.stringify(dataOrder),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    fetch(postUrlApi, postForm) // Appel de l'API
      .then(response => response.json())
      .then(datas => {

        // Envoie des informations dans la page confirmation
        window.location.href = "confirmation.html?orderId=" + datas.orderId;
      })
      .catch(error => {
        alert(error);
      })

  }
  else {
    return false;
  }
})
window.addEventListener("load", deleteCanap(), getTotalPrice(), getTotalQuantity());