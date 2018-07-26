const getMousePos = function (canvas, evt) {
    const rect = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

export default getMousePos;
