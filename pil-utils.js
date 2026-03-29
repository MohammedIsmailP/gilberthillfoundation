function highlightText(text, highlights) {
    if (!highlights || highlights.length === 0) {
        return [document.createTextNode(text)];
    }

    const nodes = [];
    let remaining = text;

    while (remaining.length > 0) {
        let earliestIndex = remaining.length;
        let matchedTerm = null;

        for (const term of highlights) {
            const idx = remaining.indexOf(term);
            if (idx !== -1 && idx < earliestIndex) {
                earliestIndex = idx;
                matchedTerm = term;
            }
        }

        if (matchedTerm === null) {
            nodes.push(document.createTextNode(remaining));
            break;
        }

        if (earliestIndex > 0) {
            nodes.push(document.createTextNode(remaining.substring(0, earliestIndex)));
        }

        const bold = document.createElement('b');
        bold.textContent = matchedTerm;
        nodes.push(bold);

        remaining = remaining.substring(earliestIndex + matchedTerm.length);
    }

    return nodes;
}

function buildTimelineItem(entry, options) {
    const li = document.createElement('li');
    li.className = 'timeline-item';

    // Timeline info (date)
    const info = document.createElement('div');
    info.className = 'timeline-info';
    const dateSpan = document.createElement('span');
    dateSpan.textContent = entry.date;
    info.appendChild(dateSpan);

    // Timeline marker
    const marker = document.createElement('div');
    marker.className = 'timeline-marker';

    // Timeline content
    const content = document.createElement('div');
    content.className = 'timeline-content';

    const summary = document.createElement('p');
    summary.className = 'content';
    for (const node of highlightText(entry.summary, entry.highlights)) {
        summary.appendChild(node);
    }

    const judges = document.createElement('p');
    judges.className = 'text-right';
    const judgeLabel = document.createElement('b');
    judgeLabel.textContent = "- Hon'ble Chief Justice";
    judges.appendChild(judgeLabel);
    judges.appendChild(document.createElement('br'));
    judges.appendChild(document.createTextNode(entry.judges.join(', ')));

    content.appendChild(summary);
    content.appendChild(judges);

    // Optional PDF link
    if (options && options.showPdfLink) {
        const pdfP = document.createElement('p');
        pdfP.className = 'text-right';
        const pdfLink = document.createElement('a');
        pdfLink.className = 'underlined page-scroll';
        pdfLink.href = 'media/PIL/' + encodeURIComponent(entry.date) + '.pdf';
        pdfLink.target = '_blank';
        pdfLink.textContent = 'Learn more..';
        pdfP.appendChild(pdfLink);
        content.appendChild(pdfP);
    }

    li.appendChild(info);
    li.appendChild(marker);
    li.appendChild(content);

    return li;
}
