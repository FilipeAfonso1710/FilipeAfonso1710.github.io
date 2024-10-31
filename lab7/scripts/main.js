/*1.interatividade*/

const a = document.querySelector('primeiro')
function primeira(){
    if(a.innerHTML === 'Passa por aqui!'){
    a.innerHTML = 'Obrigado por passar';
    } else {
        a.innerHTML = 'Passa por aqui!';
    }

}
document.querySelector('primeiro').onmouseover=primeira;
document.querySelector('primeiro').onmouseout=primeira;

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

const d = document.querySelector('input')
const e = d.size

function corInput(){
    const count = 0    
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
d.addEventListener('keypress', corInput);