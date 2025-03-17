const draairadKnop = document.querySelector("#draairadKnop")
const getalEl = document.querySelector('#getal-el')
const kleurEl = document.querySelector('#kleur-el')
const geluidCasino = new Audio("./audio/casinomuziek.mp3")
const geluidVerliezen = new Audio("./audio/verliezen.mp3")
const geluidWinnen = new Audio("./audio/winnen.mp3")
const geluidRoulette = new Audio("./audio/roulette.mp3")

let wiel = document.querySelector('#wiel')


function draaiRad() {
    geluidRoulette.play()
    let randomNummer = Math.floor(Math.random()*37)
    console.log(randomNummer)
    let kleur;

    let draaiHoek = (randomNummer / 37) * 360 + (5 * 360);
    wiel.style.transition = "transform 3s ease-out";
    wiel.style.transform = `rotate(${draaiHoek}deg)`;

    if (randomNummer === 0) {
        kleur = "groen"
        getalEl.textContent = "Getrokken nummer: " + randomNummer
        kleurEl.textContent = "Getrokken kleur: " + kleur
    } else if (randomNummer === 1 || randomNummer === 3 || randomNummer === 5 || randomNummer === 7 || randomNummer === 9 ||
        randomNummer === 12 || randomNummer === 14 || randomNummer === 16 || randomNummer === 18 || randomNummer === 19 ||
        randomNummer === 21 || randomNummer === 23 || randomNummer === 25 || randomNummer === 27 || randomNummer === 30 ||
        randomNummer === 32 || randomNummer === 34 || randomNummer === 36) 
        { kleur = "rood"
        getalEl.textContent = "Getrokken nummer: " + randomNummer
        kleurEl.textContent = "Getrokken kleur: " + kleur
    } else {
        kleur = "zwart"
        getalEl.textContent = "Getrokken nummer: " + randomNummer
        kleurEl.textContent = "Getrokken kleur: " + kleur
    }
    console.log(kleur)
}
    

draairadKnop.addEventListener('click', draaiRad)