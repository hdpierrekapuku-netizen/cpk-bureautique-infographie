const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");

let products = JSON.parse(localStorage.getItem("cpkProducts")) || [];

function saveProducts() {
  localStorage.setItem("cpkProducts", JSON.stringify(products));
}

function displayProducts() {
  if (!productsList) return;

  productsList.innerHTML = "";

  products.forEach((product, index) => {
    const box = document.createElement("div");
    box.className = "admin-product";

    box.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button onclick="deleteProduct(${index})">Supprimer</button>
    `;

    productsList.appendChild(box);
  });
}

if (productForm) {
  productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const imageInput = document.getElementById("productImage");

    if (!imageInput.files[0]) {
      alert("Choisissez une image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
      const product = {
        name: name,
        price: price,
        image: e.target.result
      };

      products.push(product);
      saveProducts();
      displayProducts();

      productForm.reset();

      alert("Produit ajouté avec succès !");
    };

    reader.readAsDataURL(imageInput.files[0]);
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveProducts();
  displayProducts();
}

displayProducts();
