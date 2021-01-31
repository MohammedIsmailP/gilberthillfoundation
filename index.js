$(document).ready(()=>{
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

});


// Dynamic PIL
$.ajax({
    type: 'GET',
    url: 'media/pil.txt',
    dataType: 'text',
    success: (res) => {
        var c = 1, i = 0;
        var pil = '';
        res = res.split('\n');
        while (c < 4) {
            arr = res[i++].split('\t');
            if (arr.length == 3) {
                pil += `<li class="timeline-item">
                <div class="timeline-info">
                    <span>${arr[0]}</span>
                </div>
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <p class="content">${arr[2]}</p>
                    <p class="text-right"><b>- Hon'ble Chief Justice</b><br>
                    ${arr[1]}</p>
                </div>
                </li>`
                c++;
            }
        }
        pil+=`<li></li>`
        $('.timeline')[0].innerHTML += pil;
    }
});