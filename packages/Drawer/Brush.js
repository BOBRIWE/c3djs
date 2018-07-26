function Brush(canvas) {
    const hitCanvas = document.createElement('canvas');

    this.ctx = canvas.getContext('2d');
    this.hitCtx = hitCanvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;


    hitCanvas.width = canvas.offsetWidth;
    hitCanvas.height = canvas.offsetHeight;
    document.getElementById('canvas-keeper').appendChild(hitCanvas);


    this.ctx.lineWidth = this.hitCtx.lineWidth =  5;
    this.ctx.strokeStyle = this.hitCtx.strokeStyle = '#007BFF';


    // this.hitCtx.fillStyle = "#9ea7b8";
    // this.hitCtx.fillRect(0,0,canvas.width, canvas.height);

    this.ctx.translate(
        canvas.width / 2,
        canvas.height / 2
     );

     this.hitCtx.translate(
         canvas.width / 2,
         canvas.height / 2
     );
    //
    //  this.ctx.resetTransform();
    //  this.hitCtx.resetTransform();

     this.colorMap = {};
     this.canvas = canvas;
}

export default Brush;
