//constante die html elementen ophalen voor tekst aanpassen, knoppen laten werken en het wiel laat draaien.
const getalEl = document.querySelector('#getal-el')
const kleurEl = document.querySelector('#kleur-el')
const draairadKnop = document.querySelector("#draairadKnop")
const kiesnummerKnop = document.querySelector('#kiesNummer') 
const gekozenEl = document.querySelector("#gekozen-el")
const gekozennummerOpties = document.querySelector('#gekozenNummer') 
const wiel = document.querySelector('#wiel')

//constante met arrays voor de rode en zwarte nummers.
const rodeNummers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
const zwarteNummers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]

//constante voor de geluiden. Dit had ik vorig jaar van klasgenoot berend janssen geleerd.
const geluidCasino = new Audio("./audio/casinomuziek.mp3")
const geluidVerliezen = new Audio("./audio/verliezen.mp3")
const geluidWinnen = new Audio("./audio/winnen.mp3")
const geluidRoulette = new Audio("./audio/roulette.mp3")
const geluidChis = new Audio("./audio/chips.wav")
const geluidError = new Audio("./audio/error.mp3")

//variabele die ervoor zorgen dat er aan het rad gedraaid kan worden
let heeftnummerGekozen = false
let gekozenNummer = null;

//bron: https://www.youtube.com/watch?v=XE67z9vmbgo
//bron: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
//Deze functie zorgt ervoor dat een speler pas aan het rad kan draaien als hij een nummer heeft gekozen, een zorgt ervoor dat de juiste tekst wordt weergegeven.
function nummerKiezen() {
    gekozenNummer = parseInt(gekozennummerOpties.value)

    if (gekozenNummer >= 0 && gekozenNummer <= 36) {
        gekozenEl.textContent = (`je hebt nummer ${gekozenNummer} gekozen!`)
        geluidChis.play()
        heeftnummerGekozen = true
    } else {
        heeftnummerGekozen = false
    }
}

//bron: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
//bron: https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://openai.com/&ved=2ahUKEwjH0b2CipuMAxVDgP0HHQGkNG0QFnoECBkQAQ&usg=AOvVaw0428uXC88P9g34t6DemBOv
// functie die ervoor zorgt dat er een nummer wordt getrokken, de image gaat draaien en die de reset spel functie start wanneer het nodig is.
function draaiRad() {
    let kleur;

    if (heeftnummerGekozen === false) {
        geluidError.play()
        gekozenEl.textContent = "Kies een nummer voordat je draait!"
        return; 
    }  

    draairadKnop.disabled = true
    geluidRoulette.play()
    // Ik heb aan chatgpt gevraagd hoe ik een image laat draaien (regel 56 t/m 59)
    let randomNummer = Math.floor(Math.random()*37)
    let draaiHoek = (randomNummer / 37) * 360 + (5 * 360);
    wiel.style.transition = "transform 3s ease-out";
    wiel.style.transform = `rotate(${draaiHoek}deg)`;



    //bron: https://github.com/BerendJanssen/COOPA-jump/blob/main/script/script.js timer functie die wacht tot het balletje gerold is//
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
        setTimeout(resetSpel, 5000,)
    }, 6000)
} 

//functie die ervoor zorgt dat het spel correct wordt gereset zodat de speler opniew kan kiezen en draaien.
function resetSpel() {  
    gekozenEl.textContent = "gekozen nummer:"
    getalEl.textContent = "getrokken nummer:"
    kleurEl.textContent = "getrokken kleur:"

    wiel.style.transition = "none"; // Voorkom animatie bij reset
    wiel.style.transform = "rotate(0deg)"; // Terug naar beginstand

    heeftnummerGekozen = false;
    gekozenNummer = null;
    gekozennummerOpties.value = ""; 
    draairadKnop.disabled = false;
}

//eventlisteners die die het event linken aan de functie door middel van een klik
kiesnummerKnop.addEventListener('click', nummerKiezen);
draairadKnop.addEventListener('click', draaiRad);

