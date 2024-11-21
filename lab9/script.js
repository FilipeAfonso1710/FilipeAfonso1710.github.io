const main = document.querySelector('main');
const aside = document.querySelector('section#cesto');
let precoTotal = document.querySelector('p#preco');
let teste = 0;

/* Verifica se já existe */
if (!localStorage.getItem('cesto')) {
    localStorage.setItem('cesto', "[]");
}

let cesto = JSON.parse(localStorage.getItem('cesto'));

/* Só um teste */
console.log(cesto);

// Função para renderizar o cesto
function renderizarCesto() {
    // Limpa o conteúdo atual do cesto
    aside.innerHTML = "";
    //Limpar o teste
    teste = 0;
    if (teste === 0){
        precoTotal.textContent = "";
        } else {
            precoTotal.textContent = "Custo total: " + teste;
        }

//Pedi ao chatGPT ajuda para atualizar o DOM em tempo real 
//já que só acontecia quando dava refresh a página

    // Renderiza cada produto no cesto
    cesto.forEach((produto, index) => {
        const produtosNoCesto = document.createElement('article');
        const titulo = document.createElement("p");
        const preco = document.createElement("p");
        const imagem = document.createElement("img");
        const botao = document.createElement("button");
        
        titulo.textContent = produto.title;
        preco.textContent = "Custo :" + produto.price;
        imagem.src = produto.image;
        botao.textContent = "Remover do cesto";

        teste += produto.price;
        produtosNoCesto.append(titulo, imagem, preco, botao);

        //calcular preço total no cesto
        
        if (teste === 0){
        precoTotal.textContent = "Custo total: 0";
        } else {
            precoTotal.textContent = "Custo total: " + teste;
        }

        aside.append(produtosNoCesto);
    

        // Evento de clique para remover o produto
        botao.addEventListener('click', () => {
            // Remove o produto do cesto pelo índice
            cesto.splice(index, 1);
            

            // Atualiza o localStorage
            localStorage.setItem('cesto', JSON.stringify(cesto));

            // Atualiza a interface
            renderizarCesto();
        });
    });
}

// Renderizar o cesto ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    renderizarCesto();

    // Renderizar a lista de produtos
    produtos.forEach(produto => {
        const listaProdutos = document.createElement('article');
        const titulo = document.createElement("p");
        const preco = document.createElement("p");
        const imagem = document.createElement("img");
        const descricao = document.createElement("p");
        const botao = document.createElement("button");

        titulo.textContent = produto.title;
        preco.textContent = produto.price;
        imagem.src = produto.image;
        preco.textContent = "Custo : " + produto.price + "€";
        descricao.textContent = produto.description;
        botao.textContent = "+ Adicionar ao cesto";

        listaProdutos.append(titulo, imagem, preco, descricao, botao);
        main.append(listaProdutos);

        // Evento de clique para adicionar ao cesto
        botao.addEventListener('click', () => {

        
            // Adiciona o produto ao cesto
            cesto.push(produto);

            // Atualiza o localStorage
            localStorage.setItem('cesto', JSON.stringify(cesto));

            // Atualiza a interface
            renderizarCesto();
        });
    });
});