/*Fonction qui permet d<ajouter un selecteur de quantite dans la page de produit pour qu'on puisse ajouter un certain montant directement dans le cart*/
function quantity_selector() {
  var input = document.getElementById('quantity');
  document.getElementById('plus').onclick = function () {
    if (input.value <= 1) {
      document.getElementById("minus").disabled = true;
      input.value = parseInt(input.value, 10) + 1
    } else {
      document.getElementById("minus").disabled = false;
      input.value = parseInt(input.value, 10) + 1
    }
  }
  document.getElementById('minus').onclick = function () {
    if (input.value <= 1) {
      document.getElementById("minus").disabled = true;
    } else {
      document.getElementById("minus").disabled = false;
      input.value = parseInt(input.value, 10) - 1
    }
  }
}