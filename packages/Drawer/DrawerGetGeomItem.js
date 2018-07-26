import Brush from './Brush';

Brush.prototype.getGeomItem = function (pos) {
    const hCtx = this.hitCtx;

    const pixel = hCtx.getImageData(pos.x, pos.y, 1, 1).data;
    // hCtx.translate(
    //     this.canvas.width / 2,
    //     this.canvas.height / 2
    // );

    // hCtx.beginPath();
    // hCtx.strokeStyle = '#FF0000';
    // hCtx.arc(pos.x - this.canvas.width/2, pos.y - this.canvas.height/2, 2, 0, 2 * Math.PI);
    // hCtx.stroke();

    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    // console.log(this.colorMap, color);

    return this.colorMap[color];
};
