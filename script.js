// Loading Screen
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 1200);
});

// Scroll Animation
const hiddenElements = document.querySelectorAll(
".features,.feature-card,.products,.testimonials,.testimonial-card,.gallery,.contact,.card"
);

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach((el)=>{
    el.classList.add("hidden");
    observer.observe(el);
});
/* ===== Hero Background Slider ===== */

const hero = document.querySelector(".hero");

const backgrounds = [
    "coffee1.jpg",
    "coffee2.jpg",
    "coffee3.jpg"
];

let current = 0;

setInterval(() => {

    current++;

    if(current >= backgrounds.length){
        current = 0;
    }

    hero.style.backgroundImage =
    `url(${backgrounds[current]})`;

},4000);
// سهم النزول

document.querySelector(".scroll-down").onclick=function(){

document.querySelector("#features").scrollIntoView({

behavior:"smooth"

});

};
/* ===== Counter Animation ===== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 100;

            const update = ()=>{

                count += speed;

                if(count < target){

                    counter.innerText = Math.floor(count);

                    requestAnimationFrame(update);

                }else{

                    counter.innerText = target + "+";

                }

            };

            update();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter=>counterObserver.observe(counter));
/* ===== Back To Top ===== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
/* ===== Lightbox ===== */

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

galleryImages.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});