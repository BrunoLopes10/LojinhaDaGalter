//Carrinho
let cartIcon = document.querySelector('#carrinho');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#fechar-carrinho');

//Abrir carrinho
cartIcon.onclick = () =>{
    cart.classList.add('active');
};
//Fechar carrinho
closeCart.onclick = () =>{
    cart.classList.remove('active');
};

//Carrinho funcionando JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

//Funções
function ready(){
    //Removendo itens do carrinho
    var removeCartButtons = document.getElementsByClassName('remover-carrinho');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    //Mudança na quantidade
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    //Adicionar ao carrinho
    var addCart = document.getElementsByClassName('add-to-cart');
        for (var i = 0; i < addCart.length; i++){
            var button = addCart[i]
            button.addEventListener('click', addCartClicked)
        }
        document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButtonClicked);
}

//Botão de comprar
function buyButtonClicked(){
    alert('Seu pedido está em andamento...');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//Remover intens do carrinho
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//Mudanças na quantidade
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal();
}

//Adicionar ao carrinho
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

    addProductToCart(title, price, productImg);
    updatetotal();

}


//Botão de comprar
function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
        showFeedbackMessage('Esse produto já foi adicionado ao carrinho !');
        return;

    }
}

//Muda o botão para adicionado
var button = event.target; 
    button.textContent = "Adicionado !";
    button.disabled = true;

var cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img">  
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <i class='bx bxs-trash-alt remover-carrinho'></i>`;

                    
                    cartShopBox.innerHTML = cartBoxContent;
                    cartItems.append(cartShopBox);
                    cartShopBox.getElementsByClassName('remover-carrinho')[0]
                    .addEventListener('click', removeCartItem);
                    cartShopBox.getElementsByClassName('cart-quantity')[0]
                    .addEventListener('change', quantityChanged);

                    // Destaque o carrinho
    var cart = document.querySelector('.cart');
    cart.classList.add('active');
    setTimeout(() => {
        cart.classList.remove('active');
    }, 500); // Remova o destaque após 0.5 segundos
                    updatetotal();
}

// Função para exibir mensagens de feedback
function showFeedbackMessage(message) {
    var feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    feedback.innerText = message;
    document.body.appendChild(feedback);

    // Remover a mensagem após 3 segundos
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}
//Atualização Total
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('R$', ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    //Caso o preço tenha centavos
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = 'R$' + total;
    
}
function buyButtonClicked() {
    // Exiba o feedback na tela
    var feedback = document.createElement('div');
    feedback.className = 'purchase-feedback';
    feedback.innerText = 'Seu pedido foi realizado com sucesso!';
    document.body.appendChild(feedback);

    // Remova o feedback após 3 segundos
    setTimeout(() => {
        feedback.remove();
    }, 3000);

    // Limpe o carrinho
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}
const menuIcon = document.getElementById('menu');
const navbar = document.querySelector('.navbar');

// Alterna a classe 'active' para mostrar ou esconder o menu
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});