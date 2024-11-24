class Combattant {
    constructor(nom, pointsDeVie, attaque, precision) {
        this.nom = nom;
        this.pointsDeVie = pointsDeVie;
        this.attaque = attaque;
        this.precision = precision;
    }

    // Fonction pour effectuer une attaque
    attaquer(adversaire) {
        // Vérifier si l'attaque touche
        const chanceDeToucher = Math.random(); // Génère un nombre aléatoire entre 0 et 1
        if (chanceDeToucher < this.precision) {
            // Si l'attaque touche, on réduit les points de vie de l'adversaire
            adversaire.pointsDeVie -= this.attaque;
            console.log(`${this.nom} attaque ${adversaire.nom} et lui inflige ${this.attaque} dégâts.`);
        } else {
            // Si l'attaque rate, on l'indique
            console.log(`${this.nom} attaque ${adversaire.nom}, mais rate l'attaque.`);
        }
    }

    // Fonction pour vérifier si le combattant est toujours en vie
    estVivant() {
        return this.pointsDeVie > 0;
    }
}

// Création des combattants
const VI = new Combattant("VI", 150, 18, 0.8); // 80% de chance de toucher
const JINX = new Combattant("JINX", 120, 23, 0.6); // 60% de chance de toucher


const messageElem = document.getElementById("message");
const startBtn = document.getElementById("startBtn");


function startCombat() {
    startBtn.disabled = true; // Désactiver le bouton une fois le combat commencé
    messageElem.textContent = "Le combat commence !";

    const interval = setInterval(() => {
        if (VI.estVivant() && JINX.estVivant()) {
            // VI attaque
            let message1 = VI.attaquer(JINX);
            // JINX attaque
            let message2 = JINX.attaquer(VI);

            // Afficher les messages et mettre à jour les points de vie
            messageElem.textContent = `${message1}\n${message2}`;
            pv1Elem.textContent = VI.pointsDeVie;
            pv2Elem.textContent = JINX.pointsDeVie;
        } else {
            clearInterval(interval); // Arrêter le combat lorsque l'un des combattants est vaincu
            if (VI.estVivant()) {
                messageElem.textContent = `${VI.nom} a remporté le combat !`;
            } else if (JINX.estVivant()) {
                messageElem.textContent = `${JINX.nom} a remporté le combat !`;
            }
        }
    }, 1000); // Combat chaque seconde
}

// Ajouter un événement au bouton pour démarrer le combat
startBtn.addEventListener("click", startCombat);

// Simulation du combat dans une boucle
while (VI.estVivant() && JINX.estVivant()) {
    // VI attaque
    VI.attaquer(JINX);
    // Vérifier si l'adversaire est toujours en vie
    if (!JINX.estVivant()) {
        console.log(`${JINX.nom} est vaincu !`);
        break;
    }

    // JINX attaque
    JINX.attaquer(VI);
    // Vérifier si l'adversaire est toujours en vie
    if (!VI.estVivant()) {
        console.log(`${VI.nom} est vaincu !`);
        break;
    }

    // Afficher l'état actuel des points de vie
    console.log(`${VI.nom} a ${VI.pointsDeVie} points de vie restants.`);
    console.log(`${JINX.nom} a ${JINX.pointsDeVie} points de vie restants.`);
}

// Déterminer le vainqueur
if (VI.estVivant()) {
    console.log(`${VI.nom} a remporté le combat !`);
} else if (JINX.estVivant()) {
    console.log(`${JINX.nom} a remporté le combat !`);
}
