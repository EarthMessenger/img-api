let mjAPI = require("mathjax-node");
mjAPI.config({
    MathJax: {

    }
});
mjAPI.start();

module.exports = async (req, res) => {
    const {
        tex = ''
    } = req.query;

    res.setHeader('Cache-Control', 's-maxage=86400');
    res.setHeader("Content-Type", "image/svg+xml");

    mjAPI.typeset({
        math: tex,
        format: 'TeX',
        svg: true
    }, (data) => {
        if (!data.errors) {
            res.status(200).send(data.svg);
        }
        else {
            res.status(400).send(data.svg);
        }
    })
}