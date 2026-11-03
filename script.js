let cart = [];

const cartBadge = document.getElementById("cart-badge");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

function addToCart(id, title, price, img) {
    const existing = cart.find((item) => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, title, price, img, quantity: 1 });
    }
    updateCart();
    const bsOffcanvas = new bootstrap.Offcanvas(
        document.getElementById("cartOffcanvas"),
    );
    bsOffcanvas.show();
}

function updateQuantity(id, delta) {
    const item = cart.find((i) => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter((i) => i.id !== id);
        }
    }
    updateCart();
}

function removeItem(id) {
    cart = cart.filter((i) => i.id !== id);
    updateCart();
}

function updateCart() {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartBadge.textContent = totalCount;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML =
            '<p class="text-center text-body-secondary my-5 font-light">Tu carrito está vacío.<br>¡Agrega tu equipamiento oficial!</p>';
        cartSubtotal.textContent = "$0.00 MXN";
        cartTotal.textContent = "$0.00 MXN";
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
        const sub = item.price * item.quantity;
        total += sub;

        const itemDiv = document.createElement("div");
        itemDiv.className =
            "d-flex align-items-center justify-content-between gap-2 p-2 bg-body-tertiary rounded-3 border border-secondary mb-2";
        itemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.title}" class="rounded" width="50" height="50" style="object-fit:cover;">
                    <div class="flex-grow-1">
                        <h6 class="font-oswald text-uppercase text-white mb-0 small">${item.title}</h6>
                        <span class="text-warning small">$${item.price} MXN</span>
                        <div class="d-flex align-items-center gap-1 mt-1">
                            <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="small px-1">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="btn btn-sm text-danger" onclick="removeItem(${item.id})"><i class="bi bi-trash"></i></button>
                `;
        cartItemsContainer.appendChild(itemDiv);
    });

    const formatted = `$${total.toLocaleString("es-MX")} MXN`;
    cartSubtotal.textContent = formatted;
    cartTotal.textContent = formatted;
}

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    cart = [];
    updateCart();
    const offcanvasEl = document.getElementById("cartOffcanvas");
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) bsOffcanvas.hide();

    const modalEl = document.getElementById("checkoutModal");
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
});

document
    .getElementById("contact-form")
    .addEventListener("submit", function(e) {
        e.preventDefault();
        alert("¡Gracias! Tu solicitud para la clase gratis ha sido recibida.");
        this.reset();
    });