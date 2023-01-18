import { getFromLocalStorage } from "./utils.js";

const updateCart = () => {
  const cart = getFromLocalStorage("cart");
  const shoppingCart = document.querySelector("#shoppingCart");
  const emptyMsg = document.querySelector("#emptyMsg");
  const totalContainer = document.querySelector("#totalCarrito");
  let total = 0;

  shoppingCart.innerHTML = "";
  if (cart) {
    for (const product of cart) {
      shoppingCart.innerHTML += `
        <div class="cart-item">
            <h4>Producto: ${product.name}</h4>
            <h3>Precio: $${product.price}</h3>
            <h4>Cantidad: ${product.cantidad}</h4>
        </div>
        `;
      total += product.price * product.cantidad;
    }
    if (total) {
      totalContainer.innerHTML = `Total: $${total}`;
      emptyMsg.classList.remove("show");
      /* Si el total es cero */
    } else {
      totalContainer.innerHTML = "";
      emptyMsg.classList.add("show");
    }
  }
};

export default updateCart;
