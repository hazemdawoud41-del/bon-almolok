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
".features,.feature-card,.journey,.journey-item,.products,.card,.gallery,.gallery-box,.testimonials,.testimonial-card,.about,.location,.contact"
);

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

hiddenElements.forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});


// =========================
// COUNTER
// =========================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;

const target=+counter.dataset.target;

let count=0;

const update=()=>{

const speed=target/80;

if(count<target){

count+=speed;

counter.innerText=Math.ceil(count)+"+";

setTimeout(update,25);

}else{

counter.innerText=target+"+";

}

};

update();

counterObserver.unobserve(counter);

}

});

});

counters.forEach(counter=>{

counterObserver.observe(counter);

});


// =========================
// BACK TO TOP
// =========================

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(!topBtn) return;

if(window.scrollY>500){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

if(topBtn){

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

}
// =========================
// GALLERY LIGHTBOX
// =========================

const galleryImages = document.querySelectorAll(".gallery-box img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

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

    if (e.key === "Escape" && lightbox) {

        lightbox.style.display = "none";

    }

});


// =========================
// HEADER SHADOW
// =========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 60) {

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.boxShadow = "none";

    }

});


// =========================
// ACTIVE MENU
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// =========================
// END
// =========================
function changePrice(select, kiloPrice) {

    let weight = select.value;

    let finalPrice = kiloPrice * weight;

    let priceBox = select.parentElement.querySelector(".price");

    priceBox.innerHTML = Math.round(finalPrice) + " ج";
}


function orderWhatsApp(productName) {

    let phone = "201XXXXXXXXX"; // حط رقم الواتساب بتاع بن الملوك هنا

    let message = "السلام عليكم 👑☕%0A";
    message += "أريد طلب: " + productName;

    let url = "https://wa.me/" + phone + "?text=" + message;

    window.open(url, "_blank");
}