// ============================================================================
// TP JAVASCRIPT - RAPPELS POUR REACT
// ============================================================================

import Car from './Car.js';
import * as fs from 'node:fs';

console.log("=== TP JAVASCRIPT - EXERCICES 1 À 8 ===\n");

// ============================================================================
// 1. LECTURE ET MANIPULATION DE FICHIERS JSON
// ============================================================================
// Énoncé : Lisez le fichier JSON 'voitures.json' et affichez son contenu
// sous différentes formes (raw, parsé, stringifié). 
// Pour cela vous pourrez utiliser la méthode readFileSync du module fs de Node,
// et l'objet JSON natifs à Javascript : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON

console.log("=== 1. Lecture et manipulation de fichiers JSON ===");

const rawData = fs.readFileSync('voitures.json', 'utf-8');
const data = JSON.parse(rawData);
const dataString = JSON.stringify(data);

// Affichage des différentes représentations des données
console.log(`\nRaw data (chaîne de caractères brute) :`);
console.log(rawData);
console.log(`\nJSON data parsé - Premier élément (affichage [object Object]) : ${data[0]}`);
console.log(`\nExemple d'accès à une propriété - ID du premier objet : ${data[0].id}`);
console.log(`Exemple d'accès imbriqué - Prénom du 3ème propriétaire : ${data[2].proprietaire.prenom}`);
console.log(`\nData re-stringifiée avec JSON.stringify :`);
console.log(dataString);

// ============================================================================
// 2. CRÉATION ET IMPORT DE CLASSE
// ============================================================================
// Énoncé : Créez une classe Car dans un fichier séparé (Car.js). 
// Cette classe devra avoir la meme structure que les objets présents dans voitures.json. 
// Elle devra obligatoirement contenir les paramètres : 
// id, modelName, ownerFirstName, ownerLastName, age et topSpeed.
// age et topSpeed pourront avoir des valeurs par défaut de 0.
// Définissez une méthode permettant d'afficher de manière lisible les atributs d'un objet de type Car.
// Ensuite ajouter une méthode statique pour décrire à quoi sert l'objet Car. 
// Enfin importez-la et instanciez-la pour constater que tout fonctionne.

console.log("\n=== 2. Création et import de classe ===");

// Création d'une instance de Car
const clio = new Car(101, "Clio", "Pedro", "Mucho");
console.log("\nInstance de Car créée :", clio);

// Appel d'une méthode statique
console.log("\nAppel de la méthode statique :");
Car.sayHello();

//appeller la méthode poru afficher les données
clio.printEssentialCarInfos();

// ============================================================================
// 3. TRANSFORMATION DE DONNÉES
// ============================================================================
// Énoncé : À partir des données du JSON, créez un tableau d'instances de Car

console.log("\n=== 3. Transformation de données ===");

const cars = data.map(voiture => new Car(
    voiture.id,
    voiture.modele.nom,
    voiture.proprietaire.prenom,
    voiture.proprietaire.nom,
    voiture.proprietaire.age,
    voiture.modele.vitesse_de_pointe_kmH
));

console.log(`\nNombre de voitures créées : ${cars.length}`);

// ============================================================================
// 4. UTILISATION DES MÉTHODES DE TABLEAUX
// ============================================================================
// Énoncé : Utilisez différentes méthodes sur les tableaux
// pour effectuer des opérations sur les données des voitures

console.log("\n=== 4. Utilisation des méthodes de tableaux ===");

// 4.1. Afficher les informations de chaque voiture de votre tableaux de voitures
console.log("\n4.1. ForEach - Affichage des voitures :");
console.log(`\nAffichage direct du tableau cars (ne marche pas bien) : ${cars}`);
console.log("\nUtilisation de forEach pour afficher chaque voiture :");
cars.forEach(car => car.printEssentialCarInfos());

// 4.2. Récupérer dans le tableau la voiture du modèle Clio
console.log("\n4.2. Find - Recherche du propriétaire de la Clio :");
const foundCar = cars.find(car => car.model.name === "Clio").owner.firstName;
console.log(`Propriétaire de la Clio : ${foundCar}`);

// 4.3. Calculer la somme des ages disponibles des propriétaires
console.log("\n4.3. Reduce - Calculs sur les voitures :");
const cumulatedAges = cars.reduce((acc, car) => acc + car.owner.age, 0);
console.log(`Somme des âges des propriétaires : ${cumulatedAges} ans`);

