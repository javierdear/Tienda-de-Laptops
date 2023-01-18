import updateCart from "./cart.js";
import { getFromLocalStorage, setToLocalStorage } from "./utils.js";
import getData from "./getData.js";

let Products = [];

const addItemCart = (prod) => {
  /* Obtengo el array de localstorage */
  let cartItems = getFromLocalStorage("cart");
  /* Si ya existe el array, agrego el producto */
  if (cartItems) {
    let isInCart = false;
    /* Verificar si ya se encuentra en el carrito */
    cartItems.map((product) => {
      if (product.id === prod.id) {
        /* Si ya se encuentra: */
        product.cantidad++;
        isInCart = true;
      }
    });
    /* Si no está en el carrito */
    if (!isInCart) {
      cartItems.push(prod);
    }
  } else {
    cartItems = [prod];
  }
  /* Guardo el nuevo array */
  setToLocalStorage("cart", cartItems);

  //LIBRERIA
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Has añadido un producto al carrito",
    showConfirmButton: false,
    timer: 1000,
  });
};

const cleanCart = () => {
  setToLocalStorage("cart", []);
  updateCart();
};

const loadEvents = () => {
  const buttons = document.querySelectorAll(".button");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const prod = Products.find((product) => product.id == button.id);
      if (prod) {
        addItemCart(prod);
        updateCart();
      }
    });
  }
  document.getElementById("cleanCart").addEventListener("click", cleanCart);
  document.getElementById("checkoutBtn").addEventListener("click", checkout);
};

const loadProducts = (Products) => {
  const container = document.querySelector("#container");
  for (const product of Products) {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <div class="card shadow mb-1 rounded" style="width: 18rem;">
    <h5 class="card-title pt-2 text-center text-dark">${product.name}</h5>
      <img src="${product.image}" class="card-img-top" alt="...">
      <div class="card-body">                
      <p>${product.description}</p>
      <p>${product.screenSize}</p>
      <p>$${product.price}</p>
        <div class="d-grid gap-2">
    <button class="btn btn-primary button" id="${product.id}">Agregar al carrito<i class="fas fa-shopping-cart"></i></button></button>
    </div>
      </div>
    </div>
  </div>
        `;
    container.appendChild(div);
  }
  //carga de eventos = addEventListener
  loadEvents();
};

const mainProducts = () => {
  loadProducts(Products);
  updateCart();
};

getData();

const checkout = () => {
  const closeModalBtn = document.getElementById("closeModalBtn");
  //LIBRERIA
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Gracias por tu compra!",
    showConfirmButton: false,
    timer: 1100,
  });
  cleanCart();
  closeModalBtn.click();
};

document.addEventListener("DOMContentLoaded", mainProducts);

export { loadProducts, Products };
