/*variables gloables*/
var listCart = [];
var prixTotalCart = 0.0;
var quantiteProduitsCart = 0;

/* Methode pour chercher un element de la table boisson de
la base de données en utlisant le id et le nom de la colonne
comme paramètres */
function fetchData(id, column) {
    var req = new XMLHttpRequest();
    req.open('GET', '../product/' + id + '&' + column, false);
    req.send(null);
    var responseTypeJson = req.responseText;
    var obj = JSON.parse(responseTypeJson.slice(1, -1));
    var res = obj[column];
    return res;
}
/*Methode qui retourne une liste contenant tous les ids de la
boisson de la base de données */
function fetchListIds(nomColonne) {
    var req = new XMLHttpRequest();
    req.open('GET', '../product/' + nomColonne, false);
    req.send(null);
    var responseTypeJson = req.responseText;
    var listId = JSON.parse(responseTypeJson);
    return listId
}


/*Methode qui boucle sur le nombre de produits dans la listeId(contient tous
les ids des produits) et utilise la methode addDrink pour ecrire dans le ficher html
tous les produits */
function loadPageListProducts() {

    setElementsLocalStorage()
    var listId = fetchListIds('idBoisson')


    for (i = 0; i < listId.length; i++) {
        addDrink(fetchData(listId[i].idBoisson, 'NomBoisson'), fetchData(listId[i].idBoisson, 'Saveur'), fetchData(listId[i].idBoisson, 'PaysOrigine'),
            fetchData(listId[i].idBoisson, 'ImageBoisson'), fetchData(listId[i].idBoisson, 'Prix'), listId[i].idBoisson);

    }
}

/*Metode qui ecrit du html dans la page liste_produits en utilisant les parametres
de la boisson */
function addDrink(nomBoisson, saveur, paysOrigine, image, prix, id) {
    document.write('<div class=\"product-card\" id=\"FantaOrange\">\n');
    document.write('<div class=\"product-image\">\n');
    document.write('<a onClick = \"valueSender(' + id + ')\" href=\"/product_info?boisson=' + nomBoisson + '?saveur=' + saveur + '\" id=' + id + '">\n');
    document.write('<img src=' + image + ' alt=\"product-image\"' + '>\n');
    document.write('</a>\n');
    document.write('\n');
    document.write('</div>\n');
    document.write('<div class=\"product-info\">\n');
    document.write('<h1>' + nomBoisson + '</h1>\n');
    document.write('<h3> Flavor : </h3>\n');
    document.write('<h5>' + saveur + '</h5>\n');
    document.write('<h5 id=\"saveur\"></h5>\n');
    document.write('<h3> Country : </h3>\n');
    document.write('<h5>' + paysOrigine + '</h5>\n');
    document.write('<h3>Price :</h3>\n');
    document.write('<h5>' + prix + '</h5>\n');
    document.write('<button onClick = \"addProductToCart(\'' + id + '\')\" href=\"/products\" class=\"buttonAddToCart\">Add to cart</button>\n');
    document.write('</div>\n');
    document.write('</div>');
}

