const main = document.querySelector('main');
const aside = document.querySelector('section#cesto');
const filtroUm = document.querySelector('select#cat');
const listaProdutos = document.createElement('article');
const ordem = document.querySelector('select#precos');
const selectProdutos = document.querySelector('section#produtos');
const pesquisa = document.querySelector('input[type="text"]');
const todosProdutos = document.querySelector('button#addTodosProdutos')
const info = document.querySelector('button#menosInfo')
let quantidadeProdutos = 0;
let precoTotal = document.querySelector('p#preco');
let opcaoCategorias
let teste = 0;
let produtosAPI = [];
let categorias = [];
let desconto = [];
let produtosCarregadosNaPagina = [];
let testeDesconto = false;


const cupao = document.querySelector('input#cupao');
const checkBox = document.querySelector('input#alunoDeisi');
const totalCost = localStorage.getItem('totalCost');
const reference = localStorage.getItem('reference');


/* Verifica se já existe */
if (!localStorage.getItem('cesto')) {
    localStorage.setItem('cesto', "[]");
}

let cesto = JSON.parse(localStorage.getItem('cesto'));


checkBox.addEventListener('change',() => {
    testeDesconto = true;
    });


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

        data = {
            products: [quantidadeProdutos],
            student: testeDesconto,
            coupon: cupao.innerHTML
          }
        
        fetch('https://deisishop.pythonanywhere.com/buy/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                console.error("Erro ao calcular custo:", result.error);
            } else {
                // Armazenar dados retornados
                localStorage.setItem('totalCost', result.totalCost);
                localStorage.setItem('reference', result.reference);
    
            }
        })
        .catch(error => {
            console.error("Erro ao conectar à API:", error);
        });

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
        quantidadeProdutos++;

        const checkBox = document.querySelector("input#alunoDeisi");


        //calcular preço total no cesto

        if (teste === 0) {
            precoTotal.textContent = "Custo total: 0";
        } else {
            precoTotal.textContent = "Custo total: " + teste;
            
        }

        aside.append(produtosNoCesto);


        // Evento de clique para remover o produto
        botao.addEventListener('click', () => {

            quantidadeProdutos--;
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
function renderizarProdutos(produtos) {
produtosCarregadosNaPagina = [];
selectProdutos.innerHTML="";

    //produtos passam a outras variavéis para ser mais fácil mudar valores
    produtos.forEach(produto => {
        const cadaPorduto = document.createElement('article');
        const titulo = document.createElement("p");
        const preco = document.createElement("p");
        const imagem = document.createElement("img");
        const descricao = document.createElement("p");
        const botao = document.createElement("button");
        const rating = document.createElement("p");
        
        
        produtosCarregadosNaPagina.push(produto);
        titulo.textContent = produto.title;
        preco.textContent = "Custo : " + produto.price + "€";
         imagem.src = produto.image;
         rating.textContent = produto.rating.rate;
        descricao.textContent = produto.description;
        botao.textContent = "+ Adicionar ao cesto";
        
        listaProdutos.append(titulo, imagem, preco, rating, descricao, botao);
        cadaPorduto.append(titulo, imagem, preco, rating, descricao, botao);
        selectProdutos.append(cadaPorduto);


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


//Section filtro de tipos de produtos
filtroUm.addEventListener('change', () => {
    if (filtroUm.value === 'Todos') {
        listaProdutos.innerHTML = "";
        renderizarProdutos(produtosAPI);
    } else {
        const produtosFiltrados = produtosAPI.filter(produto => produto.category === filtroUm.value);
        listaProdutos.innerHTML = ""
        renderizarProdutos(produtosFiltrados);
    }
});





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

    .catch(error => console.error('Erro:', error));


//produtos
fetch('https://deisishop.pythonanywhere.com/products')
    .then(Response => Response.json())
    .then(data => {
        produtosAPI = data;
        console.log(produtosAPI);
        renderizarProdutos(produtosAPI);
    })
    .catch(error => console.error('Erro:', error));


 //Fun para colocar em ordem crescente ou decrescente
 //Adaptado para a defesa 2 :D

ordem.addEventListener('change', () => {
    const artigosJaOrdenados = [...produtosCarregadosNaPagina].sort((a, b) => {
        if (ordem.value === 'Ordem crescente') {
            return a.rating.rate - b.rating.rate;
        }
        else if (ordem.value === 'Ordem decresente') {
            return b.rating.rate - a.rating.rate
        }
        return 0;
    });
    listaProdutos.innerHTML = "";
    return renderizarProdutos(artigosJaOrdenados);
});

//pesquisa de produto

pesquisa.addEventListener('keydown',() =>  {
const inputPesquisa = pesquisa.value.toLowerCase();
const produtosPesquisados = produtosAPI.filter(produto =>
    produto.title.toLowerCase().includes(inputPesquisa)
);
const produtosPesquisadosDescricao = produtosAPI.filter(produto =>
    produto.description.toLowerCase().includes(inputPesquisa)
);
    listaProdutos.innerHTML = "";
    renderizarProdutos(produtosPesquisados);
    renderizarProdutos(produtosPesquisadosDescricao);
});


if (totalCost && reference) {
    console.log(`Custo total: ${totalCost}, Referência: ${reference}`);
}

todosProdutos.addEventListener('click',() =>{
    cesto = produtosAPI;
    renderizarCesto
    aside.append()
});

info.addEventListener('click',() =>{
 
   const teste = document.querySelector("#produtos > article:nth-child(1) > p:nth-child(1)")
    teste.innerHTML = ""
       
});