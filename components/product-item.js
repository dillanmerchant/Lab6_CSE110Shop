// product-item.js

class ProductItem extends HTMLElement {
  constructor(id, image, title, price, included){
    super();
    this.root = this.attachShadow({mode: 'open'});
    this.root.innerHTML = `
    <style>
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    </style>`;

    const li = document.createElement('li');
    li.setAttribute('class', 'product');

    const img = li.appendChild(document.createElement('img'));
    img.setAttribute('src', image);
    img.setAttribute('alt', title);
    img.width = 200;

    const titleText = li.appendChild(document.createElement('p'));
    titleText.setAttribute('class', 'title');
    titleText.textContent = title;

    const priceText = li.appendChild(document.createElement('p'));
    priceText.setAttribute('class', 'price');
    priceText.textContent = "$" + price;

    const button = document.createElement('button')
    li.appendChild(button);
    if(included) {
      button.textContent = "Remove from Cart";
    } else {
      button.textContent = "Add to Cart";
    }

    button.addEventListener("click", () => {
      let cartElement = document.getElementById('cart-count');
      let cart = [];
      if(JSON.parse(localStorage.getItem("cart")) != null) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      if(button.textContent == 'Add to Cart') {
        alert('Added to Cart!');
        cartElement.textContent = parseInt(cartElement.textContent) + 1
        cart.push(id);
        button.textContent = 'Remove from Cart';
      } else if (button.textContent == 'Remove from Cart') {
        cartElement.textContent = parseInt(cartElement.textContent) - 1
        cart.splice(cart.indexOf(id), 1);
        button.textContent = 'Add to Cart';
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('cartCount', JSON.stringify(cartElement.textContent))
    })

    this.root.append(li);
  }
}

customElements.define('product-item', ProductItem);