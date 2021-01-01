$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        var bal = 0;
        if ($anchor.parent()[0].nodeName == 'P')
            bal = -55;
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top + bal
        }, 1500, 'easeInOutQuart');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});