$.getJSON('media/pil.json', (data) => {
    const timeline = document.querySelector('.timeline');

    for (const group of data) {
        // Year divider
        const period = document.createElement('li');
        period.className = 'timeline-item period';

        const periodInfo = document.createElement('div');
        periodInfo.className = 'timeline-info';
        const periodMarker = document.createElement('div');
        periodMarker.className = 'timeline-marker';
        const periodContent = document.createElement('div');
        periodContent.className = 'timeline-content';
        const periodTitle = document.createElement('h2');
        periodTitle.className = 'timeline-title';
        periodTitle.textContent = group.year;
        periodContent.appendChild(periodTitle);

        period.appendChild(periodInfo);
        period.appendChild(periodMarker);
        period.appendChild(periodContent);
        timeline.appendChild(period);

        // Entries
        for (const entry of group.entries) {
            timeline.appendChild(buildTimelineItem(entry, { showPdfLink: true }));
        }
    }
});
