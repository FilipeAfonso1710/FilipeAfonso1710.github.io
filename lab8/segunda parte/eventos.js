/*1.interatividade */

const a = document.querySelector('header')
const b = document.querySelector('div.content')
const d = document.querySelector('footer')

function mudaCor() {
    b.style.backgroundColor = '#ffce00'
    d.style.backgroundColor = '#dd0000'
    a.style.backgroundColor = 'black'
}
a.addEventListener('click', mudaCor);

/*2.interatividade */

const c = document.querySelector('h2#Lema')

function adicionaLema(){
    if(c.innerHTML != "Ich bin ein Berliner") {
    c.innerHTML = "Ich bin ein Berliner"
    } else 
    c.innerHTML = "Explore os encantos de Berlim"
}

c.addEventListener('mouseover', adicionaLema);
c.addEventListener('mouseout', adicionaLema);

/*3.interatividade */

const e = document.querySelector('p#foot')

function wiki(){
    alert("Para mais visite https://pt.wikipedia.org/wiki/Berlim")
}

e.addEventListener('click', wiki);

/*4.Interatividade*/

function saudacoes(){
    alert("Willkommen!")
}
addEventListener('load',saudacoes);