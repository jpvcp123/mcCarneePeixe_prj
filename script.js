function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const tamanhoCarrinho = carrinho.length;

    const cartAlert = document.querySelector('.cart-alert');

    if (cartAlert) {
        cartAlert.textContent = tamanhoCarrinho;
    }
}
atualizarCarrinho();

function adicionarAoCarrinho(sku, nomeProduto, preco) {
    // Verifica se já existe um carrinho no localStorage
    let carrinho = localStorage.getItem('carrinho');
    if (!carrinho) {
        carrinho = [];
    } else {
        carrinho = JSON.parse(carrinho);
    }
    
    // Adiciona o produto ao carrinho
    carrinho.push({sku: sku, nome: nomeProduto, preco: preco, quantidade: 1});
    
    // Armazena o carrinho no localStorage novamente
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    atualizarCarrinho();
}