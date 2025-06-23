document.addEventListener('DOMContentLoaded', () => {
    // Menu responsivo
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger animation
        burger.classList.toggle('toggle');
    });

    // Fechar menu ao clicar em um link (para mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach((item) => { // Reset animation for next open
                item.style.animation = '';
            });
        });
    });

    // Animação de elementos ao rolar (Intersection Observer)
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-right, .fade-in-left');

    const observerOptions = {
        root: null,
        threshold: 0.1, // Quando 10% do elemento estiver visível
        rootMargin: '0px'
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0) translateX(0)'; // Reset both
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        elementObserver.observe(el);
    });


    // Keyframes para animação de links do menu (JS)
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);


    // Carrossel de Depoimentos
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.slider-btn.prev-btn');
    const nextBtn = document.querySelector('.slider-btn.next-btn');

    if (testimonialSlider && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalItems = testimonialSlider.children.length;
        const itemWidth = testimonialSlider.children[0].clientWidth; // Largura de um item

        function updateSlider() {
            // Recalcula a largura do item para responsividade
            const currentItemWidth = testimonialSlider.children[0].clientWidth;
            const offset = -currentIndex * currentItemWidth;
            testimonialSlider.style.transform = `translateX(${offset}px)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateSlider();
        });

        // Atualiza o slider se o tamanho da janela mudar (para responsividade)
        window.addEventListener('resize', updateSlider);

        // Opcional: Auto-slide para depoimentos
        // let autoSlideInterval = setInterval(() => {
        //     currentIndex = (currentIndex + 1) % totalItems;
        //     updateSlider();
        // }, 7000); // Muda a cada 7 segundos

        // Pausar auto-slide ao interagir e retomar
        // testimonialSlider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        // testimonialSlider.addEventListener('mouseleave', () => {
        //     autoSlideInterval = setInterval(() => {
        //         currentIndex = (currentIndex + 1) % totalItems;
        //         updateSlider();
        //     }, 7000);
        // });
    }
});