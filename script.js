const products = [
  {
    id: 1,
    name: "Кружевной бюстгальтер",
    price: 8990,
    image: "https://picsum.photos/seed/bra/300/300"
  },
  {
    id: 2,
    name: "Набор из 3 трусиков",
    price: 7490,
    image: "https://picsum.photos/seed/panties/300/300"
  },
  {
    id: 3,
    name: "Боди с вырезом",
    price: 11990,
    image: "https://picsum.photos/seed/bodysuit/300/300"
  }
];

const productContainer = document.getElementById("products");
const cartList = document.getElementById("cart");
const totalElement = document.createElement("p");
const orderButton = document.createElement("button");

let cart = [];
let total = 0;

products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}" style="width:100%; height:auto; margin-bottom:10px;">
    <h3>${product.name}</h3>
    <p>${product.price} ₸</p>
    <button onclick="addToCart('${product.name}', ${product.price})">Добавить в корзину</button>
  `;
  productContainer.appendChild(div);
});

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  const item = document.createElement("li");
  item.textContent = `${name} — ${price} ₸`;
  cartList.appendChild(item);

  updateTotalAndButton();
}

function updateTotalAndButton() {
  totalElement.textContent = `Итого: ${total} ₸`;
  cartList.after(totalElement);

  orderButton.textContent = "Оформить заказ в WhatsApp";
  orderButton.style.background = "#25D366";
  orderButton.style.color = "white";
  orderButton.style.padding = "10px";
  orderButton.style.marginTop = "10px";
  orderButton.style.border = "none";
  orderButton.style.cursor = "pointer";

  orderButton.onclick = () => {
    const message = cart.map(item => `• ${item.name} — ${item.price} ₸`).join("%0A");
    const fullMessage = `Здравствуйте! Я хочу заказать:%0A${message}%0AИтого: ${total} ₸`;
    const phone = "77472734006"; 
    const url = `https://wa.me/${phone}?text=${fullMessage}`;
    window.open(url, "_blank");
  };

  totalElement.after(orderButton);
}