// 4.4. Calculer la vitesse de pointe moyenne sur toutes les voitures répertoriées
const topSpeedMean = cars.reduce((acc, car) => acc + car.model.topSpeed, 0) / cars.length;
console.log(`Vitesse de pointe moyenne : ${topSpeedMean} km/h`);

// ============================================================================
// 5. DESTRUCTURATION
// ============================================================================
// Énoncé : Utilisez la destructuration pour extraire des valeurs de tableaux
// et d'objets.

console.log("\n=== 5. Destructuration ===");

// 5.1. 
// On veut abandonner la représentation par tableau qui n'est pas forcément pratique
// On va destructurer le tableau en 3 objets cars distincts : clioCar, alpineCar et ferrariCar
console.log("\n5.1. Destructuration de tableau :");
const [clioCar, alpineCar, ferrariCar] = cars;

console.log("\nVoiture Alpine extraite :");
console.log(alpineCar);
console.log("\nAffichage des informations de l'Alpine :");
console.log(alpineCar.printEssentialCarInfos());

// 5.2. De même pour une manipulation plus simple nous voulons avoir à disposition, 
// le prénom, nom et l'âge du conducteur de la Alpine directement sous forme de variable.
console.log("\n5.2. Destructuration d'objet avec renommage :");
const { 
    firstName: alpineOwnerFirstName, 
    lastName: alpineOwnerLastName, 
    age: alpineOwnerAge 
} = alpineCar.owner;

console.log(`Prénom du propriétaire : ${alpineOwnerFirstName}`);
console.log(`Nom du propriétaire : ${alpineOwnerLastName}`);
console.log(`Âge du propriétaire : ${alpineOwnerAge} ans`);

// 5.3. Je souhaiterais avoir une fonction qui simplement prend un objet owner et m'affiche ses informations.
// Je dois être capable dans cette fonction de pouvoir manipuler les différents champs de l'objet, 
// sans faire appel à l'objet initial.
console.log("\n5.3. Fonction avec destructuration en paramètre :");
function printUser({ firstName, lastName, age }) {
    console.log(`Prénom : ${firstName}, Nom : ${lastName}, Âge : ${age} ans`);
}

console.log("Appel de printUser avec le propriétaire de l'Alpine :");
printUser(alpineCar.owner);

// 5.4. Similaire à la précédente question je voudrais avoir une fonction qui me permette de 
// manipuler toutes les informations d'une voiture sans avoir besoin de faire appel à l'objet passé.
// Vous pouvez prendre l'exemple de la voiture 103 et afficher ses informations sans appeler l'objet d'origine.
console.log("\n5.4. Destructuration imbriquée :");
const utilisateur = {
    nom: "Pedro",
    adresse: {
        rue: "123 Rue de Paris",
        ville: "Paris"
    }
};

const { nom, adresse: { rue, ville } } = utilisateur;
console.log(`Résultat de la destructuration imbriquée : ${nom}, ${rue}, ${ville}`);
// Résultat : "Pedro, 123 Rue de Paris, Paris"

// ============================================================================
// 6. SPREAD OPERATOR
// ============================================================================
// Énoncé : Comprenez la différence entre l'assignation par référence et 
// la copie avec le spread operator sur les tableaux et objets

console.log("\n=== 6. Spread Operator ===");

// 6.1. Créez un nouveau tableau "voitures" et affectez lui le précédent tableau cars.
// Modifiez le tableau "voitures". Affichez ensuite le tableau voitures et cars, que constatez-vous ?
console.log("\n6.1. Assignation par référence (sans spread) :");
const voitures = cars;
console.log("Avant modification - voitures[0] :", voitures[0].model.name);
console.log("Avant modification - cars[0] :", cars[0].model.name);

voitures[0] = voitures[1]; // Modifie aussi cars car c'est la même référence !

// Les tableaux et objets en JavaScript sont des types de données par référence 
// (et non par valeur). const protège uniquement la référence vers la mémoire 
// où le tableau est stocké, pas les données à l'intérieur.

console.log("\nAprès modification de voitures[0] :");
console.log("voitures[0] :", voitures[0].model.name);
console.log("cars[0] (également modifié !) :", cars[0].model.name);
console.log("cars === voitures ?", cars === voitures, "(même référence)");

