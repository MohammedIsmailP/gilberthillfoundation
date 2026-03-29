$(document).ready(() => {
    // Smooth scrolling
    $('a.page-scroll').on('click', function (event) {
        const $anchor = $(this);
        let offset = 0;
        if ($anchor.parent()[0].nodeName === 'P') offset = -55;
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top + offset
        }, 1500, 'easeInOutQuart');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({ target: '.navbar-fixed-top' });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

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
