document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills-section')) {
                    animateProgressBars();
                }
                if (entry.target.classList.contains('languages-section')) {
                    animateLanguageBars();
                }
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills-section');
    const languagesSection = document.querySelector('.languages-section');

    if (skillsSection) observer.observe(skillsSection);
    if (languagesSection) observer.observe(languagesSection);

    function animateProgressBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => {
            const progress = fill.getAttribute('data-progress');
            setTimeout(() => {
                fill.style.width = progress + '%';
            }, 200);
        });
    }

    function animateLanguageBars() {
        const languageFills = document.querySelectorAll('.language-fill');
        languageFills.forEach(fill => {
            const level = fill.getAttribute('data-level');
            setTimeout(() => {
                fill.style.width = level + '%';
            }, 200);
        });
    }

    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
