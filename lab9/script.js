const main = document.querySelector('main');
const aside = document.querySelector('aside');


/*Verifica se já existe*/

if (!localStorage.getItem('cesto')) {
    localStorage.setItem('cesto', "[]");
}
    
let cesto = JSON.parse(localStorage.getItem('cesto'));


/*Só um teste*/
console.log(cesto)



//carrega a página e afins antes de executar a função
document.addEventListener('DOMContentLoaded', function () {
    
    produtos.forEach(produto => {
        const listaProdutos = document.createElement('article');
        const titulo = document.createElement("p");
        const genero = document.createElement("p");
        const imagem = document.createElement("img");
        const descricao = document.createElement("p");
        const botao = document.createElement("button");

        titulo.textContent = produto.title;
        genero.textContent = produto.category;
        imagem.src = produto.image;
        descricao.textContent = produto.description;
        botao.textContent= "+ Adicionar ao cesto"
        

        listaProdutos.append(titulo,imagem,descricao,botao);
        main.append(listaProdutos);

        /*Adiciona o produto ao cesto*/

        botao.addEventListener('click',() => {
          cesto.push(produto);
          localStorage.setItem('cesto', JSON.stringify(cesto));
        });
    });
});

document.addEventListener('DOMContentLoaded', function atualizaCesto(){
    cesto.forEach(produto => {
        const produtosNoCesto = document.createElement('article');
        const titulo = document.createElement("p");
        const genero = document.createElement("p");
        const imagem = document.createElement("img");
        const botao = document.createElement("button");

        titulo.textContent = produto.title;
        genero.textContent = produto.category;
        imagem.src = produto.image;
        botao.textContent= "Remover do cesto"

        produtosNoCesto.append(titulo,imagem,botao)
        aside.append(produtosNoCesto);

        botao.addEventListener('click',() => {
            const indice = frutas.indexOf("produto");
            retirado = cesto.splice(indice,1);
            localStorage.setItem('cesto', JSON.stringify(cesto));
          });
    });
});