/*Methode qui permet de générer la page produits(tout ce qui est description de la boisson)
et utlise le id passe en parametre pour acceder au infos de la boisson en question. */
function loadPageProduct() {
    var id = localStorage.getItem("id");

    setElementsLocalStorage()
    addHtmlElementsToCart()
    document.write('<main class=\"container\">\n');
    document.write('<div class=\"left-column\">\n');
    document.write('<img data-image=\"black\" src= ' + fetchData(id, 'ImageBoisson') + '>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<div class=\"right-column\">\n');
    document.write('\n');
    document.write('<div class=\"product-description\">\n');
    document.write('<span>' + fetchData(id, 'nomBoisson') + '</span>\n');
    document.write('<h1>' + fetchData(id, 'nomBoisson') + ', ' + fetchData(id, 'Saveur') + ' - 250 ml' + '</h1>\n');
    document.write('<H2>LIST OF INGREDIENTS</H2>\n');
    document.write('<p>' + fetchData(id, 'Description') + '</p>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<div class=\"product-price\">\n');
    document.write('<h1>Price :' + fetchData(id, 'Prix') + '</h1>\n');
    document.write('<h1>Select the quantity</h1>\n');
    document.write('<div class=\"quantity selector\">\n');
    document.write('<input id=\"minus\" type=\"button\" class=\"minus\" value=\"-\">\n');
    document.write('<input id=\"quantity\" type=\"number\" size=\"4\" class=\"input-text qty text\" title=\"Qty\" value=\"1\" min=\"0\"\n');
    document.write('step=\"1\">\n');
    document.write('<input id=\"plus\" type=\"button\" class=\"plus\" value=\"+\">\n');
    document.write('</div>\n');
    document.write('<script>quantity_selector()</script>\n');
    document.write('<p></p>\n');
    document.write('<span class=\"buttonAddToCart\"  onClick=\"addSpecificProductCart(' + id + ')\">Add to cart</span>\n');
    document.write('</div>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<section class=\"performance-facts\">\n');
    document.write('  \n');
    document.write('    <img data-image=\"black\" src=' + fetchData(id, 'ImageValeurNutritive') + ' style=\'height: 100%; width: 100%; object-fit: contain\'>\n');
    document.write('  </section>\n');
    document.write('\n');
    document.write('</div>\n');
    document.write('</main>');
}

/*Methode qui ajoute un id passe aux parametre dans le local storage */
function valueSender(id) {
    localStorage.setItem("id", id);
}


/*Methode qui permet de ajouter un produit dans la listCart.
ListCart: liste d'objects de tous les produits ajoute au cart
*/
function addProductToCart(id) {
    var nomBoissonFetched = fetchData(id, 'NomBoisson');
    var saveurFetched = fetchData(id, 'Saveur');
    var imageBoissonFetched = fetchData(id, 'ImageBoisson');
    var prixFetched = fetchData(id, 'Prix');

    if (listCart.length > 0) {
        for (var i = 0; i < listCart.length; i++) {
            var drinkAlreadyExists = false;
            if (listCart[i].image.localeCompare(imageBoissonFetched) == 0) {
                listCart[i].quantite++;
                drinkAlreadyExists = true;
                console.log(nomBoissonFetched + " alreday exists")
                break;
            }
        }

        if (!drinkAlreadyExists) {
            var product = { nomBoisson: nomBoissonFetched, prix: prixFetched, quantite: 1, image: imageBoissonFetched, saveur: saveurFetched, boissonID: id };
            listCart.push(product);
            console.log(nomBoissonFetched + " does not alreday exists")
        }
    }
    else {
        var product = { nomBoisson: nomBoissonFetched, prix: prixFetched, quantite: 1, image: imageBoissonFetched, saveur: saveurFetched, boissonID: id };
        listCart.push(product);
        console.log(nomBoissonFetched + " does not alreday exists2")
    }
    var price = prixFetched.replace('$', '');
    var floatPrice = parseFloat(price)
    prixTotalCart += floatPrice
    prixTotalCart = Math.round((prixTotalCart + Number.EPSILON) * 100) / 100

    quantiteProduitsCart++;

    addHtmlElementsToCart();
    VerifyCheckoutButton();
}


