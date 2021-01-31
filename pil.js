$.ajax({
    type: 'GET',
    url: 'media/pil.txt',
    dataType: 'text',
    success: (res) => {
        var c = 1;
        var pil = '';
        res = res.split('\n');
        for (let row of res) {
            arr = row.split('\t');
            if (arr.length == 1) {
                pil += `<li class="timeline-item period">
                    <div class="timeline-info"></div>
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h2 class="timeline-title">${arr}</h2>
                    </div>
                </li>`;
            } else {
                pil += `<li class="timeline-item">
                <div class="timeline-info">
                    <span>${arr[0]}</span>
                </div>
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <p class="content">${arr[2]}</p>
                    <p class="text-right"><b>- Hon'ble Chief Justice</b><br>
                    ${arr[1]}</p>
                    <p class="text-right"><a href="media/PIL/ordjud (${c++}).pdf" target="_blank">Learn more..</a></p>
                </div>
                </li>`
            }
        }
        $('.timeline')[0].innerHTML += pil;
    }
});