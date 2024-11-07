/*1.interatividade*/

const a = document.querySelector('primeiro')
function primeira() {
    if (a.innerHTML === 'Passa por aqui!') {
        a.innerHTML = 'Obrigado por passar';
    } else {
        a.innerHTML = 'Passa por aqui!';
    }

}
a.onmouseover = primeira;
a.onmouseout = primeira;

/*2.interatividade*/

const b = document.querySelector('segunda')

document.querySelectorAll("#color>button").forEach((e) => {

    e.addEventListener("click", () => {
        b.style.color = e.dataset.color;
    }
);
})



/*3.interatividade*/

const d = document.querySelector('input#arcoIris')
let count = 0

function corInput() {
    if (count === 0) {
        d.style.backgroundColor = "red";
        count++
    } else if (count === 1) {
        d.style.backgroundColor = "grey";
        count++
    } else if (count === 2) {
        d.style.backgroundColor = "orange";
        count++
    } else if (count === 3) {
        d.style.backgroundColor = "green";
        count = 0
    }
}
d.addEventListener('keydown', corInput);

/*4.interatividade*/

document.querySelector('select').onchange = function() {
    document.querySelector('body').style.backgroundColor = this.value;
}

/*Recorri ao chatgpt para encontrar o valor da constante e. E não utilizei um botão submit pq ao utilizar a minha página fazia refresh*/

/*5.interatividade*/

if(!localStorage.getItem('numero')) {
    localStorage.setItem('numero',0);
}

const h = document.querySelector('#numero')
const i = document.querySelector('button#count')

function contar() {
    let valor = localStorage.getItem('numero');
    h.innerText = ++valor;
    localStorage.setItem('numero', valor);
}
i.addEventListener('click', contar);
h.textContent = localStorage.getItem('a#numero')
/*6.interatividade*/

const p = document.querySelector('#saudações')
const q = document.querySelector('#nome')
const r = document.querySelector('#idade')
document.querySelector('form').onsubmit = (e) => {
    // do not reload the page
    e.preventDefault()
    p.textContent = 'Olá, o ' + q.value + ' tem ' + r.value + '!';
};

/*7.interatividade*/

let contador = 0;
const counter = document.querySelector('#counter');

function soma() {
    counter.innerHTML++
}
setInterval(soma, 1000);