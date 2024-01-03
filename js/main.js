const display = document.getElementById("display");
const qntPadraoCartas = 10;
let totalCartasVirada = 0;
let cartasRodada = [];
let points = 0;

function start() {
    const difficulty = Number(document.getElementById("difficulty").value) * qntPadraoCartas;
    const totalCartas = difficulty / 2;
    const listaCartas = [];
    const tabuleiro = [];
    // display.innerHTML = "";

    for (var c=1; c <= totalCartas ; ++c) {
        listaCartas.push(c);
    }

    // Adicionando cartas no trabuleiro de randomica
    for (var i=1 ; i <= difficulty ; ++i ) {
        const indexLista = Math.floor(Math.random() * listaCartas.length);
        const cartaAleatoria = listaCartas[indexLista];
        
        let contador = 1;

        for (let i = 0; i < tabuleiro.length; i++) {
            if (tabuleiro[i] === cartaAleatoria) {
                contador++;
            }
        }

        if (contador < 3) {
            tabuleiro.push(cartaAleatoria);
        }
    }

    // Valida e adiciona as cartas que nao foi possivel incluir de forma randomica
    for (var c=1; c <= totalCartas ; ++c) {
        let contador = 0;

        for (let i = 0; i < tabuleiro.length; i++) {
            if (tabuleiro[i] === c) {
                contador++;
            }
        }

        if (contador !== 2) {
            tabuleiro.push(c);
            if (contador === 0){tabuleiro.push(c)}
        }
    }

    const tabuleiroGame = document.createElement("div");
    tabuleiroGame.className = "tabuleiro";

    const vida = document.createElement("div");
    vida.className = "vida";
    const vidaBarra = document.createElement("span");
    vidaBarra.className = "vida-barra";
    vida.appendChild(vidaBarra);

    const vPoints = document.createElement("span");
    vPoints.innerText = points;
    vPoints.className = "points";

    tabuleiro.forEach((carta,index)=>addCartaNoTabuleiro(carta,index,tabuleiroGame));
    display.appendChild(tabuleiroGame);
    display.appendChild(vida);
    display.appendChild(vPoints);
    setTimeout(timer,1000);
}

function addCartaNoTabuleiro(carta,index,tabuleiro) {
    const card = document.createElement("div");
    card.id=carta;
    card.title=carta;
    card.innerText="?";
    card.className="card";
    card.setAttribute("onclick","cardClick(this)");
    card.setAttribute("visivel",false)
    tabuleiro.appendChild(card);
}

function cardClick(element) {
    if (cartasRodada.length == 2) {return false}

    cartasRodada.push(element);
    element.classList.add("card-click");
    element.innerText = element.id;

    if (cartasRodada.length == 2) {
        return verificaCartas(element);
    }
}

function verificaCartas(card) {
    if(cartasRodada[0].id === card.id) {
        setTimeout(pontoPositivo,500);
    } else {
        setTimeout(pontoNegatico,1000);
    }
}

function pontoPositivo() {
    const clockTime = document.querySelector("span.vida-barra");
    clockTime.style.width = `${clockTime.clientWidth + 20}px`;
    points = points + 2;

    cartasRodada.forEach((card)=>{
        card.style.display = "none";
    });

    cartasRodada = [];
    atualizarPontos();
}


function pontoNegatico() {
    const clockTime = document.querySelector("span.vida-barra");
    clockTime.style.width = `${clockTime.clientWidth - 10}px`;

    cartasRodada.forEach((card)=>{
        card.innerText = "?";
        card.classList.remove("card-click");
    });

    cartasRodada = [];
    atualizarPontos();
}

function timer() {
    const clockTime = document.querySelector("span.vida-barra");
    clockTime.style.width = `${clockTime.clientWidth - 1}px`;

    if (clockTime.clientWidth > 0) {
        return setTimeout(timer,50);
    } else {
        fimDeJogo();
    }
}

function atualizarPontos () {
    const vPoints = document.querySelector("span.points");
    vPoints.innerText = points;
}

function fimDeJogo() {
    const endGame = document.createElement("span");

    const title = document.createElement("h1")
    title.innerText = `FIM DE JOGO`;
    title.className = "end-game-title";

    const text = document.createElement("h2")
    text.innerHTML = `<span>Total de pontos</span><span>${points}</span>`
    text.className = "end-game-text";

    const restart = document.createElement("button");
    restart.addEventListener("click",reiniciarFun);
    restart.className="end-game-btnrestart";
    restart.innerText="Reiniciar";

    endGame.className="end-game";
    endGame.appendChild(title);
    endGame.appendChild(text);
    endGame.appendChild(restart);

    display.appendChild(endGame);
}

function reiniciarFun() {
    window.location.reload();
}
