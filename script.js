document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const backToTop = document.querySelector(".back-to-top");

    const mobileLinks = document.querySelectorAll(
        ".mobile-menu a"
    );

    const navLinks = document.querySelectorAll(
        ".desktop-nav a"
    );

    const revealElements = document.querySelectorAll(
        ".reveal"
    );


    /* =====================================================
       HEADER AO ROLAR
    ====================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       MENU MOBILE
    ====================================================== */

    function openMenu() {

        if (!menuButton || !mobileMenu) return;

        menuButton.classList.add("active");

        mobileMenu.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.style.overflow = "hidden";
    }


    function closeMenu() {

        if (!menuButton || !mobileMenu) return;

        menuButton.classList.remove("active");

        mobileMenu.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";
    }


    function toggleMenu() {

        if (!mobileMenu) return;

        if (mobileMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            toggleMenu
        );

    }


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =====================================================
       ANIMAÇÕES AO ENTRAR NA TELA
    ====================================================== */

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
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

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       SCROLL SUAVE
    ====================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       VOLTAR AO TOPO
    ====================================================== */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       MENU ATIVO CONFORME A SEÇÃO
    ====================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    if (
        "IntersectionObserver" in window &&
        navLinks.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                        });


                        const activeLink =
                            document.querySelector(
                                `.desktop-nav a[href="#${entry.target.id}"]`
                            );


                        if (activeLink) {

                            activeLink.classList.add(
                                "active"
                            );

                        }

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       FECHAR MENU AO VOLTAR PARA DESKTOP
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 750
            ) {
                closeMenu();
            }

        }
    );


    /* =====================================================
       ANO AUTOMÁTICO DO FOOTER
    ====================================================== */

    const yearElement =
        document.getElementById(
            "currentYear"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PROTEÇÃO CONTRA IMAGENS QUEBRADAS
    ====================================================== */

    document.querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Imagem não encontrada:",
                        image.getAttribute("src")
                    );

                }
            );

        });


    /* =====================================================
       LOG
    ====================================================== */

    console.log(
        "Raquel Marcolino — site carregado com sucesso."
    );

});