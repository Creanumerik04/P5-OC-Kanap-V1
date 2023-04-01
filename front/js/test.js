/* const positionEmptyCart = document.querySelector("#cart__items");

async function addCart() {
  try {
    const response = await fetch("http://localhost:3000/api/products/");
    const products = await response.json();

    if(canapLocalStorage == 0 || canapLocalStorage === null){
      const emptyCart = `<p>Votre panier est vide.</p>`;
      positionEmptyCart.innerHTML = emptyCart;
      const orderButton = document.querySelector("#order");
      orderButton.disabled = true;
      orderButton.style.backgroundColor = "grey";
      orderButton.style.cursor = "not-allowed";
      //console.log(emptyCart);
    } else {
      canapLocalStorage.forEach((item) => {
        const product = products.find((p) => p._id === item.idKanap);

        const canapArticle = document.createElement("article");
        canapArticle.className = "cart__item";
        canapArticle.setAttribute("data-id", item.idKanap);

        canapArticle.innerHTML = `
          <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
              <h2>${product.name}</h2>
              <p>${item.colorKanap}</p>
              <p>${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input
                  class="itemQuantity"
                  type="number"
                  min="1"
                  max="100"
                  name="itemQuantity"
                  value="${item.quantityKanap}"
                />
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        `;

        positionEmptyCart.appendChild(canapArticle);
      });
    }
  } catch (error) {
    console.log(error)
  }
}
addCart(); */


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