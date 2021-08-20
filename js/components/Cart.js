Vue.component('cart', {
  data() {
    return {
      cartUrl: 'http://127.0.0.1:3000/api/cart',
      cartItems: [],
    };
  },

  computed: {
    count: {
      get() {
        return this.cartItems.length;
      },
    },
    grandTotalPrice: {
      get() {
        return this.cartItems.reduce(
          (sum, item) => (sum += item.price * item.quantity),
          0
        );
      },
    },
  },

  mounted() {
    this.$parent.getJson(this.cartUrl).then((data) => {
      for (let item of data.contents) {
        item.img = `./img/product${item.id}.png`;
        this.$data.cartItems.push(item);
      }
    });
  },

  methods: {
    addProduct(item) {
      let findItem = this.cartItems.find((el) => el.id === item.id);
      if (findItem) {
        this.$parent
          .putJson(`${this.cartUrl}/${findItem.id}`, { quantity: 1 })
          .then((data) => {
            if (data.result === 1) {
              findItem.quantity++;
            }
          });
      } else {
        item.img = null;
        const prod = Object.assign({ quantity: 1 }, item);
        this.$parent.postJson(`${this.cartUrl}`, prod).then((data) => {
          if (data.result === 1) {
            this.cartItems.push(prod);
          }
        });
      }
    },

    remove(item) {
      this.$parent.deleteJson(this.cartUrl, item.id).then((data) => {
        if (data.result === 1) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
          }
        }
      });
    },
  },

  template: `
  <div class="cart" v-show="$parent.showCart">
    <h3 class="cart__title">SHOPPING CART</h3>
    <ul v-if="cartItems.length" class="cart__list">
      <cart-item v-for="item of cartItems"
        :key="item.id"
        :cart-item="item"
        @remove="remove"
      >
      </cart-item>
    </ul>
    <p v-else class="cart__empty">Cart is empty</p>
    <div class="cart__bottom">
      <p class="cart__total-price">
        TOTAL:<span class="text_color">$ {{ grandTotalPrice }}</span>
      </p>
      <a class="cart__btn-open" href="cart.html">GO TO CART</a>
    </div>
  </div>
  `,
});

Vue.component('cart-item', {
  props: ['cartItem'],
  computed: {
    totalPrice: {
      get() {
        return this.cartItem.price * this.cartItem.quantity;
      },
    },
  },
  template: `
  <li class="cart__item">
  <img
    class="product__img"
    :src="cartItem.img"
    alt="product image"
  />
  <h3 class="product__name">{{ cartItem.name }}</h3>
  <p class="product__counts">{{ cartItem.quantity }} шт.</p>
  <p class="product__total-price">$ {{ totalPrice }}</p>
  <button class="cart__btn-delete" @click="$emit('remove', cartItem)">
    <i class="far fa-trash-alt"></i>
  </button>
</li>
  `,
});