/*Methode qui permet de ecrire dans le ficher html les elements qui sont ajoute au carts
Pour les ajouter on cherche les elements du local storage */
function addHtmlElementsToCart() {

    var listCartJSON = JSON.stringify(listCart)
    localStorage.setItem("listCart", listCartJSON)
    var quantiteProduitsCartJSON = JSON.stringify(quantiteProduitsCart)
    localStorage.setItem("quantiteProduitsCart", quantiteProduitsCartJSON)

    var prixTotalCartJSON = JSON.stringify(prixTotalCart)
    localStorage.setItem("prixTotalCart", prixTotalCartJSON)

    var listLiElementsCart = document.getElementsByClassName('clearfix')
    while (listLiElementsCart.length !== 0) {
        listLiElementsCart[0].remove()
    }

    for (var i = 0; i < listCart.length; i++) {
        var cartItems = document.getElementsByClassName('shopping-cart-items')[0]
        var cartRow = document.createElement('li')
        cartRow.classList.add('clearfix')
        cartRow.setAttribute("alt", i)

        var cartRowContents = `<img src="${listCart[i].image}" alt="item" width="50" height="94.25"" />
                        <span class="item-name">${listCart[i].nomBoisson + " " + listCart[i].saveur}</span>
                        <span class="item-price"><br>${listCart[i].prix}</span>
                        <span class="item-quantity"><br>Quantity: ${listCart[i].quantite}      </span>
                        <button  class="buttonRemove" onclick="deleteItem()">Remove Item</button><br><br>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
    }
    document.getElementById('total_price').innerHTML = prixTotalCart;
    document.getElementById('nombre_total_produit').innerHTML = quantiteProduitsCart;
    document.getElementById('quantite_produit').innerHTML = quantiteProduitsCart;
}


/*Methode qui permet de afficher ou de cacher le cart*/
function removeCartDisplay() {

    $(document).ready((function () {
        $(".shopping-cart").fadeToggle("fast");
    })());

}
/*Methode qui est appelle lorsque l'utilisateur clique sur le bouton delete
 dans le cart. La methode supprime l'élément dans le document html et dans le local storage */
function deleteItem() {
    var buttonClicked = event.target
    buttonClickedPosition = buttonClicked.parentElement.getAttribute('alt')
    var prix = listCart[buttonClickedPosition].prix
    if (listCart[buttonClickedPosition].quantite > 1) {
        prixTotalCart -= parseFloat(prix) * listCart[buttonClickedPosition].quantite
    }
    else {
        prixTotalCart -= parseFloat(prix)
    }
    prixTotalCart = Math.round((prixTotalCart + Number.EPSILON) * 100) / 100
    quantiteProduitsCart -= listCart[buttonClickedPosition].quantite
    listCart.splice(buttonClickedPosition, 1)
    buttonClicked.parentElement.remove()



    addHtmlElementsToCart()
    VerifyCheckoutButton();
}

/*Methode qui permet de réinitialiser le local storage avec les nouvelles données */
function setElementsLocalStorage() {
    var listCartJSON = localStorage.getItem("listCart")
    listCart = JSON.parse(listCartJSON)

    var quantiteProduitsCartJSON = localStorage.getItem("quantiteProduitsCart")

    console.log(quantiteProduitsCart)
    console.log(localStorage.hasOwnProperty("quantiteProduitsCart"))
    if (localStorage.hasOwnProperty("quantiteProduitsCart")) {
        quantiteProduitsCart = JSON.parse(quantiteProduitsCartJSON)
        document.getElementById("quantite_produit").innerHTML = quantiteProduitsCart
    }
    if (localStorage.hasOwnProperty("prixTotalCart")) {
        var prixTotalCartJSON = localStorage.getItem("prixTotalCart")
        prixTotalCart = JSON.parse(prixTotalCartJSON)
        document.getElementById('total_price').innerHTML = prixTotalCart
    }
}


/*Methode qui permet de ecire dans le fichier html les produits de cart
dans la page checkout*/
function loadCheckoutCart() {
    var listCartJSON = localStorage.getItem("listCart")
    listCart = JSON.parse(listCartJSON)


    if (localStorage.hasOwnProperty("quantiteProduitsCart")) {
        var quantiteProduitsCartJSON = localStorage.getItem("quantiteProduitsCart")
        quantiteProduitsCart = JSON.parse(quantiteProduitsCartJSON)
    }
    if (localStorage.hasOwnProperty("prixTotalCart")) {
        var prixTotalCartJSON = localStorage.getItem("prixTotalCart")
        prixTotalCart = JSON.parse(prixTotalCartJSON)
    }

    
    document.write('<h4>Cart <span class=\"price\" style=\"color:white\"><i class=\"fa fa-shopping-cart\"></i> <b id = \"amount\" name = \"amount\">' + quantiteProduitsCart + '</b></span></h4>');
    document.write('<input type=\"hidden\" id=\"amount\" name=\"amount\" required autocomplete=\"off\" value = ' + quantiteProduitsCart + '>');

    for (var i = 0; i < listCart.length; i++) {
        document.write('<p><a>' + listCart[i].nomBoisson + ' ' + listCart[i].saveur + ' x' + listCart[i].quantite + '</a> <span class=\"price\">$' + (parseFloat(listCart[i].prix) * parseFloat(listCart[i].quantite)) + '</span></p>');
        document.write('<input type=\"hidden\" id=\"idBoisson\" name=\"idBoisson\" required autocomplete=\"off\" value = ' + listCart[i].boissonID + '>');
    }

    document.write('<hr>')
    document.write('<p>Total Price <span class=\"price\" style=\"color:white\"><b>$' + prixTotalCart + '</b></span></p>');
    document.write('<input type=\"hidden\" id=\"finalPrice\" name=\"finalPrice\" required autocomplete=\"off\" value = ' + prixTotalCart + '>');
}

/*Methode qui permet un produit dans le cart dans la page produit(ajoute pluesieurs boisson a la fois)*/
function addSpecificProductCart(id) {

    var quantiteaAjouterString = document.getElementById('quantity')
    console.log("test" + quantiteaAjouterString.value + "test")
    var quantiteaAjouter = parseFloat(quantiteaAjouterString.value)

    var nomBoissonFetched = fetchData(id, 'NomBoisson');
    var saveurFetched = fetchData(id, 'Saveur');
    var imageBoissonFetched = fetchData(id, 'ImageBoisson');
    var prixFetched = fetchData(id, 'Prix');



    if (listCart.length > 0) {
        for (var i = 0; i < listCart.length; i++) {
            var drinkAlreadyExists = false;
            if (listCart[i].image.localeCompare(imageBoissonFetched) == 0) {
                listCart[i].quantite += quantiteaAjouter
                drinkAlreadyExists = true;
                console.log(nomBoissonFetched + " alreday exists")
                break;
            }
        }

        if (!drinkAlreadyExists) {
            var product = { nomBoisson: nomBoissonFetched, prix: prixFetched, quantite: quantiteaAjouter, image: imageBoissonFetched, saveur: saveurFetched, boissonID: id };
            listCart.push(product);
            console.log(nomBoissonFetched + " does not alreday exists")
        }
    }
    else {
        var product = { nomBoisson: nomBoissonFetched, prix: prixFetched, quantite: quantiteaAjouter, image: imageBoissonFetched, saveur: saveurFetched, boissonID: id };
        listCart.push(product);
        console.log(nomBoissonFetched + " does not alreday exists2")
    }
    var price = prixFetched.replace('$', '');
    var floatPrice = parseFloat(price)
    prixTotalCart += (floatPrice * parseFloat(quantiteaAjouter))
    prixTotalCart = Math.round((prixTotalCart + Number.EPSILON) * 100) / 100

    quantiteProduitsCart += quantiteaAjouter;

    addHtmlElementsToCart();
    VerifyCheckoutButton();

}
/*Methode pour descativer le bouton checkout s'il y a pas d'éléments dans le cart */
function VerifyCheckoutButton(){
    var boutonCheckout = document.getElementById('checkout_Button')
    if  (quantiteProduitsCart == 0){
        boutonCheckout.href = "#"
        
    }
    else{
        boutonCheckout.href = "/checkout";
    }

}











