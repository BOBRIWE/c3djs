import Brush from './Brush';

Brush.prototype.parseSchema = function (schema) {
    schema.sort((a, b) => {
        if(a.type === 'circle') return 1;

        return -1;
    });
    schema.sort((a, b) => {
        if(a.type === 'point') return 1;

        return -1;
    });

    this.repaint();
    schema.forEach(geomItem => {
        switch(geomItem.type) {
            case 'point': {
                requestAnimationFrame(this.point.bind(this, geomItem));
                break;
            }
            case 'line-seg': {
                requestAnimationFrame(this.lineSeg.bind(this, geomItem));
                break;
            }
            case 'circle': {
                requestAnimationFrame(this.circle.bind(this, geomItem));
                break;
            }
            default: {
                console.warn(`${geomItem.geomItem} with type '${geomItem.type}' not found!`);
            }
        }
    });
};

Brush.prototype.repaint = function () {
    const ctx = this.ctx;
    const hCtx = this.hitCtx;

    ctx.fillStyle = '#6C757D';
    hCtx.fillStyle = '#000000';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    hCtx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );
    hCtx.fillRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

    ctx.translate(
        canvas.width / 2,
        canvas.height / 2
     );

     hCtx.translate(
         canvas.width / 2,
         canvas.height / 2
     );
};
