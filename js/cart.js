// CART
const cartEl = document.querySelector('.cart');
const cartList = document.querySelector('.cart__list');
const cartEmpty = document.querySelector('.cart__empty');
const cards = document.querySelectorAll('.card');
const cartBtn = document.querySelector('.navigation__item_cart');
const cartBadge = document.querySelector('.badge');
const buttonsToCart = document.querySelectorAll('.card__btn');
const cartTotalPrice = document.querySelector('.cart__total-price .text_color');
let buttonsDelete = null;

cartBtn.addEventListener('click', cartBtnHandler);

function cartBtnHandler(event) {
  renderCart();
  cartEl.classList.toggle('cart--open');
}

function generateCardsId() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].setAttribute('data-id', i);
  }
}

generateCardsId();

const cart = {
  products: [],

  totalPrice() {
    if (this.products) {
      return this.products.reduce(
        (sum, currentProduct) => sum + currentProduct.getTotalPrice(),
        0
      );
    }
  },

  getProductsCount() {
    return this.products.reduce(
      (sum, currentProduct) => sum + currentProduct.count,
      0
    );
  },
};

class Product {
  constructor(id, img, name, price, count = 1) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.price = price;
    this.count = count;
  }

  addCount() {
    this.count++;
  }

  getTotalPrice() {
    return this.price * this.count;
  }
}

buttonsToCart.forEach((btn) => {
  btn.addEventListener('click', addToCard);
});

function addBadge() {
  const productsCount = cart.getProductsCount();
  const badge = document.querySelector('.badge');
  if (badge) {
    badge.remove();
  }

  if (productsCount > 0) {
    cartBtn.insertAdjacentHTML(
      'beforeend',
      `<span class="badge">${productsCount}</span>`
    );
  }
}

function addToCard(event) {
  const card = event.currentTarget.closest('.card');
  const productId = card.dataset.id;
  const productImg = card.querySelector('.card__image > img').src;
  const productName = card.querySelector('.card__title').innerHTML;
  const productPrice = card.querySelector('.card__price').innerHTML;

  let exist = cart.products.findIndex((product) => {
    return product.id == productId;
  });
  if (exist != -1) {
    cart.products[exist].addCount();
  } else {
    cart.products.push(
      new Product(
        productId,
        productImg,
        productName,
        getNormalPrice(productPrice)
      )
    );
  }

  addBadge();
  renderCart();
}

function getNormalPrice(price) {
  return parseFloat(price.slice(1));
}

function getFormatPrice(price) {
  return '$' + price;
}

function renderCart() {
  if (cart.products.length) {
    cartList.style.display = 'block';
    cartEmpty.style.display = 'none';
    cartList.innerHTML = '';
    cart.products.forEach((product) => {
      cartList.insertAdjacentHTML('beforeend', renderProduct(product));
    });
  } else {
    cartList.style.display = 'none';
    cartEmpty.style.display = 'block';
  }
  addBadge();
  cartTotalPrice.innerHTML = getFormatPrice(cart.totalPrice());
}

function renderProduct(product) {
  return `<li class="cart__item" data-id="${product.id}">
            <img
              class="product__img"
              src="${product.img}"
              alt="product image"
            />
            <h3 class="product__name">${product.name}</h3>
            <p class="product__counts">${product.count}шт.</p>
            <p class="product__total-price">${getFormatPrice(
              product.getTotalPrice()
            )}</p>
            <button onclick="productDelete(${
              product.id
            })" class="cart__btn-delete">
              <i class="far fa-trash-alt"></i>
            </button>
          </li>`;
}

function productDelete(id) {
  cart.products = cart.products.filter((product) => product.id != id);
  renderCart();
}
