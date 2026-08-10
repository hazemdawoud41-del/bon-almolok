// ==========================================
// BEN EL MOLOUK - CLEAN MAIN SCRIPT
// ==========================================

(function () {
    "use strict";

    // ==========================================
    // LOADER
    // ==========================================

    window.addEventListener("load", function () {
        const loader = document.getElementById("loader");

        if (loader) {
            setTimeout(() => {
                loader.classList.add("hide");
            }, 900);
        }
    });


    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================

    const hiddenElements = document.querySelectorAll(
        ".features, .feature-card, .journey, .journey-item, .menu-card, .card, .gallery, .gallery-box, .testimonials, .testimonial-card, .about, .location, .contact"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        hiddenElements.forEach((element) => {

            element.classList.add("hidden");
            observer.observe(element);

        });

    } else {

        hiddenElements.forEach((element) => {
            element.classList.add("show");
        });

    }


    // ==========================================
    // COUNTERS
    // ==========================================

    const counters = document.querySelectorAll(".counter");

    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    const counter = entry.target;
                    const target = Number(counter.dataset.target || 0);

                    let value = 0;

                    const step = Math.max(1, target / 60);

                    const tick = () => {

                        value += step;

                        if (value < target) {

                            counter.textContent =
                                Math.ceil(value) + "+";

                            requestAnimationFrame(tick);

                        } else {

                            counter.textContent =
                                target + "+";

                        }

                    };

                    tick();

                    counterObserver.unobserve(counter);

                });

            },
            {
                threshold: 0.5
            }
        );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });

    }


    // ==========================================
    // BACK TO TOP
    // ==========================================

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if (!topBtn) return;

        topBtn.style.display =
            window.scrollY > 500 ? "block" : "none";

    });

    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // ==========================================
    // GALLERY LIGHTBOX
    // ==========================================

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

    if (closeLightbox) {

        closeLightbox.addEventListener("click", () => {

            if (lightbox) {
                lightbox.style.display = "none";
            }

        });

    }

    if (lightbox) {

        lightbox.addEventListener("click", (event) => {

            if (event.target === lightbox) {
                lightbox.style.display = "none";
            }

        });

    }

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            lightbox
        ) {
            lightbox.style.display = "none";
        }

    });


    // ==========================================
    // HEADER SHADOW
    // ==========================================

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (header) {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );
        }

    });


    // ==========================================
    // CART SYSTEM
    // ==========================================

    let cart = [];

    const PHONE = "201020808359";

    const cartButton =
        document.getElementById("cartButton");

    const cartBox =
        document.getElementById("cartBox");

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    // ==========================================
    // WEIGHT LABEL
    // ==========================================

    function weightLabel(value) {

        const weight = Number(value);

        if (weight === 1) {
            return "1 كيلو";
        }

        if (weight === 0.5) {
            return "500 جم";
        }

        if (weight === 0.25) {
            return "250 جم";
        }

        return "125 جم";

    }


    // ==========================================
    // UPDATE CART BUTTON
    // ==========================================

    function updateCartButton() {

        if (!cartCount) return;

        const totalQuantity = cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        cartCount.textContent = totalQuantity;

    }


    // ==========================================
    // ESCAPE HTML
    // ==========================================

    function escapeHtml(text) {

        return String(text).replace(
            /[&<>'"]/g,
            (char) => {

                const characters = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    "'": "&#39;",
                    '"': "&quot;"
                };

                return characters[char];

            }
        );

    }


    // ==========================================
    // RENDER CART
    // ==========================================

    function renderCart() {

        if (!cartItems || !cartTotal) return;

        if (cart.length === 0) {

            cartItems.innerHTML =
                '<div class="empty-cart">🛒 السلة فارغة</div>';

            cartTotal.textContent = "0 ج";

            return;
        }

        let total = 0;

        cartItems.innerHTML = cart
            .map((item, index) => {

                const itemTotal =
                    item.price * item.quantity;

                total += itemTotal;

                return `
                    <div class="cart-item">

                        <div class="cart-item-info">

                            <h3>
                                ${escapeHtml(item.name)}
                            </h3>

                            <p>
                                الوزن:
                                ${escapeHtml(item.weight)}
                            </p>

                            <strong>
                                ${item.price} ج
                            </strong>

                        </div>

                        <div class="quantity-box">

                            <button
                                type="button"
                                data-action="plus"
                                data-index="${index}">
                                +
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                type="button"
                                data-action="minus"
                                data-index="${index}">
                                −
                            </button>

                        </div>

                        <button
                            type="button"
                            class="remove-item"
                            data-action="remove"
                            data-index="${index}"
                            aria-label="حذف المنتج">
                            🗑️
                        </button>

                    </div>
                `;

            })
            .join("");

        cartTotal.textContent =
            total + " ج";

    }


    // ==========================================
    // OPEN CART
    // ==========================================

    function openCart() {

        if (!cartBox) return;

        renderCart();

        cartBox.classList.add("open");

        cartBox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    // ==========================================
    // CLOSE CART
    // ==========================================

    function closeCart() {

        if (!cartBox) return;

        cartBox.classList.remove("open");

        cartBox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    window.openCart = openCart;
    window.closeCart = closeCart;


    // ==========================================
    // CART BUTTON
    // ==========================================

    if (cartButton) {

        cartButton.addEventListener(
            "click",
            openCart
        );

    }


    // ==========================================
    // CART QUANTITY CONTROLS
    // ==========================================

    if (cartItems) {

        cartItems.addEventListener(
            "click",
            (event) => {

                const button =
                    event.target.closest(
                        "button[data-action]"
                    );

                if (!button) return;

                const index =
                    Number(button.dataset.index);

                const action =
                    button.dataset.action;

                if (!cart[index]) return;


                if (action === "plus") {

                    cart[index].quantity += 1;

                }


                if (action === "minus") {

                    cart[index].quantity -= 1;

                }


                if (
                    action === "remove" ||
                    cart[index].quantity <= 0
                ) {

                    cart.splice(index, 1);

                }


                updateCartButton();
                renderCart();

            }
        );

    }


    // ==========================================
    // ADD TO CART
    // ==========================================

    document
        .querySelectorAll(".add-cart-btn")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const product =
                        button.closest(".product");

                    if (!product) return;


                    const name =
                        button.dataset.name || "منتج";

                    const kiloPrice =
                        Number(button.dataset.price || 0);


                    const select =
                        product.querySelector(
                            ".weight-select"
                        );


                    const weight =
                        Number(
                            select
                                ? select.value
                                : 1
                        );


                    const weightText =
                        weightLabel(weight);


                    const price =
                        Math.round(
                            kiloPrice * weight
                        );


                    const existing =
                        cart.find(
                            (item) =>
                                item.name === name &&
                                item.weight === weightText
                        );


                    if (existing) {

                        existing.quantity += 1;

                    } else {

                        cart.push({
                            name: name,
                            weight: weightText,
                            price: price,
                            quantity: 1
                        });

                    }


                    updateCartButton();


                    button.classList.add("added");


                    const oldText =
                        button.textContent;


                    button.textContent =
                        "✓ تمت الإضافة للسلة";


                    setTimeout(() => {

                        button.classList.remove("added");

                        button.textContent =
                            oldText;

                    }, 900);

                }
            );

        });


    // ==========================================
    // UPDATE PRICE WHEN WEIGHT CHANGES
    // ==========================================

    document
        .querySelectorAll(".weight-select")
        .forEach((select) => {

            select.addEventListener(
                "change",
                () => {

                    const product =
                        select.closest(".product");

                    if (!product) return;


                    const priceBox =
                        product.querySelector(".price");

                    const button =
                        product.querySelector(".add-cart-btn");


                    if (!priceBox || !button) {
                        return;
                    }


                    const price =
                        Math.round(
                            Number(
                                button.dataset.price
                            ) *
                            Number(select.value)
                        );


                    priceBox.textContent =
                        price + " ج";

                }
            );

        });


    // ==========================================
    // WHATSAPP CHECKOUT
    // ==========================================

    function checkoutWhatsApp() {

        if (cart.length === 0) {

            alert("السلة فارغة 🛒");

            return;

        }


        let total = 0;


        const lines = [
            "السلام عليكم 👑☕",
            "أريد عمل طلب:",
            ""
        ];


        cart.forEach((item, index) => {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;


            lines.push(
                `${index + 1}- ${item.name} - ${item.weight} × ${item.quantity} = ${itemTotal} ج`
            );

        });


        lines.push(
            "",
            "--------------------",
            `الإجمالي: ${total} ج`
        );


        const url =
            "https://wa.me/" +
            PHONE +
            "?text=" +
            encodeURIComponent(
                lines.join("\n")
            );


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    window.checkoutWhatsApp =
        checkoutWhatsApp;


    // ==========================================
    // INITIAL CART
    // ==========================================

    updateCartButton();

})();