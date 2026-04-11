$(document).ready(() => {
    // Smooth scrolling with easeInOutQuart
    function easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }

    function scrollToTarget(target, extraOffset) {
        const navbarHeight = document.querySelector('.navbar-fixed-top').offsetHeight;
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

    $('a.page-scroll').on('click', function (event) {
        event.preventDefault();
        const href = $(this).attr('href');
        const target = document.querySelector(href);
        if (!target) return;

        const extraOffset = $(this).parent()[0].nodeName === 'P' ? -55 : 0;
        const mobileMenu = $('.navbar-toggle:visible');
        const navbarCollapse = $('.navbar-collapse');

        if (mobileMenu.length && navbarCollapse.hasClass('in')) {
            // Close menu first, then scroll after collapse completes
            navbarCollapse.one('hidden.bs.collapse', () => scrollToTarget(target, extraOffset));
            mobileMenu.click();
        } else {
            scrollToTarget(target, extraOffset);
        }
    });

    // Highlight the top nav as scrolling occurs
    const navHeight = document.querySelector('.navbar-fixed-top').offsetHeight;
    $('body').scrollspy({ target: '.navbar-fixed-top', offset: navHeight + 20 });

    // Dynamic PIL (first 3 entries only)
    $.getJSON('media/pil.json').done((data) => {
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
    }).fail(() => {
        const timeline = document.querySelector('.timeline');
        const msg = document.createElement('li');
        msg.className = 'timeline-error';
        msg.textContent = 'Unable to load timeline data.';
        timeline.appendChild(msg);
    });
});
