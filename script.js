// =========================
// BON EL MOLOUK - SCRIPT.JS
// =========================


// =========================
// LOADER
// =========================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 1200);

    }

});


// =========================
// SCROLL ANIMATION
// =========================

const hiddenElements = document.querySelectorAll(
    ".features, .feature-card, .journey, .journey-item, .products, .card, .gallery, .gallery-box, .testimonials, .testimonial-card, .about, .location, .contact"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });


    hiddenElements.forEach(el => {

        el.classList.add("hidden");

        observer.observe(el);

    });

}


// =========================
// COUNTER
// =========================

const counters = document.querySelectorAll(".counter");

if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let count = 0;

            const update = () => {

                const speed = target / 80;

                if (count < target) {

                    count += speed;

                    counter.innerText =
                        Math.ceil(count) + "+";

                    setTimeout(update, 25);

                } else {

                    counter.innerText =
                        target + "+";

                }

            };

            update();

            counterObserver.unobserve(counter);

        });

    });


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


// =========================
// BACK TO TOP
// =========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 500) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});


if (topBtn) {

    topBtn.onclick = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

}


// =========================
// GALLERY LIGHTBOX
// =========================

const galleryImages =
    document.querySelectorAll(".gallery-box img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImg =
    document.getElementById("lightboxImg");

const closeLightbox =
    document.getElementById("closeLightbox");


if (galleryImages.length && lightbox && lightboxImg) {

    galleryImages.forEach(img => {

        img.addEventListener("click", () => {

            lightbox.style.display = "flex";

            lightboxImg.src = img.src;

            lightboxImg.alt = img.alt;

        });

    });

}


if (closeLightbox) {

    closeLightbox.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

}


if (lightbox) {

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

}


document.addEventListener("keydown", (e) => {

    if (
        e.key === "Escape" &&
        lightbox
    ) {

        lightbox.style.display = "none";

    }

});


// =========================
// HEADER SHADOW
// =========================

const header =
    document.querySelector("header");


window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 60) {

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.boxShadow = "none";

    }

});


// =========================
// ACTIVE MENU
// =========================

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll("nav a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 120;

        const height =
            section.offsetHeight;

        if (
            window.scrollY >= top &&
            window.scrollY < top + height
        ) {

            current = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


// =========================
// CART SYSTEM
// =========================

let cart = [];


// =========================
// CHANGE PRICE
// =========================

function changePrice(select, kiloPrice) {

    const weight =
        parseFloat(select.value);

    const finalPrice =
        kiloPrice * weight;

    const priceBox =
        select.parentElement.querySelector(".price");

    if (priceBox) {

        priceBox.innerHTML =
            Math.round(finalPrice) + " ج";

    }

}
// ================================
// CART DISPLAY
// ================================

function showCart() {

    let cartBox = document.getElementById("cartBox");

    if (!cartBox) {
        cartBox = document.createElement("div");
        cartBox.id = "cartBox";
        document.body.appendChild(cartBox);
    }

    if (cart.length === 0) {

        cartBox.innerHTML = `
            <div class="cart-content">

                <button class="close-cart" onclick="closeCart()">×</button>

                <h2>🛒 سلة الطلبات</h2>

                <p class="empty-cart">
                    السلة فارغة ☕
                </p>

            </div>
        `;

        cartBox.style.display = "flex";
        return;
    }

    let total = 0;
    let itemsHTML = "";

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        itemsHTML += `
            <div class="cart-item">

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>${item.weight}</p>

                    <strong>${item.price} ج</strong>

                </div>

                <div class="quantity-box">

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    🗑️

                </button>

            </div>
        `;
    });

    cartBox.innerHTML = `

        <div class="cart-content">

            <button
                class="close-cart"
                onclick="closeCart()">

                ×

            </button>

            <h2>🛒 سلة الطلبات</h2>

            <div class="cart-items">
                ${itemsHTML}
            </div>

            <div class="cart-total">

                <span>الإجمالي</span>

                <strong>${total} ج</strong>

            </div>

            <button
                class="checkout-btn"
                onclick="checkoutWhatsApp()">

                ☕ إتمام الطلب عبر واتساب

            </button>

        </div>
    `;

    cartBox.style.display = "flex";
}
// ================================
// BON EL MOLOUK - CART SYSTEM
// الجزء الثالث
// ================================

let cart = [];

// ================================
// حساب السعر حسب الوزن
// ================================

function changePrice(select, kiloPrice) {

    let weight = parseFloat(select.value);

    let finalPrice = kiloPrice * weight;

    let priceBox = select.parentElement.querySelector(".price");

    if (priceBox) {
        priceBox.innerHTML = Math.round(finalPrice) + " ج";
    }
}


// ================================
// إضافة المنتج للسلة
// ================================

function addToCart(productName, kiloPrice, select) {

    let weight = parseFloat(select.value);

    let weightText = "";

    if (weight === 1) {
        weightText = "1 كيلو";
    }
    else if (weight === 0.5) {
        weightText = "500 جم";
    }
    else if (weight === 0.25) {
        weightText = "250 جم";
    }
    else if (weight === 0.125) {
        weightText = "125 جم";
    }

    let price = Math.round(kiloPrice * weight);

    cart.push({
        name: productName,
        weight: weightText,
        price: price,
        quantity: 1
    });

    showCart();

    alert(
        "تم إضافة " +
        productName +
        " - " +
        weightText +
        " للسلة ☕👑"
    );
}


