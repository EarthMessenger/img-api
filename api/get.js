import axios, { axois } from 'axios';
import { TextSvg } from '../src/svg';

module.exports = async (req, res) => {
    let {
        url = '',
        size = 16,
        color,
        // h = -1,
        // w = -1,
        font = 'sans-serif',
    } = req.query;

    res.setHeader("Content-Type", "image/svg+xml");

    if (typeof (size) == 'string') size = parseInt(size);
    if (typeof (h) == 'string') size = parseInt(h);
    if (typeof (w) == 'string') size = parseInt(w);

    if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(url)) {

        axios.get(url, {
            responseType: 'text',
            maxContentLength: 1000,
        }).then((__res) => {
            let str = __res.data;
            console.log("Fetch %s, response: %s", url, __res.data)
            res.status(200).send((new TextSvg(
                str,
                size,
                color,
                font,
                // h,
                // w,
            )).render());
        }).catch((__err) => {
            console.error(__err);
            res.status(404).send((new TextSvg(
                __err,
                16,
                'red',
                'monospace',
            )).render());
        });
    }
    else {
        console.error('Invalid url: %s', url);
        res.status(400).send((new TextSvg(
            'Invalid url.',
            16,
            'red',
            'monospace',
        )).render());
    }
};