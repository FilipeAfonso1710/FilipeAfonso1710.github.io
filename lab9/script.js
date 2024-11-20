const main = document.querySelector('main');

//carrega a página e afins antes de executar a função
document.addEventListener('DOMContentLoaded', function () {
    
    produtos.forEach(produto => {
        const listaProdutos = document.createElement('section');
        const titulo = document.createElement("p");
        const genero = document.createElement("p");
        const imagem = document.createElement("img");
        const descricao = document.createElement("p");
        const botao = document.createElement("button");

        titulo.textContent = produto.title;
        genero.textContent = produto.category;
        imagem.src = produto.image;
        descricao.textContent = produto.description;
        botao.textContent= "Adicionar ao cesto"

        listaProdutos.append(titulo,imagem,descricao,botao);
        main.append(listaProdutos);
    });
});