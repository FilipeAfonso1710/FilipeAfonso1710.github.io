/*1.interatividade*/

const a = document.querySelector('primeiro')
function primeira(){
    if(a.innerHTML === 'Passa por aqui!'){
    a.innerHTML = 'Obrigado por passar';
    } else {
        a.innerHTML = 'Passa por aqui!';
    }

}
a.onmouseover=primeira;
a.onmouseout=primeira;

/*2.interatividade*/

const b = document.querySelector('segunda')
const c = document.getElementsByTagName('button')

function corFrase(){
    if(this.innerHTML === 'Red'){
        b.style.color = "red";
    } else if(this.innerHTML === 'Blue'){
        b.style.color = "blue";
    } else {
        b.style.color = "green";
    }
}
c[0].addEventListener('click', corFrase);
c[1].addEventListener('click', corFrase);
c[2].addEventListener('click', corFrase);

/*3.interatividade*/

const d = document.querySelector('input#arcoIris')
let count = 0 

function corInput(){   
    if(count === 0){
    d.style.backgroundColor = "red";
    count++
    } else if (count === 1) {
    d.style.backgroundColor = "grey";
    count++
    } else if (count === 2){
    d.style.backgroundColor = "orange";
    count++
    } else if (count === 3){
    d.style.backgroundColor = "green";
    count = 0
    }
}
d.addEventListener('keydown', corInput);

/*4.interatividade*/

const e = document.querySelector('input#submeteCor')
const f = document.querySelector('button#submeter')
const g = document.querySelector('body')

function corBackground(){
    g.style.backgroundColor = e.value
}
f.addEventListener('click', corBackground);

/*Recorri ao chatgpt para encontrar o valor da constante e. E não utilizei um botão submit pq ao utilizar a minha página fazia refresh*/

/*5.interatividade*/

const h = document.querySelector('a#numero')
const i = document.querySelector('button#count')

function contar(){
    h.innerHTML++
}
i.addEventListener('click', contar);