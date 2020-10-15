/* Methode pour chercher une colonne de la table commande de
la base de données en utlisant le id et le nom de la colonne
comme paramètres */
function fetchInfoOrder(id, column) {
    var req = new XMLHttpRequest();
    req.open('GET', '../admin_list_order/' + id + '&' + column, false);
    req.send(null);
    var responseTypeJson = req.responseText;
    var obj = JSON.parse(responseTypeJson.slice(1, -1));
    var res = obj[column];
    return res;
}

/* Methode pour chercher une colonne de la table boissoncommande de
la base de données en utlisant le id et le nom de la colonne
comme paramètres */
function fetchInfoBoissonCommande(id, column) {
    var req = new XMLHttpRequest();
    req.open('GET', '../admin_list_order_boissoncommande/' + id + '&' + column, false);
    req.send(null);
    var responseTypeJson = req.responseText;
    var obj = JSON.parse(responseTypeJson.slice(1, -1));
    var res = obj[column];
    return res;
}

/*Methode qui nous permet de recevoir la liste des ID dans la table de commande*/
function fetchListIdsCommande(nomColonne) {
    var req = new XMLHttpRequest();
    req.open('GET', '../admin_list_order/' + nomColonne, false);
    req.send(null);
    var responseTypeJson = req.responseText;
    var listId = JSON.parse(responseTypeJson);
    return listId
}

/*Methode qui permet de faire appel a la methode fetchInfoOrder avec les parametres pour chaques colonnes. 
Ensuite, elle fait appel a la methode addOrder qui permet de creer le html qui presentera chque commandes*/
function loadPageListOrder() {
    var listIdsCommande = fetchListIdsCommande('idCommande')

    for (i = 0; i < listIdsCommande.length; i++) {
        /*insert aussi liste de produit qui va etre dans table boissoncommande et prix qui va etre fait plus tard*/
        addOrder(fetchInfoOrder(listIdsCommande[i].idCommande, 'IdCommande'), fetchInfoOrder(listIdsCommande[i].idCommande, 'InfoClient'), fetchInfoOrder(listIdsCommande[i].idCommande, 'InfoLivraison'),
        /*fetchInfoBoissonCommande(listIdsCommande[i].idCommande, 'Boisson_idBoisson'),*/ fetchInfoOrder(listIdsCommande[i].idCommande, 'NombreBoisson'), fetchInfoOrder(listIdsCommande[i].idCommande, 'PrixFinal'), fetchInfoOrder(listIdsCommande[i].idCommande, 'Etat'));
    }
}

/*Methode qui permet de creer le html avec les informations de la table de commande passe en parametre*/
function addOrder(IdCommande, InfoClient, InfoLivraison, /*idBoisson,*/ NombreBoisson, PrixFinal, Etat) {
    document.write('<tr>\n');
    document.write('<th>ID de Commande</th>\n');
    document.write('<th>Information de Client</th>\n');
    document.write('<th>Information de shipping</th>\n');
    document.write('<th>Nombre de produits</th>\n');
    document.write('<th>Liste de produit(s)</th>\n');
    document.write('<th>Cout total</th>');
    document.write('<th>Etat</th>');
    document.write('</tr>\n');

    document.write('<tr>\n');
    document.write('<td>' + IdCommande + '</td>\n');
    document.write('<td>' + InfoClient + '</td>\n');
    document.write('<td>' + InfoLivraison + '</td>\n');
    document.write('<td>' + NombreBoisson + '</td>\n');
    document.write('<td>Liste de produit en développement, consulté la table boissoncommande dans la BD</td>\n');
    /*document.write('<td>' + idBoisson + '</td>\n');*/
    document.write('<td>$'+ PrixFinal +'</td>\n');
    document.write('<td>' + Etat + '</td>\n');
    document.write('</tr>');
}