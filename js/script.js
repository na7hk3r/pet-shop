document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-menu');
    
    burgerMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('show-menu');
        document.body.classList.toggle('no-scroll');
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('show-menu');
            document.body.classList.remove('no-scroll');
        });
    }
    
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('show-menu');
            document.body.classList.remove('no-scroll');
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.header-container-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('card-visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
    
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    const testimonialObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    void entry.target.offsetWidth;
                    
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    });
    
    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '0';
        testimonialObserver.observe(testimonial);
    });
    
    const categoryTabs = document.querySelectorAll('.category-tab');
    const allProducts = document.querySelectorAll('.card');
    
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                categoryTabs.forEach(tab => tab.classList.remove('active-tab'));
                
                this.classList.add('active-tab');
                
                const category = this.getAttribute('data-category');
                
                allProducts.forEach(product => {
                    if (category === 'todos' || product.getAttribute('data-category') === category) {
                        product.style.display = 'flex';
                        product.style.opacity = '0';
                        product.style.transform = 'translateY(20px)';
                        
                        void product.offsetWidth;
                        
                        product.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        product.style.opacity = '1';
                        product.style.transform = 'translateY(0)';
                    } else {
                        product.style.opacity = '0';
                        product.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            product.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    const formInputs = document.querySelectorAll('form input, form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('input-focused');
            }
        });
    });
});