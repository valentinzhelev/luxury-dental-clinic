document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    const sections = document.querySelectorAll(".reveal, .hero, .about-section-new, .team-section, .pricing-section, .contact-section, .cta-bar, .footer-section, .page-header-about, .about-detailed, .about-features, .cta-section, .page-header-team, .team-section-page, .service-header, .service-main-content, .service-process, .service-faq, .page-header-pricing, .pricing-page-section, .gallery-section");

    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.1,
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.classList.remove('active');
                        }
                    }
                });
                
                item.classList.toggle('active');
                if (answer) {
                    answer.classList.toggle('active');
                }
            });
        });
    }

    const contactForm = document.querySelector(".contact-form form");
    if(contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Вашето съобщение е изпратено успешно!");
            this.reset();
        });
    }

    const contactPageForm = document.querySelector(".contact-form-page");
    if(contactPageForm) {
        contactPageForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Вашето съобщение е изпратено успешно!");
            this.reset();
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-lightbox');
    const nextBtn = document.querySelector('.next-lightbox');

    if (galleryItems.length > 0 && lightbox) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.getAttribute('data-filter');
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        let currentImageIndex;
        let visibleItems = [];

        const updateVisibleItems = () => {
            visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        };

        const showImage = (index) => {
            if (index >= 0 && index < visibleItems.length) {
                lightboxImg.src = visibleItems[index].querySelector('img').src;
                currentImageIndex = index;
                lightbox.style.display = 'flex';
            }
        };
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                updateVisibleItems();
                const index = visibleItems.indexOf(item);
                showImage(index);
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
        };

        const showNextImage = () => {
            let nextIndex = currentImageIndex + 1;
            if (nextIndex >= visibleItems.length) nextIndex = 0;
            showImage(nextIndex);
        };

        const showPrevImage = () => {
            let prevIndex = currentImageIndex - 1;
            if (prevIndex < 0) prevIndex = visibleItems.length - 1;
            showImage(prevIndex);
        };

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNextImage);
        prevBtn.addEventListener('click', showPrevImage);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'ArrowRight') showNextImage();
                else if (e.key === 'ArrowLeft') showPrevImage();
                else if (e.key === 'Escape') closeLightbox();
            }
        });
    }

    const navLinks = document.querySelector('.nav-links');
    const dropdownItems = document.querySelectorAll('.nav-links li');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (dropdown && window.innerWidth <= 768) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links')) {
            dropdownItems.forEach(item => {
                const dropdown = item.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            });
        }
    });
});
