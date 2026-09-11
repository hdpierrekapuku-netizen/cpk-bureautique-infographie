// CPK SHOP — Gestion des produits

const productsContainer = document.getElementById("products");

let products = JSON.parse(localStorage.getItem("cpkProducts")) || [];

// Afficher les produits
function displayProducts() {
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML =
      '<p class="empty-message">Aucun produit disponible pour le moment.</p>';
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description || ""}</p>
        <strong>${product.price || ""}</strong>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

displayProducts();
