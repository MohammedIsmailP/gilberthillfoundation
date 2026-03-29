document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling with easeInOutQuart
    function easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }

    function scrollToTarget(target, extraOffset) {
        const navbar = document.querySelector('.fixed-top');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        let offset = -navbarHeight + (extraOffset || 0);

        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + start + offset;
        const duration = 1500;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            window.scrollTo(0, start + (end - start) * easeInOutQuart(progress));
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    document.querySelectorAll('a.page-scroll').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            if (!target) return;

            const extraOffset = link.parentElement.nodeName === 'P' ? -55 : 0;
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navCollapse = document.querySelector('.navbar-collapse');

            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none' && navCollapse.classList.contains('show')) {
                // Close menu first, then scroll after collapse completes
                navCollapse.addEventListener('hidden.bs.collapse', () => scrollToTarget(target, extraOffset), { once: true });
                bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
            } else {
                scrollToTarget(target, extraOffset);
            }
        });
    });

    // Dynamic PIL (first 3 entries only)
    fetch('media/pil.json')
        .then(res => res.json())
        .then(data => {
            const timeline = document.querySelector('.timeline');
            let count = 0;

            for (const group of data) {
                for (const entry of group.entries) {
                    if (count >= 3) break;
                    timeline.appendChild(buildTimelineItem(entry));
                    count++;
                }
                if (count >= 3) break;
            }

            timeline.appendChild(document.createElement('li'));
        })
        .catch(() => {
            const timeline = document.querySelector('.timeline');
            const msg = document.createElement('li');
            msg.className = 'timeline-error';
            msg.textContent = 'Unable to load timeline data.';
            timeline.appendChild(msg);
        });
});
