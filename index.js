// Votre JSON
const jsonData = {
  "id": 1,
  "dateDebut": 1704063653000,
  "dateFin": 1706655653000,
  "nameCampaign": "temps_forts",
  "target": {
    "tagLabel": "txtTF1",
    "tagDate": "dateTF2",
    "titleLabel": "<span style=color:#ff8fc5>Dès <span class=stl_taux>0,49 %</span> TAEG FIXE,</span><br>boostez vos envies de projets. TF1</span>",
    "baselineLabel": "txtBaselineFT1",
    "ctaLabel": "ctaLabel1",
    "ctaLabel1": {
      "ctaUrl": "ctaUrlTest1",
      "ctaText": "ctaLabelTest1"
    },
    "ctaUrl": "ctaUrl",
    "ctaUrlImg": "textTF1.html",
    "noticeLabel": "noticeLabelTF1",
    "visualUrl": {
      "webpx2": "/static/Particuliers/assets/campagne/534559452-BannerFicheProd_x1.jpg",
      "webpx1": "/static/Particuliers/assets/campagne/534559452-BannerFicheProd_x1.jpg",
      "jpgx1": "/static/Particuliers/assets/campagne/534559452-BannerFicheProd_x1.jpg"
    }
  },
  
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

    if (json.target && typeof json.target === 'object' && json.target !== null) {
      for (const key in json.target) {
        // if (!excludeList.includes(key)) {
          if (json.target.hasOwnProperty(key)) {
          // if (typeof json[key] === 'object' && json[key] !== null) {
            // Si la valeur est un objet, récursion
          //   this._findElementsWithKeys(json[key], parentElement, excludeList);
          // } else {

          const value = json.target[key];
            console.log(value);
            // Recherche des éléments dans le DOM avec le même nom que la clé
            const elements = parentElement.querySelectorAll(`[data-${key}]`);
            // console.log(elements);
            elements.forEach((element) => {
              // Vérifier si l'élément est une image
              if (element.tagName.toLowerCase() === 'img') {
                console.log(`Image trouvée pour la clé "${key}":`, element);
                // element.src = json[key]
                element.src = value

                if( key === 'visualUrl') {
                   element.src = value.jpgx1
                }
              }
              // Vérifier si l'élément est un lien
              else if (element.tagName.toLowerCase() === 'a' && element.hasAttribute('href')) {

                // element.textContent = value;
                // element.textContent = json[key];
                // element.href = json["ctaUrl"];

                              // Condition spécifique pour la clé "ctaLabel1"
              // if (key === 'ctaLabel1') {
                element.textContent = value.ctaText;
                element.href = value.ctaUrl;
              // } else {
              //   element.textContent = value;
              //   element.href = json["ctaUrl"];
              // }

                // console.log(`Lien trouvé pour la clé "${key}":`, element);
              }
              // Cas par défaut (autres types d'éléments)
              else {
                // console.log(`Autre élément trouvé pour la clé "${key}":`, element);
                // Ajouter la valeur de la clé comme texte ou contenu de l'élément
                element.textContent = value;
                // element.textContent = json[key];
              }
            });
          }
        // }
      }
    }
  }
}

// Éléments à exclure (exemple)
const elementsToExclude = ['id', 'dateDebut', 'dateFin', 'nameCampaign', 'ctaUrl'];

// Créer une instance de la classe ElementFinder
const elementFinder = new ElementFinder(jsonData);

// Appeler la méthode findElements
elementFinder.findElements();