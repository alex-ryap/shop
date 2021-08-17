let add = (cart, req) => {
  cart.contents.push(req.body);
  return JSON.stringify(cart, null, 4);
};

let change = (cart, req) => {
  let find = cart.contents.find((el) => el.id === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};

let remove = (cart, req) => {
  let findItem = cart.contents.find((el) => el.id == req.params.id);
  if (findItem.quantity > 1) {
    findItem.quantity--;
  } else {
    cart.contents.splice(cart.contents.indexOf(findItem), 1);
  }

  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  remove,
};
