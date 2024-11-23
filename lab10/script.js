const main = document.querySelector('main');
const aside = document.querySelector('section#cesto');
const filtroUm = document.querySelector('select#cat');
let opcaoCategorias 
let precoTotal = document.querySelector('p#preco');
let teste = 0;
let produtosAPI = [];
let categorias = [];
let desconto = [];

//desconto
fetch('https://deisishop.pythonanywhere.com/buy')
    .then(Response => Response.json())
    .then(data => {
        desconto = data;
        console.log(desconto);
})
.catch (error => console.error('Erro:', error));

//categorias
fetch('https://deisishop.pythonanywhere.com/categories')
    .then(Response => Response.json())
    .then(data => {
        categorias = data;

        categorias.forEach((categoria) => {
            const opcoes = document.createElement('option');
            opcoes.textContent = categoria;
            opcoes.value = categoria
            filtroUm.append(opcoes);
        });
    })
.catch (error => console.error('Erro:', error));

//produtos
fetch('https://deisishop.pythonanywhere.com/products')
    .then(Response => Response.json())
    .then(data => {
        produtosAPI = data;
        console.log(produtosAPI);
    })
.catch (error => console.error('Erro:', error));
//Section filtro de tipos de produtos

filtroUm.addEventListener('change', () => {
    const categoriaSelecionada = filtroUm.value;
    const produtosFiltrados = produtosAPI.filter(produto => produto.category === categoriaSelecionada);
    renderizarProdutos(produtosFiltrados);
});


/* Verifica se já existe */
if (!localStorage.getItem('cesto')) {
    localStorage.setItem('cesto', "[]");
}

let cesto = JSON.parse(localStorage.getItem('cesto'));

// Função para renderizar o cesto
function renderizarCesto() {
    // Limpa o conteúdo atual do cesto
    aside.innerHTML = "";
    //Limpar o teste
    teste = 0;
    if (teste === 0) {
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
        imagem.src = produto;
        botao.textContent = "Remover do cesto";

        teste += produto.price;
        produtosNoCesto.append(titulo, imagem, preco, botao);

        //calcular preço total no cesto

        if (teste === 0) {
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

//Usei o chatGPT para me ajudar atualizar os produtos na api para o main
function renderizarProdutos(produtos = produtosAPI) {


    //produtos passam a outras variavéis para ser mais fácil mudar valores
    produtosAPI.forEach(produto => {
        const listaProdutos = document.createElement('article');
        const titulo = document.createElement("p");
        const preco = document.createElement("p");
        const imagem = document.createElement("img");
        const descricao = document.createElement("p");
        const botao = document.createElement("button");

        titulo.textContent = produto.title;
        preco.textContent = "Custo : " + produto.price + "€";
        imagem.src = produto.image;
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
}

// Renderizar o cesto ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    renderizarCesto();
});