// 6.2. Créez une copie d'une tablea cars disont "automobiles" mais cette fois-ci en 
// utilisant une manière qui me permettra d'avoir une copie distincte d'une tableau cars.
console.log("\n6.2. Copie avec spread operator :");
const automobiles = [...cars]; // Crée une nouvelle copie du tableau
console.log("Avant modification - automobiles[1] :", automobiles[1].model.name);
console.log("Avant modification - cars[1] :", cars[1].model.name);

automobiles[1] = automobiles[2];

console.log("\nAprès modification de automobiles[1] :");
console.log("automobiles[1] :", automobiles[1].model.name);
console.log("cars[1] (non modifié) :", cars[1].model.name);
console.log("cars === automobiles ?", cars === automobiles, "(références différentes)");

// ============================================================================
// 7. HIGHER ORDER FUNCTIONS ET FONCTIONS COMME VALEURS
// ============================================================================
// Énoncé : Explorez les fonctions en tant que valeurs de première classe,
// les fonctions anonymes, et les higher order functions

console.log("\n=== 7. Higher Order Functions et fonctions comme valeurs ===");

// 7.0. Créez une fonction anonyme et affectez la à une variable. Faites de même pour 
// une arrow function.
console.log("\n7.0. Fonctions anonymes :");

// Fonction anonyme classique
const a = function () {
    console.log("salut");
};
console.log(`Type de la variable 'a' : ${typeof a}`); // function

// Arrow function
const b = () => {
    console.log("salut");
};
console.log(`Type de la variable 'b' : ${typeof b}`); // function

// ============================================================================
// 7.1. HIGHER ORDER FUNCTION POUR FORMATER LES STRINGS
// ============================================================================
// Énoncé : Créer une fonction qui applique sur tous les champs de type string 
// du premier niveau d'un objet une potentielle méthode de formatage de string.
// Pour info : Object.entries(monObjet) retourne un array de paires [clé, valeur] 
// des propriétés énumérables d'un objet.

console.log("\n7.1. Higher order function pour formater les strings :");

const formatObjTxt = (obj, formatFunction) => {
    // Création d'une copie de l'objet avec spread operator
    const capsLockObj = { ...obj };
    
    // Parcours de toutes les propriétés de l'objet
    const res = Object.entries(capsLockObj).map(([key, value]) => {
        console.log(`Propriété : ${key}, Valeur : ${value}`);
        
        // Si la valeur est une string, on applique la fonction de formatage
        if (typeof value === "string") {
            const formattedString = formatFunction(value);
            console.log(`  → Après formatage : ${formattedString}`);
            capsLockObj[key] = formattedString;
        }
    });

    return capsLockObj;
};

// ============================================================================
// 7.2. FONCTIONS DE TRANSFORMATION DE STRINGS
// ============================================================================
// Énoncé : Créer 2 fonctions permettant de prendre une string et de 
// transformer tous ses caractères en majuscule et une autre en minuscule.

console.log("\n7.2. Fonctions de transformation :");

// Fonction classique pour mettre en majuscules
const capsLock = function (a) {
    return a.toUpperCase();
};

// Arrow function pour mettre en minuscules
const noCapsLock = (b) => {
    return b.toLowerCase();
};

console.log("Fonctions capsLock et noCapsLock créées");

// ============================================================================
// 7.3. APPLICATION DE LA FONCTION DE FORMATAGE
// ============================================================================
// Énoncé : Utiliser maintenant votre précédente fonction pour appliquer 
// une transformation des strings à un sous-objet owner de la class Car. Vous pouvez 
// l'appliquer sur le propriétaire de la voiture Alpine par exemple. 

console.log("\n7.3. Application de formatage sur un sous-objet :");

// Application avec la fonction capsLock
console.log("\nApplication de capsLock sur alpineCar.owner :");
const ownerUpperCase = formatObjTxt(alpineCar.owner, capsLock);
console.log("Résultat :", ownerUpperCase);

// Application avec une arrow function inline
console.log("\nApplication de toLowerCase inline sur alpineCar.owner :");
const ownerLowerCase = formatObjTxt(alpineCar.owner, (b) => {
    return b.toLowerCase();
}); // Exactement pareil que noCapsLock
console.log("Résultat :", ownerLowerCase);

// Note : Pourquoi String.toLowerCase ne fonctionne pas directement ?
// console.log(formatObjTxt(alpineCar.owner, String.toLowerCase))
// toLowerCase doit être appelé sur une string pour fonctionner. 
// Ce n'est pas une fonction statique mais une méthode d'instance.

