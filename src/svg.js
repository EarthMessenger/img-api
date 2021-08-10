export class TextSvg {
    s = '';
    size = 16;
    color = '';
    h = -1;
    w = -1;
    font = 'sans-serif';

    constructor(
        s = '',
        size = 16,
        color = '#000',
        font = 'sans-serif',
        h = -1,
        w = -1,
    ) {
        if (h == -1) {
            h = size * 1.47;
        }
        if (w == -1) {
            w = s.length * size + 2;
        }
        this.s = s;
        this.size = size;
        this.color = color;
        this.h = h;
        this.w = w;
        this.font = font;
    }

    render() {
        return `
<svg xmlns="http://www.w3.org/2000/svg" width="${this.w}px" height="${this.h}px" viewBox="0 0 ${this.w} ${this.h}" fill="none">
    <style>
        .text { font-size: ${this.size}px; fill: ${this.color}; font-family: ${this.font};}
    </style>
    <text class="text" x="0" y="${this.size}">${this.s}</text>
</svg>`
    }
};