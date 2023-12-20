// Votre JSON
const jsonData = {
  "id": 1,
  "dateDebut": 1704063653000,
  "dateFin": 1706655653000,
  "nameCampaign": "temps_forts",
  "heroBanner": {
    "tagLabel": "txtTF",
    "tagDate": "dateTF",
    "titleLabel": "<span style=color:#ff8fc5>Dès <span class=stl_taux>0,49 %</span> TAEG FIXE,</span><br>boostez vos envies de projets. TF</span>",
    "baselineLabel": "txtBaselineFT",
    "ctaLabel": ["textTF", "textTF.html"],
    "ctaUrl": "textTF.html",
    "noticeLabel": "noticeLabelTF",
    "visualUrl": {
      "webpx2": "/static/Particuliers/assets/campagne/534559452-BannerFicheProd_x1.jpg",
      "webpx1": "/static/Particuliers/assets/campagne/534559452-BannerFicheProd_x1.jpg",
      "jpgx1": "/static/Particuliers/assets/campagne/534559452-BannerFicheProd_x1.jpg"
    }
  }
};

class ElementFinder {
  constructor(jsonData, parentElement = document, excludeList = []) {
    this.jsonData = jsonData;
    this.parentElement = parentElement;
    this.excludeList = excludeList;
  }

  findElements() {
    this._findElementsWithKeys(this.jsonData, this.parentElement, this.excludeList);
  }

  _findElementsWithKeys(json, parentElement, excludeList) {
    for (const key in json) {
      if (!excludeList.includes(key)) {
        if (typeof json[key] === 'object' && json[key] !== null) {
          // Si la valeur est un objet, récursion
          this._findElementsWithKeys(json[key], parentElement, excludeList);
        } else {
          // Recherche des éléments dans le DOM avec le même nom que la clé
          const elements = parentElement.querySelectorAll(`[data-${key}]`);
          console.log(elements);
          elements.forEach((element) => {
            // Vérifier si l'élément est une image
            if (element.tagName.toLowerCase() === 'img') {
              console.log(`Image trouvée pour la clé "${key}":`, element);
            }
            // Vérifier si l'élément est un lien
            else if (element.tagName.toLowerCase() === 'a' && element.hasAttribute('href')) {
              //  // Si ctaLabel est un tableau
              //  if (key === 'ctaLabel' && Array.isArray(json[key])) {
              //   // Assigne la première valeur du tableau comme texte
              //   element.textContent = json[key][0];
              //   // Assigne la deuxième valeur du tableau comme href
              //   element.setAttribute('href', json[key][1]);
              // } else {
              //   // Si ce n'est pas un tableau, ajoute la valeur de la clé comme texte
              //   element.textContent = json[key];
              // }
              // Afficher le résultat dans la console
              console.log(`Lien trouvé pour la clé "${key}":`, element);
            }
            // Cas par défaut (autres types d'éléments)
            else {
              console.log(`Autre élément trouvé pour la clé "${key}":`, element);
              // Ajouter la valeur de la clé comme texte ou contenu de l'élément
              element.textContent = json[key];
            }
          });
        }
      }
    }
  }
}

// Éléments à exclure (exemple)
const elementsToExclude = ['id', 'dateDebut', 'dateFin', 'nameCampaign'];

// Créer une instance de la classe ElementFinder
const elementFinder = new ElementFinder(jsonData);

// Appeler la méthode findElements
elementFinder.findElements();