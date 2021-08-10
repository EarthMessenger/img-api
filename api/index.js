import { TextSvg } from '../src/svg';

module.exports = async (req, res) => {
    let {
        s = '',
        size = 16,
        color,
        // h = -1,
        // w = -1,
        font = 'sans-serif',
    } = req.query;

    res.setHeader('Cache-Control', 's-maxage=86400');
    res.setHeader("Content-Type", "image/svg+xml");

    if (typeof (size) == 'string') size = parseInt(size);
    if (typeof (h) == 'string') size = parseInt(h);
    if (typeof (w) == 'string') size = parseInt(w);

    res.status(200).send((new TextSvg(
        s,
        size,
        color,
        font,
        // h,
        // w,
    )).render());
};