// ============================================================================
// 7.4. APPLICATION SUR UN OBJET COMPLET
// ============================================================================
// Énoncé : Appliquer maintenant cette fonction sur tout l'objet. 
// Essayez de trouver la manière la plus élégante/simple/réutilisable de le faire

console.log("\n7.4. Application sur un objet complet :");

// Méthode 1 : Manuelle (moins élégante)
console.log("\nMéthode 1 - Manuelle :");
const capsLockAlpineCar = {
    "id": alpineCar.id,
    "model": formatObjTxt(alpineCar.model, capsLock),
    "owner": formatObjTxt(alpineCar.owner, capsLock)
};
console.log("Alpine en majuscules :", capsLockAlpineCar);

// Méthode 2 : Fonction réutilisable (plus élégante)
console.log("\nMéthode 2 - Fonction réutilisable :");
const applyMethodsToCar = (car, method, typoMethod) => {
    return {
        "id": car.id,
        "model": method(car.model, typoMethod),
        "owner": method(car.owner, typoMethod),
    };
};

const allCapsAlpineCar = applyMethodsToCar(alpineCar, formatObjTxt, capsLock);
console.log("Alpine en majuscules :", allCapsAlpineCar);

const lowerCapsAlpineCar = applyMethodsToCar(alpineCar, formatObjTxt, noCapsLock);
console.log("Alpine en minuscules :", lowerCapsAlpineCar);


// ============================================================================
// 8. GESTION DES ERREURS
// ============================================================================

console.log("\n=== EXERCICE 8 : GESTION DES ERREURS ===\n");

// ============================================================================
// 8.1. Try-Catch basique
// ============================================================================
// Énoncé : Créez une fonction parseCarData(jsonString) qui prend une chaîne 
// JSON et retourne l'objet parsé. Si le parsing échoue, la fonction doit 
// capturer l'erreur et retourner null tout en affichant un message d'erreur 
// dans la console.

console.log("--- 8.1. Try-Catch basique ---");

function parseCarData(jsonString) {
    try {
        // Tentative de parsing de la chaîne JSON
        const parsedData = JSON.parse(jsonString);
        return parsedData;
    } catch (error) {
        // En cas d'erreur, on l'affiche et on retourne null
        console.error(`Erreur de parsing JSON : ${error.message}`);
        return null;
    }
}

// Tests
const validJson = '{"modele": "Clio", "prix": 15000}';
const invalidJson = '{modele: "Clio", prix: 15000}'; // JSON invalide (manque guillemets)

console.log("Parsing JSON valide :", parseCarData(validJson));
console.log("Parsing JSON invalide :", parseCarData(invalidJson));

// ============================================================================
// 8.2. Erreurs personnalisées
// ============================================================================
// Énoncé : Créez une classe d'erreur personnalisée CarValidationError qui 
// étend Error. Ensuite, créez une fonction validateCar(car) qui vérifie 
// qu'un objet voiture possède bien les propriétés id, model et owner. 
// Si une propriété manque, lancez une CarValidationError avec un message explicite.

console.log("\n--- 8.2. Erreurs personnalisées ---");

// Classe d'erreur personnalisée
class CarValidationError extends Error {
    constructor(message) {
        super(message); // Appel du constructeur parent
        this.name = "CarValidationError"; // Nom de l'erreur personnalisé
    }
}

function validateCar(car) {
    // Vérification de la présence des propriétés obligatoires
    const requiredProperties = ['id', 'model', 'owner'];
    
    for (const prop of requiredProperties) {
        if (!(prop in car)) {
            // Lance une erreur personnalisée si une propriété manque
            throw new CarValidationError(`Propriété manquante : ${prop}`);
        }
    }
    
    return true;
}

// Tests
const incompleteCar = { id: 1, model: { name: "Clio" } }; // manque owner
const completeCar = { id: 1, model: { name: "Clio" }, owner: { firstName: "Jean" } };

try {
    validateCar(incompleteCar);
    console.log("Voiture incomplète validée (ne devrait pas s'afficher)");
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}

try {
    validateCar(completeCar);
    console.log("Voiture complète validée avec succès !");
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}

// ============================================================================
// 8.3. Finally et nettoyage de ressources
// ============================================================================
// Énoncé : Créez une fonction loadCarsFromFile(filename) qui :
// - Ouvre et lit un fichier JSON de voitures
// - Parse les données
// - Gère les erreurs potentielles (fichier inexistant, JSON invalide)
// - Utilise finally pour afficher un message "Opération de lecture terminée" 
//   dans tous les cas

