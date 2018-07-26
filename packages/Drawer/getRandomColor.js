const getRandomColor = function (colorMap) {
    let r, g, b;
    let color = '';

    do {
        r = Math.round(Math.random() * 255);
        g = Math.round(Math.random() * 255);
        b = Math.round(Math.random() * 255);
        color = `rgb(${r},${g},${b})`;
        if(color === 'rgb(0,0,0)') continue;
    } while(Object.prototype.hasOwnProperty.call(colorMap, color));

    return color;
}

export default getRandomColor;
