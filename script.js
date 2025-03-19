const draairadKnop = document.querySelector("#draairadKnop")
const getalEl = document.querySelector('#getal-el')
const kleurEl = document.querySelector('#kleur-el')
const gekozenEl = document.querySelector("#gekozen-el")
const kiesnummerKnop = document.querySelector('#kiesNummer') 
const gekozennummerOpties = document.querySelector('#gekozenNummer') 
const wiel = document.querySelector('#wiel')

//constante met arrays voor de rode en zwarte nummers//
const rodeNummers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
const zwarteNummers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]

//constante voor de geluiden. Dit had ik vorig jaar van klasgenoot berend janssen geleerd//
const geluidCasino = new Audio("./audio/casinomuziek.mp3")
const geluidVerliezen = new Audio("./audio/verliezen.mp3")
const geluidWinnen = new Audio("./audio/winnen.mp3")
const geluidRoulette = new Audio("./audio/roulette.mp3")
const geluidChis = new Audio("./audio/chips.wav")
const geluidError = new Audio("./audio/error.mp3")

let heeftnummerGekozen = false
let gekozenNummer = null;
let beginDraai = 0


//bron: https://www.youtube.com/watch?v=XE67z9vmbgo//
//bron: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals// 
function nummerKiezen() {
    gekozenNummer = parseInt(gekozennummerOpties.value)

    if (gekozenNummer >= 0 && gekozenNummer <= 36) {
        gekozenEl.textContent = (`je hebt nummer ${gekozenNummer} gekozen!`)
        geluidChis.play()
        heeftnummerGekozen = true
    } else {
        console.log("Kies een nummer voordat je doorgaat.");
        heeftnummerGekozen = false
    }
}



function draaiRad() {
    let kleur;

    if (heeftnummerGekozen === false) {
        geluidError.play()
        gekozenEl.textContent = "Kies een nummer voordat je draait!"
        return; 
    }  


    geluidRoulette.play()
    let randomNummer = Math.floor(Math.random()*37)
    let draaiHoek = (randomNummer / 37) * 360 + (5 * 360);
    wiel.style.transition = "transform 3s ease-out";
    wiel.style.transform = `rotate(${draaiHoek}deg)`;

    //https://github.com/BerendJanssen/COOPA-jump/blob/main/script/script.js timer functie die wacht tot het balletje gerold is//
    setTimeout(function () {
        if (randomNummer === 0) {
            kleur = "groen"
            getalEl.textContent = "Getrokken nummer: " + randomNummer
            kleurEl.textContent = "Getrokken kleur: " + kleur
        } else if (rodeNummers.includes(randomNummer)) 
            { kleur = "rood"
            getalEl.textContent = "Getrokken nummer: " + randomNummer
            kleurEl.textContent = "Getrokken kleur: " + kleur
        } else {
            kleur = "zwart"
            getalEl.textContent = "Getrokken nummer: " + randomNummer
            kleurEl.textContent = "Getrokken kleur: " + kleur
        }

        if (gekozenNummer === randomNummer) {
            geluidWinnen.play()
        } else {
            geluidVerliezen.play()
        }
    }, 6000)
    } 


kiesnummerKnop.addEventListener('click', nummerKiezen);
draairadKnop.addEventListener('click', draaiRad);

