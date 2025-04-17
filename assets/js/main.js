document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".hero, .about-section, .team-section, .pricing-section, .contact-section");

    const observerOptions = {
        root: null,
        threshold: 0.2,
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
});


document.addEventListener("DOMContentLoaded", function () {
    const teamSection = document.querySelector(".team-section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                teamSection.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    observer.observe(teamSection);
});

document.addEventListener("DOMContentLoaded", function () {
    const pricingSection = document.querySelector(".pricing-section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                pricingSection.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    observer.observe(pricingSection);
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".contact-form form").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Вашето съобщение е изпратено успешно!");
        this.reset();
    });
});