console.log("\n--- 8.3. Finally et nettoyage de ressources ---");

function loadCarsFromFile(filename) {
    let fileData = null;
    
    try {
        console.log(`Tentative de lecture du fichier : ${filename}`);
        
        // Lecture du fichier (peut lever une erreur si le fichier n'existe pas)
        const rawFileData = fs.readFileSync(filename, 'utf-8');
        
        // Parsing du JSON (peut lever une erreur si le JSON est invalide)
        fileData = JSON.parse(rawFileData);
        
        console.log(`Fichier chargé avec succès : ${fileData.length} voiture(s) trouvée(s)`);
        return fileData;
        
    } catch (error) {
        // Gestion des différents types d'erreurs
        if (error.code === 'ENOENT') {
            console.error(`Erreur : Le fichier "${filename}" n'existe pas`);
        } else if (error instanceof SyntaxError) {
            console.error(`Erreur : Le fichier "${filename}" contient du JSON invalide`);
        } else {
            console.error(`Erreur inattendue : ${error.message}`);
        }
        return null;
        
    } finally {
        // Ce bloc s'exécute TOUJOURS, qu'il y ait eu une erreur ou non
        console.log("Opération de lecture terminée");
    }
}

// Tests
loadCarsFromFile('voitures.json'); // Fichier existant
loadCarsFromFile('fichier_inexistant.json'); // Fichier inexistant

// ============================================================================
// 8.4. Propagation d'erreurs
// ============================================================================
// Énoncé : Créez une fonction calculateAverageSpeed(cars) qui :
// - Vérifie que le paramètre est bien un tableau (sinon lance une TypeError)
// - Calcule la vitesse moyenne des voitures
// - Si une voiture n'a pas de topSpeed défini, lance une erreur personnalisée 
//   MissingDataError
//
// Ensuite, créez une fonction safeCalculateAverageSpeed(cars) qui appelle 
// calculateAverageSpeed et gère toutes les erreurs possibles en retournant 
// un objet { success: boolean, result?: number, error?: string }.

console.log("\n--- 8.4. Propagation d'erreurs ---");

// Classe d'erreur pour données manquantes
class MissingDataError extends Error {
    constructor(message) {
        super(message);
        this.name = "MissingDataError";
    }
}

function calculateAverageSpeed(cars) {
    if (!Array.isArray(cars)) {
        throw new TypeError("Le paramètre doit être un tableau");
    }
    
    if (cars.length === 0) {
        throw new Error("Le tableau ne peut pas être vide");
    }
    
    const totalSpeed = cars.reduce((acc, car, index) => {
        if (!car.model || car.model.topSpeed === undefined) {
            throw new MissingDataError(
                `La voiture à l'index ${index} n'a pas de vitesse de pointe définie`
            );
        }
        
        return acc + car.model.topSpeed;
    }, 0);
    
    return totalSpeed / cars.length;
}

function safeCalculateAverageSpeed(cars) {
    try {
        const result = calculateAverageSpeed(cars);
        // Retour en cas de succès
        return {
            success: true,
            result: result
        };
    } catch (error) {
        // Retour en cas d'erreur avec le message
        return {
            success: false,
            error: `${error.name}: ${error.message}`
        };
    }
}

// Tests
console.log("Calcul avec données valides :", safeCalculateAverageSpeed(cars));
console.log("Calcul avec paramètre invalide :", safeCalculateAverageSpeed("pas un tableau"));
console.log("Calcul avec tableau vide :", safeCalculateAverageSpeed([]));

const carsWithMissingData = [
    cars[0],
    { id: 999, model: {}, owner: {} } // Voiture sans topSpeed
];
console.log("Calcul avec données manquantes :", safeCalculateAverageSpeed(carsWithMissingData));

// ============================================================================
// 8.5. Async/Await et gestion d'erreurs
// ============================================================================
// Énoncé : Créez une fonction asynchrone fetchCarDataFromAPI(carId) qui 
// simule un appel API :
// - Utilise setTimeout avec une Promise pour simuler un délai de 1 seconde
// - Retourne les données d'une voiture si l'ID existe dans votre tableau cars
// - Rejette la Promise avec une erreur si l'ID n'existe pas
// - Gérez l'erreur avec try-catch dans une fonction getCarSafely(carId)

console.log("\n--- 8.5. Async/Await et gestion d'erreurs ---");

