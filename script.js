// Loading Screen
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 1200);
    }
});


// Scroll Animation
const hiddenElements = document.querySelectorAll(
    ".features,.feature-card,.products,.testimonials,.testimonial-card,.gallery,.contact,.card,.about,.stats"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});


// Fade In
const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            fadeObserver.unobserve(entry.target);
        }
    });
});

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});


// Counter Animation
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let count = 0;

            const update = () => {

                const speed = target / 80;

                if(count < target){

                    count += speed;
                    counter.innerText = Math.ceil(count) + "+";

                    setTimeout(update,25);

                }else{

                    counter.innerText = target + "+";

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


// Back To Top
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){
        topBtn.style.display="block";
    }else{
        topBtn.style.display="none";
    }

});


if(topBtn){

    topBtn.onclick = () => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    };

}


// Gallery Lightbox
const galleryImages = document.querySelectorAll(".gallery-box img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");


galleryImages.forEach(img=>{

    img.onclick = ()=>{

        lightbox.style.display="flex";
        lightboxImg.src = img.src;

    };

});


if(closeLightbox){

    closeLightbox.onclick = ()=>{
        lightbox.style.display="none";
    };

}


if(lightbox){

    lightbox.onclick = (e)=>{

        if(e.target === lightbox){
            lightbox.style.display="none";
        }

    };

}
function sendOrder(){

    let type = document.getElementById("coffeeType").value;

    let qty = document.getElementById("coffeeQty").value;


    let message =
    "السلام عليكم، أريد طلب:\n\n" +
    "نوع البن: " + type +
    "\nالكمية: " + qty;


    let url =
    "https://wa.me/201020808359?text=" +
    encodeURIComponent(message);


    window.open(url,"_blank");

}
function sendOrder(){

    let type = document.getElementById("coffeeType").value;

    let qty = document.getElementById("coffeeQty").value;


    let message =
    "السلام عليكم، أريد طلب:\n\n" +
    "نوع البن: " + type +
    "\nالكمية: " + qty;


    let url =
    "https://wa.me/201020808359?text=" +
    encodeURIComponent(message);


    window.open(url,"_blank");

}
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("service-worker.js");

    });

}