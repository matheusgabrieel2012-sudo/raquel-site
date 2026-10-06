/* =========================================================
   RAQUEL MARCOLINO
   WEBSITE JAVASCRIPT
========================================================= */


/* =========================================
   ELEMENTOS
========================================= */

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const heroBackground = document.querySelector(".hero-background");


/* =========================================
   HEADER AO ROLAR
========================================= */

function handleHeader() {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleHeader);

handleHeader();


/* =========================================
   MENU MOBILE
========================================= */

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        const isActive = menuButton.classList.toggle("active");

        nav.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            isActive ? "true" : "false"
        );

    });

}


/* =========================================
   FECHAR MENU AO CLICAR
========================================= */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuButton.classList.remove("active");

        nav.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header.offsetHeight;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


/* =========================================
   PARALLAX DO HERO
========================================= */

window.addEventListener("scroll", () => {

    if (!heroBackground) {
        return;
    }

    const scrollPosition =
        window.scrollY;

    if (
        scrollPosition <
        window.innerHeight
    ) {

        heroBackground.style.transform =
            `scale(1.03) translateY(${scrollPosition * 0.12}px)`;

    }

});


/* =========================================
   WHATSAPP
========================================= */

const whatsappButtons =
    document.querySelectorAll(
        'a[href*="wa.me"]'
    );

whatsappButtons.forEach(button => {

    button.addEventListener("click", () => {

        console.log(
            "WhatsApp: contato iniciado."
        );

    });

});


/* =========================================
   ANO AUTOMÁTICO
========================================= */

const copyright =
    document.getElementById("copyright");

if (copyright) {

    copyright.textContent =
        `© ${new Date().getFullYear()} Raquel Marcolino`;

}


/* =========================================
   IMAGENS
========================================= */

const images =
    document.querySelectorAll("img");

images.forEach(image => {

    image.addEventListener(
        "load",
        () => {

            image.classList.add("loaded");

        }
    );

});


/* =========================================
   CONSOLE
========================================= */

console.log(
    "%cRAQUEL MARCOLINO",
    "font-size: 20px; font-weight: bold;"
);

console.log(
    "%cWebsite carregado com sucesso.",
    "font-size: 12px;"
);