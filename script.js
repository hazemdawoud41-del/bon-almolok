// ==========================================
// BEN EL MOLOUK - CLEAN MAIN SCRIPT
// ==========================================

(function () {
    "use strict";

    // ---------- Loader ----------
    window.addEventListener("load", function () {
        const loader = document.getElementById("loader");
        if (loader) {
            setTimeout(() => loader.classList.add("hide"), 900);
        }
    });

    // ---------- Scroll animations ----------
    const hiddenElements = document.querySelectorAll(
        ".features, .feature-card, .journey, .journey-item, .products, .card, .gallery, .gallery-box, .testimonials, .testimonial-card, .about, .location, .contact"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("show");
            });
        }, { threshold: 0.12 });

        hiddenElements.forEach((element) => {
            element.classList.add("hidden");
            observer.observe(element);
        });
    }

    // ---------- Counters ----------
    const counters = document.querySelectorAll(".counter");
    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const counter = entry.target;
                const target = Number(counter.dataset.target || 0);
                let value = 0;
                const step = Math.max(1, target / 60);
                const tick = () => {
                    value += step;
                    if (value < target) {
                        counter.textContent = Math.ceil(value) + "+";
                        requestAnimationFrame(tick);
                    } else {
                        counter.textContent = target + "+";
                    }
                };
                tick();
                counterObserver.unobserve(counter);
            });
        }, { threshold: 0.5 });
        counters.forEach((counter) => counterObserver.observe(counter));
    }

    // ---------- Back to top ----------
    const topBtn = document.getElementById("topBtn");
    window.addEventListener("scroll", () => {
        if (!topBtn) return;
        topBtn.style.display = window.scrollY > 500 ? "block" : "none";
    });
    if (topBtn) {
        topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    // ---------- Gallery lightbox ----------
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeLightbox = document.getElementById("closeLightbox");
    document.querySelectorAll(".gallery-box img").forEach((img) => {
        img.addEventListener("click", () => {
            if (!lightbox || !lightboxImg) return;
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || "بن الملوك";
            lightbox.style.display = "flex";
        });
    });
    if (closeLightbox) closeLightbox.addEventListener("click", () => lightbox && (lightbox.style.display = "none"));
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) lightbox.style.display = "none";
        });
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox) lightbox.style.display = "none";
    });

    // ---------- Header shadow ----------
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (header) header.classList.toggle("scrolled", window.scrollY > 20);
    });

    // ==========================================
    // CART SYSTEM
    // ==========================================

    let cart = [];
    const PHONE = "201020808359";

    const cartButton = document.getElementById("cartButton");
    const cartBox = document.getElementById("cartBox");
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    function weightLabel(value) {
        const weight = Number(value);
        if (weight === 1) return "1 كيلو";
        if (weight === 0.5) return "500 جم";
        if (weight === 0.25) return "250 جم";
        return "125 جم";
    }

    function updateCartButton() {
        if (!cartCount) return;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function renderCart() {
        if (!cartItems || !cartTotal) return;

        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">🛒 السلة فارغة</div>';
            cartTotal.textContent = "0 ج";
            return;
        }

        let total = 0;
        cartItems.innerHTML = cart.map((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h3>${escapeHtml(item.name)}</h3>
                        <p>الوزن: ${escapeHtml(item.weight)}</p>
                        <strong>${item.price} ج</strong>
                    </div>
                    <div class="quantity-box">
                        <button type="button" data-action="plus" data-index="${index}">+</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-action="minus" data-index="${index}">−</button>
                    </div>
                    <button type="button" class="remove-item" data-action="remove" data-index="${index}" aria-label="حذف المنتج">🗑️</button>
                </div>`;
        }).join("");

        cartTotal.textContent = total + " ج";
    }

    function escapeHtml(text) {
        return String(text).replace(/[&<>'"]/g, (char) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
        }[char]));
    }

    function openCart() {
        if (!cartBox) return;
        renderCart();
        cartBox.classList.add("open");
        cartBox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeCart() {
        if (!cartBox) return;
        cartBox.classList.remove("open");
        cartBox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    window.openCart = openCart;
    window.closeCart = closeCart;

    if (cartButton) cartButton.addEventListener("click", openCart);

    // Cart quantity controls using event delegation.
    if (cartItems) {
        cartItems.addEventListener("click", (event) => {
            const button = event.target.closest("button[data-action]");
            if (!button) return;
            const index = Number(button.dataset.index);
            const action = button.dataset.action;
            if (!cart[index]) return;

            if (action === "plus") cart[index].quantity += 1;
            if (action === "minus") cart[index].quantity -= 1;
            if (action === "remove" || cart[index].quantity <= 0) cart.splice(index, 1);

            updateCartButton();
            renderCart();
        });
    }

    // Add-to-cart buttons.
    document.querySelectorAll(".add-cart-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const product = button.closest(".product");
            if (!product) return;

            const name = button.dataset.name;
            const kiloPrice = Number(button.dataset.price);
            const select = product.querySelector(".weight-select");
            const weight = Number(select ? select.value : 1);
            const weightText = weightLabel(weight);
            const price = Math.round(kiloPrice * weight);

            const existing = cart.find((item) => item.name === name && item.weight === weightText);
            if (existing) existing.quantity += 1;
            else cart.push({ name, weight: weightText, price, quantity: 1 });

            updateCartButton();
            button.classList.add("added");
            const oldText = button.textContent;
            button.textContent = "✓ تمت الإضافة للسلة";
            setTimeout(() => {
                button.classList.remove("added");
                button.textContent = oldText;
            }, 900);
        });
    });

    // Update displayed kilo-based price when weight changes.
    document.querySelectorAll(".weight-select").forEach((select) => {
        select.addEventListener("change", () => {
            const product = select.closest(".product");
            const priceBox = product && product.querySelector(".price");
            const button = product && product.querySelector(".add-cart-btn");
            if (!priceBox || !button) return;
            const price = Math.round(Number(button.dataset.price) * Number(select.value));
            priceBox.textContent = price + " ج";
        });
    });

    function checkoutWhatsApp() {
        if (cart.length === 0) {
            alert("السلة فارغة 🛒");
            return;
        }

        let total = 0;
        const lines = ["السلام عليكم 👑☕", "أريد عمل طلب:", ""];
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            lines.push(`${index + 1}- ${item.name} - ${item.weight} × ${item.quantity} = ${itemTotal} ج`);
        });
        lines.push("", "--------------------", `الإجمالي: ${total} ج`);

        const url = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(lines.join("\n"));
        window.open(url, "_blank", "noopener,noreferrer");
    }

    window.checkoutWhatsApp = checkoutWhatsApp;
    updateCartButton();
})();
