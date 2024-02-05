/**
 * Cette fonction lance la boucle de jeu, c'est à dire qu'elle demande à l'utilisateur de saisir tous les mots
 * contenus dans le tableau listePropositions. A chaque mot saisi, on incrémente le score de l'utilisateur
 * 
 * @param {array[string]} listePropositions 
 */

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition){
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}
/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score,nbMotsProposes) {
    let zoneScore = document.querySelector(".zoneScore")
    zoneScore.innerText = score+"/"+nbMotsProposes
    
}

/** 
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @throws {Error}
 */
function validerNom(nom) {
    if(nom.length<2)
    {
        throw new Error("Le nom est trop court")
    }
    
}
/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function verifierEmail(email) {

    let emailRegexp = new RegExp('[a-z0-9._-]+@[a-z0-9_-]+\\.[a-z0-9_-]+')

    if(!emailRegexp.test(email))
    {
        
        throw new Error("L'email n'est pas valide!")
    }
}
/**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
 * @param {string} message 
 */
function afficherMessageErreur(message) {
    
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        
        popup.append(spanErreurMessage)
    }
    
    spanErreurMessage.innerText = message
}
/**
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail 
 */
function gererFormulaire(scoreEmail) {
    try{
        let nomBalise = document.getElementById("nom")
        let emailBalise = document.getElementById("email")
        let nom = nomBalise.value
        let email = emailBalise.value
        validerNom(nom)
        verifierEmail(email)
        afficherEmail(nom,email,scoreEmail)
    } catch(erreur){
        afficherMessageErreur(erreur.message)
    }
}

function lancerJeu() {
    let score = 0
    let inputEcriture = document.getElementById("inputEcriture")
    let btnValiderMot = document.getElementById("btnValiderMot")
    let i = 0
    let listePropositions = listeMots
    let optionSource = document.querySelectorAll('input[type="radio"]')
    afficherProposition(listePropositions[i]) 
    btnValiderMot.addEventListener("click",() => {
        console.log(inputEcriture.value)
        if(listePropositions[i]===inputEcriture.value)
        {
            score++
        }
        i++
        afficherResultat(score,i)
        inputEcriture.value =""
        
        if(listePropositions[i] === undefined)
        {
            btnValiderMot.disabled = true
            afficherProposition("le jeu est fini!")
            
        }
        else
        {
            afficherProposition(listePropositions[i])
        }
     
    })
    for(let j=0; j<optionSource.length; j++)
    {
        optionSource[j].addEventListener('change',(event) => {
            
            if(event.target.id === "mots")
            {
                listePropositions = listeMots.slice()
            
            }
            else
            {
            listePropositions = listePhrases.slice()
            }
            afficherProposition(listePropositions[i])
            console.log(listePropositions);
            console.log(event.target.id);
        })
    }
    let form = document.querySelector("form")
    
        
    form.addEventListener("submit",(event) => {
        event.preventDefault()
        let scoreEmail = `${score}/${i}`
        gererFormulaire(scoreEmail)
    })


    afficherResultat(score,i)
}