// ================================
// فتح السلة
// ================================

function openCart() {

    showCart();

}
// ================================
// CART DISPLAY
// ================================

function showCart() {

    let cartBox = document.getElementById("cartBox");

    if (!cartBox) {
        cartBox = document.createElement("div");
        cartBox.id = "cartBox";
        document.body.appendChild(cartBox);
    }

    let total = 0;

    if (cart.length === 0) {

        cartBox.innerHTML = `
            <div class="cart-content">

                <button class="close-cart" onclick="closeCart()">
                    ×
                </button>

                <h2>🛒 سلة الطلبات</h2>

                <div class="empty-cart">
                    السلة فارغة ☕
                </div>

            </div>
        `;

        cartBox.style.display = "flex";

        return;
    }

    let itemsHTML = "";

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        itemsHTML += `
            <div class="cart-item">

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        الوزن: ${item.weight}
                    </p>

                    <strong>
                        ${item.price} ج
                    </strong>

                </div>

                <div class="quantity-box">

                    <button
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    🗑️

                </button>

            </div>
        `;
    });

    cartBox.innerHTML = `

        <div class="cart-content">

            <button
                class="close-cart"
                onclick="closeCart()">

                ×

            </button>

            <h2>🛒 سلة الطلبات</h2>

            <div class="cart-items">

                ${itemsHTML}

            </div>

            <div class="cart-total">

                <span>
                    الإجمالي
                </span>

                <strong>
                    ${total} ج
                </strong>

            </div>

            <button
                class="checkout-btn"
                onclick="checkoutWhatsApp()">

                ☕ إتمام الطلب عبر واتساب

            </button>

        </div>

    `;

    cartBox.style.display = "flex";
}


// ================================
// تغيير الكمية
// ================================

function changeQuantity(index, amount) {

    if (!cart[index]) return;

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    showCart();
}


// ================================
// حذف منتج
// ================================

function removeFromCart(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    showCart();
}


// ================================
// إغلاق السلة
// ================================

function closeCart() {

    const cartBox = document.getElementById("cartBox");

    if (cartBox) {

        cartBox.style.display = "none";

    }
}
// ================================
// CART DISPLAY
// ================================

function showCart() {

    let cartBox = document.getElementById("cartBox");

    if (!cartBox) {
        cartBox = document.createElement("div");
        cartBox.id = "cartBox";
        document.body.appendChild(cartBox);
    }

    if (cart.length === 0) {

        cartBox.innerHTML = `
            <div class="cart-content">

                <button class="close-cart" onclick="closeCart()">×</button>

                <h2>🛒 سلة الطلبات</h2>

                <div class="empty-cart">
                    السلة فارغة ☕
                </div>

            </div>
        `;

        cartBox.style.display = "flex";

        return;
    }

    let total = 0;

    let itemsHTML = "";

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        itemsHTML += `
            <div class="cart-item">

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        الوزن: ${item.weight}
                    </p>

                    <strong>
                        ${item.price} ج للواحد
                    </strong>

                    <p>
                        الإجمالي: ${itemTotal} ج
                    </p>

                </div>


                <div class="quantity-box">

                    <button
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    🗑️

                </button>

            </div>
        `;
    });


    cartBox.innerHTML = `

        <div class="cart-content">

            <button
                class="close-cart"
                onclick="closeCart()">

                ×

            </button>


            <h2>
                🛒 سلة الطلبات
            </h2>


            <div class="cart-items">

                ${itemsHTML}

            </div>


            <div class="cart-total">

                <span>
                    الإجمالي
                </span>

                <strong>
                    ${total} ج
                </strong>

            </div>


            <button
                class="checkout-btn"
                onclick="checkoutWhatsApp()">

                ☕ إتمام الطلب عبر واتساب

            </button>

        </div>

    `;


    cartBox.style.display = "flex";
}
// ================================
// BON EL MOLOUK - CART DISPLAY
// ================================

function showCart() {

    let cartBox = document.getElementById("cartBox");

    if (!cartBox) {
        cartBox = document.createElement("div");
        cartBox.id = "cartBox";
        document.body.appendChild(cartBox);
    }

    let total = 0;
    let itemsHTML = "";

    if (cart.length === 0) {

        cartBox.innerHTML = `
            <div class="cart-content">

                <button class="close-cart" onclick="closeCart()">×</button>

                <h2>🛒 سلة الطلبات</h2>

                <p class="empty-cart">
                    السلة فارغة ☕
                </p>

            </div>
        `;

        cartBox.style.display = "flex";
        return;
    }

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        itemsHTML += `
            <div class="cart-item">

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        الوزن: ${item.weight}
                    </p>

                    <strong>
                        ${item.price} ج
                    </strong>

                </div>

                <div class="quantity-box">

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    🗑️

                </button>

            </div>
        `;
    });

    cartBox.innerHTML = `

        <div class="cart-content">

            <button
                class="close-cart"
                onclick="closeCart()">

                ×

            </button>

            <h2>
                🛒 سلة الطلبات
            </h2>

            <div class="cart-items">

                ${itemsHTML}

            </div>

            <div class="cart-total">

                <span>
                    الإجمالي
                </span>

                <strong>
                    ${total} ج
                </strong>

            </div>

            <button
                class="checkout-btn"
                onclick="checkoutWhatsApp()">

                ☕ إتمام الطلب عبر واتساب

            </button>

        </div>

    `;

    cartBox.style.display = "flex";
}