function fetchCarDataFromAPI(carId) {
    return new Promise((resolve, reject) => {
        // Simulation d'un délai réseau de 1 seconde
        setTimeout(() => {
            // Recherche de la voiture par ID
            const car = cars.find(c => c.id === carId);
            
            if (car) {
                console.log(`API : Voiture ${carId} trouvée`);
                resolve(car);
            } else {
                console.log(`API : Voiture ${carId} non trouvée`);
                reject(new Error(`Aucune voiture trouvée avec l'ID ${carId}`));
            }
        }, 1000);
    });
}

async function getCarSafely(carId) {
    try {
        console.log(`Recherche de la voiture avec ID ${carId}...`);
        const carData = await fetchCarDataFromAPI(carId);
        console.log(`Succès ! Voiture récupérée :`, carData.model.name);
        return carData;
    } catch (error) {
        console.error(`Erreur lors de la récupération : ${error.message}`);
        return null;
    }
}

// Tests (décommenter pour exécuter - asynchrone)
// await getCarSafely(cars[0].id); // ID existant
// await getCarSafely(9999); // ID inexistant

// ============================================================================
// 8.6. Chaînage d'erreurs et contexte (bonus difficile)
// ============================================================================
// Énoncé : Créez une fonction processCarBatch(carDataArray) qui :
// - Prend un tableau de données brutes de voitures
// - Pour chaque voiture, tente de la valider puis de la transformer en instance de Car
// - Collecte toutes les erreurs rencontrées sans interrompre le traitement
// - Retourne un objet contenant les voitures réussies et les erreurs avec 
//   leur contexte (index, données originales, message d'erreur)

console.log("\n--- 8.6. Chaînage d'erreurs et contexte ---");

function processCarBatch(carDataArray) {
    const successful = [];
    const failed = [];
    
    // Traitement de chaque voiture individuellement
    carDataArray.forEach((carData, index) => {
        try {
            // Validation de la structure de base
            if (!carData || typeof carData !== 'object') {
                throw new Error("Les données ne sont pas un objet valide");
            }
            
            // Validation des champs obligatoires
            if (!carData.id) {
                throw new CarValidationError("ID manquant");
            }
            
            if (!carData.modele || !carData.modele.nom) {
                throw new CarValidationError("Nom du modèle manquant");
            }
            
            if (!carData.proprietaire) {
                throw new CarValidationError("Propriétaire manquant");
            }
            
            // Création de l'instance Car
            const car = new Car(
                carData.id,
                carData.modele.nom,
                carData.proprietaire.prenom || "Inconnu",
                carData.proprietaire.nom || "Inconnu",
                carData.proprietaire.age || 0,
                carData.modele.vitesse_de_pointe_kmH || 0
            );
            
            // Ajout aux voitures réussies
            successful.push(car);
            
        } catch (error) {
            // Collecte de l'erreur avec son contexte
            failed.push({
                index: index,
                data: carData,
                error: `${error.name}: ${error.message}`
            });
        }
    });
    
    return {
        successful,
        failed
    };
}

// Données de test avec plusieurs cas d'erreur
const batchData = [
    // Voiture valide
    {
        id: 1,
        modele: { nom: "Clio", vitesse_de_pointe_kmH: 180 },
        proprietaire: { prenom: "Jean", nom: "Dupont", age: 30 }
    },
    // Voiture sans ID
    {
        modele: { nom: "Alpine" },
        proprietaire: { prenom: "Marie", nom: "Martin" }
    },
    // Voiture sans modèle
    {
        id: 3,
        proprietaire: { prenom: "Pierre", nom: "Durand" }
    },
    // Données invalides (non-objet)
    "données invalides",
    // Voiture valide
    {
        id: 5,
        modele: { nom: "Ferrari", vitesse_de_pointe_kmH: 340 },
        proprietaire: { prenom: "Luc", nom: "Bernard", age: 45 }
    },
    // Voiture sans propriétaire
    {
        id: 6,
        modele: { nom: "Porsche", vitesse_de_pointe_kmH: 310 }
    }
];

const result = processCarBatch(batchData);

console.log(`\n✅ Voitures traitées avec succès : ${result.successful.length}`);
result.successful.forEach((car, i) => {
    console.log(`  ${i + 1}. ${car.model.name} (ID: ${car.id})`);
});

console.log(`\n❌ Voitures en erreur : ${result.failed.length}`);
result.failed.forEach((failure) => {
    console.log(`  Index ${failure.index}: ${failure.error}`);
    console.log(`    Données : ${JSON.stringify(failure.data)}`);
});