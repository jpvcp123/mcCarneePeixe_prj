document.addEventListener('DOMContentLoaded', function() {
    atualizarCarrinho();
    configurarBotoesQuantidade();
    configurarEventoFinalizar();
});

function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoContainer = document.querySelector('.carrinho ul');
    carrinhoContainer.innerHTML = '';
    let precoTotal = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('carrinho-item');
        li.innerHTML = `
            <div class="wrapper">
                <div class="imagem">
                    <img src="images/peixe.png" alt="${item.nome}">
                </div>
                <div class="remover-item" data-index="${index}">
                    <button class="btn-remover">X</button>
                </div>
            </div>
            <div class="info">
                <h4>${item.nome}</h4>
                <div class="detalhes">
                    <div class="status">
                        <span>Tempo: <span style="color: black;">20min</span></span>
                        <span>Status: <span style="color: black;">pronto</span></span>
                    </div>
                </div>
                <div class="preco">
                    <p>R$${(item.preco * item.quantidade).toFixed(2)}</p>
                    <div class="contador">
                        <span class="menos" data-index="${index}">-</span>
                        <span class="QTD">${item.quantidade}</span>
                        <span class="mais" data-index="${index}">+</span>
                    </div>
                </div>
            </div>
        `;
        carrinhoContainer.appendChild(li);
        precoTotal += item.preco * item.quantidade;
        console.log(precoTotal)
    });

    const botaoPagar = document.querySelector('.finalizar');
    botaoPagar.textContent = `Finalizar R$${precoTotal.toFixed(2)}`;

    configurarBotoesQuantidade();
    configurarBotaoRemover();
}

function configurarBotoesQuantidade() {
    const botoesMais = document.querySelectorAll('.mais');
    const botoesMenos = document.querySelectorAll('.menos');

    botoesMais.forEach(botao => {
        botao.addEventListener('click', function() {
            const index = this.dataset.index;
            atualizarQuantidadeProduto(index, 1);
        });
    });

    botoesMenos.forEach(botao => {
        botao.addEventListener('click', function() {
            const index = this.dataset.index;
            atualizarQuantidadeProduto(index, -1);
        });
    });
}

function atualizarQuantidadeProduto(index, delta) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho[index]) {
        carrinho[index].quantidade += delta;
        if (carrinho[index].quantidade < 1) {
            carrinho[index].quantidade = 1;
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }
}

function configurarBotaoRemover() {
    const botoesRemover = document.querySelectorAll('.btn-remover');

    botoesRemover.forEach(botao => {
        botao.addEventListener('click', function() {
            const index = this.parentElement.dataset.index;
            removerItemCarrinho(index);
        });
    });
}

function removerItemCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function configurarEventoFinalizar() {
    const botaoFinalizar = document.querySelector('.finalizar');
    botaoFinalizar.addEventListener('click', function(event) {
        event.preventDefault();

        const nomeCliente = document.querySelector('input[name="Nome_do_cliente"]').value;
        const cpf = document.querySelector('input[name="Cpf_do_cliente"]').value;
        const endereco = document.querySelector('input[name="Endereço de entrega"]').value;
        const numero = document.querySelector('input[name="numero"]').value;
        const complemento = document.querySelector('input[name="Complemento"]').value;
        const cep = document.querySelector('input[name="Cep"]').value;
        const formaPagamento = document.querySelector('input[name="opcaoPagamento"]:checked').value;

        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        let mensagem = `Olá, gostaria de realizar um pedido:\n`;
        carrinho.forEach(item => {
            mensagem += `${item.quantidade} x ${item.nome}\n`;
        });

        mensagem += `\nDados:\n${nomeCliente} - ${cpf}\n${endereco}, ${numero}, ${complemento}\n${cep}\n\nPagamento:\n${formaPagamento}`;

        const whatsappUrl = `https://wa.me/21990094473?text=${encodeURIComponent(mensagem)}`;
        window.location.href = whatsappUrl;
    });
}