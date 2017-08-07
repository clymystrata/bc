$(() => {
    $.get('/survey/1', (rec) => {
        let html = `<tr><th>${rec.question}</th></tr>`;
        for( let i in rec.results) {
            html += `<tr><td><p class="result">${rec.results[i]}</p></td></tr>`;
        }
        $('#q1 table tbody').html(html);
    });

    $.get('/survey/2', (rec) => {
        let html = `<tr><th>${rec.question}</th></tr>`;
        for( let i in rec.results) {
            html += `<tr><td><p class="result">${rec.results[i]}</p></td></tr>`;
        }
        $('#q2 table tbody').html(html);
    });
});