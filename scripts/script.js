// Script.js

window.addEventListener('DOMContentLoaded', async () => {

  //NOT GIVING API DATA ON FIRST RUN
  /*if (localStorage.getItem('storeAPIData') == null) {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => localStorage.setItem('storeAPIData', JSON.stringify(data)))
  }*/

  let storeData;
  if (localStorage.getItem('storeAPIData') == null) {
    const res = await fetch('https://fakestoreapi.com/products');
    storeData = await res.json();
    localStorage.setItem('storeAPIData', JSON.stringify(storeData));
  } else {
    storeData = JSON.parse(localStorage.getItem("storeAPIData"))
  }

  let productList = document.getElementById('product-list');

  cart_count = document.getElementById('cart-count');
  if(JSON.parse(localStorage.getItem('cartCount')) == null) {
    localStorage.setItem('cartCount', JSON.stringify(cart_count.textContent));
    cartCount = JSON.parse(localStorage.getItem('cartCount'))
  } else {
    cartCount = JSON.parse(localStorage.getItem('cartCount'));
  }
  cart_count.textContent = cartCount;

  if(JSON.parse(localStorage.getItem('cart')) == null) {
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  cart = JSON.parse(localStorage.getItem('cart'));

  storeData.forEach(function (product) {
    let el = document.createElement('product-item');
    el = new ProductItem(product.id, product.image, product.title, product.price, cart.includes(product.id));
    productList.appendChild(el);
  });

});

