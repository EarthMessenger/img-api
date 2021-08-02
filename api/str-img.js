import axios from 'axios';

function checkUrl(url) {
    let match = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
    return match.test(url);
}

module.exports = async (req, res) => {
    const {
        str = '',
        url = '',
        font_size = 16,
    } = req.query;

    res.setHeader("Content-Type", "image/svg+xml");

    if (url != '' && checkUrl(url)) {
        console.log(url);

        axios.get(url, {
            timeout: 1000,
            responseType: 'text',
            maxContentLength: 1000,
        }).then((__res) => {
            console.log(__res.data);
            res.send(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <text x="0" y="${font_size}" font-size="${font_size}">${__res.data}</text>
        </svg>`)
        }).catch((__err) => {
            console.error(__err);
            res.send(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <text x="0" y="${font_size}" font-size="${font_size}">${__err}</text>
        </svg>`)
        })
    }
    else {
        res.send(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <text x="0" y="${font_size}" font-size="${font_size}">${str}</text>
</svg>`);
    }
}
