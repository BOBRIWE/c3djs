import Brush from './Brush';
import getRandomColor from './getRandomColor';

Brush.prototype.point = function (item) {
    const ctx = this.ctx;
    const hCtx = this.hitCtx;

    let { x, y } = item.point;

    y = -y;

    const oldStrokeColor = ctx.strokeStyle;
    const oldFillColor = ctx.fillStyle;

    ctx.strokeStyle = '#FF0000';
    ctx.fillStyle = '#FF0000';

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.strokeStyle = oldStrokeColor;
    ctx.fillStyle = oldFillColor;

    const color = getRandomColor(this.colorMap);
    this.colorMap[color] = item.geomItem;

    hCtx.beginPath();
    hCtx.arc(x, y, 4, 0, 2 * Math.PI);

    hCtx.strokeStyle = color;
    hCtx.fillStyle = color;
    hCtx.stroke();
    hCtx.fill();
};

Brush.prototype.lineSeg = function (item) {
    const ctx = this.ctx;
    const hCtx = this.hitCtx;

    let point1 = item.points[0];
    let point2 = item.points[1];

    point1.y = -point1.y;
    point2.y = -point2.y;
    //
    // this.point(point1);
    // this.point(point2);

    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();


    const color = getRandomColor(this.colorMap);
    this.colorMap[color] = item.geomItem;

    hCtx.beginPath();
    hCtx.moveTo(point1.x, point1.y);
    hCtx.lineTo(point2.x, point2.y);

    hCtx.strokeStyle = color;
    hCtx.fillStyle = color;
    hCtx.stroke();
};

Brush.prototype.circle = function (item) {
    const ctx = this.ctx;
    const hCtx = this.hitCtx;

    const radius = item.radius;
    let { x, y } = item.center;


    this.point({
        point: { x, y },
        geomItem: item.geomItem,
    });

    y = -y;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();


    const color = getRandomColor(this.colorMap);
    this.colorMap[color] = item.geomItem;


    hCtx.beginPath();
    hCtx.arc(x, y, radius, 0, 2 * Math.PI);

    hCtx.strokeStyle = color;
    hCtx.fillStyle = color;
    hCtx.stroke();
};
