import { loadProducts, Products } from "./main.js";

const dataUrl = "data.json";

const getData = async () =>
{
  try {
    const response = await fetch(dataUrl);
    const data = await response.json();
    loadProducts(data)
    Products.push(...data);
  }
  catch(e){
    console.log(e)
  }
}

export default getData;