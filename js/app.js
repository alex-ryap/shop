const app = new Vue({
  el: '#app',

  data: {
    userSearch: '',
    statUrl: '../data/stat.json',
    showCart: false,
    error: false,
  },

  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((err) => {
          error = true;
          console.log(err);
        });
    },

    postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },

    putJson(url, data) {
      return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },

    deleteJson(url, id) {
      return fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
