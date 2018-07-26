import Drawer from '../Drawer/Drawer';
import Handler from '../Handler/Handler';

import $ from 'jquery';

class C3djs {
    constructor(canvas) {
        this.system = new Handler.System();
        this.system.create();
        this.draw = new Drawer.Brush(canvas);

        this.pickedGeoms = [];

        this.mode = {};
        this.canvas = canvas;

    }

    setMode(mode) {
        switch(mode) {
            case 'add-point': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const system = this.system;
                    const draw = this.draw;

                    system.addPoint({
                        x: pos.x - this.canvas.width/2,
                        y: -(pos.y - this.canvas.height/2),
                    });

                    system.evaluate();
                    draw.parseSchema(system.geoms);
                }
                break;
            }
            case 'add-circle': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const system = this.system;
                    const draw = this.draw;

                    system.addCircle({
                        x: pos.x - this.canvas.width/2,
                        y: -(pos.y - this.canvas.height/2),
                    }, 100);

                    system.evaluate();
                    draw.parseSchema(system.geoms);
                }
                break;
            }
            case 'add-segment': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const draw = this.draw;

                    const geomItem = draw.getGeomItem(pos);
                    if(isNaN(geomItem)) return;
                    this.pickedGeoms.push(geomItem);

                    if(this.pickedGeoms.length === 2) {
                        const system = this.system;

                        system.addLineSeg(this.pickedGeoms);

                        this.pickedGeoms = [];

                        system.evaluate();
                        draw.parseSchema(system.geoms);
                    }
                };
                break;
            }
            case 'move-geom-item': {
                this.handler = (e) => {
                    const $canvas = $(this.canvas);
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const draw = this.draw;

                    const geomItem = draw.getGeomItem(pos);
                    if(isNaN(geomItem)) return;


                    const mouseMove = (e) => {
                        let pos = Drawer.getMousePos(this.canvas, e);
                        const draw = this.draw;
                        const system = this.system;

                        pos.x = pos.x - this.canvas.width/2;
                        pos.y = -(pos.y - this.canvas.height/2);

                        system.dragPoint(geomItem, pos);

                        system.evaluate();
                        draw.parseSchema(system.geoms);
                    }

                    $canvas.on('mousemove', mouseMove);

                    // $canvas.on('mouseup').off('mousemove', mouseMove);
                };
                break;
            }
            case 'add-vertical': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const draw = this.draw;
                    const system = this.system;

                    const geomItem = draw.getGeomItem(pos);
                    if(isNaN(geomItem)) return;

                    system.addVertical(geomItem);

                    system.evaluate();
                    draw.parseSchema(system.geoms);
                };
                break;
            }
            case 'add-horizontal': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const draw = this.draw;
                    const system = this.system;

                    const geomItem = draw.getGeomItem(pos);
                    if(isNaN(geomItem)) return;

                    system.addHorizontal(geomItem);

                    system.evaluate();
                    draw.parseSchema(system.geoms);
                };
                break;
            }
            case 'add-parallel': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const draw = this.draw;
                    const system = this.system;

                    const geomItem = draw.getGeomItem(pos);
                    if(isNaN(geomItem)) return;
                    this.pickedGeoms.push(geomItem);

                    console.log(this.pickedGeoms);

                    if(this.pickedGeoms.length === 2) {
                        const system = this.system;

                        console.log(system.addParallel(this.pickedGeoms));

                        this.pickedGeoms = [];

                        system.evaluate();
                        draw.parseSchema(system.geoms);
                    }
                };
                break;
            }
            case 'add-perpendicular': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const draw = this.draw;
                    const system = this.system;

                    const geomItem = draw.getGeomItem(pos);
                    if(isNaN(geomItem)) return;
                    this.pickedGeoms.push(geomItem);

                    console.log(this.pickedGeoms);

                    if(this.pickedGeoms.length === 2) {
                        const system = this.system;

                        console.log(system.addPerpendicular(this.pickedGeoms));

                        this.pickedGeoms = [];

                        system.evaluate();
                        draw.parseSchema(system.geoms);
                    }
                };
                break;
            }
            case 'add-middle-point': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const draw = this.draw;
                    const system = this.system;

                    const geomItem = draw.getGeomItem(pos);
                    if(isNaN(geomItem)) return;
                    this.pickedGeoms.push(geomItem);

                    console.log(this.pickedGeoms);

                    if(this.pickedGeoms.length === 3) {
                        const system = this.system;

                        console.log(system.addMiddlePoint(this.pickedGeoms));

                        this.pickedGeoms = [];

                        system.evaluate();
                        draw.parseSchema(system.geoms);
                    }
                };
                break;
            }
            case 'add-tangent': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const draw = this.draw;
                    const system = this.system;

                    const geomItem = draw.getGeomItem(pos);
                    if(isNaN(geomItem)) return;
                    this.pickedGeoms.push(geomItem);

                    if(this.pickedGeoms.length === 2) {
                        const system = this.system;

                        console.log(system.addTangent(this.pickedGeoms));

                        this.pickedGeoms = [];

                        system.evaluate();
                        draw.parseSchema(system.geoms);
                    }
                };
                break;
            }
            case 'move-geoms': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const draw = this.draw;
                    const system = this.system;



                    const geomItem = draw.getGeomItem(pos);
                    if(isNaN(geomItem)) return;
                    this.pickedGeoms.push(geomItem);
                    console.log(this.pickedGeoms);

                    if(this.pickedGeoms.length === 1) { // 2
                        const $canvas = $(this.canvas);
                        let prevPos = Drawer.getMousePos(this.canvas, e);

                        const mouseMove = (e) => {
                            const system = this.system;
                            const newPos = Drawer.getMousePos(this.canvas, e);

                            system.dragGeoms(
                                [geomItem],
                                prevPos,
                                newPos
                            );

                            prevPos = newPos;
                            this.pickedGeoms = [];

                            system.evaluate();
                            draw.parseSchema(system.geoms);
                        };

                        $canvas.on('mousemove', mouseMove);
                    }
                };
                break;
            }
            case 'freeze-geom': {
                this.handler = (e) => {
                    const pos = Drawer.getMousePos(this.canvas, e);
                    const draw = this.draw;
                    const system = this.system;

                    const geomItem = draw.getGeomItem(pos);
                    if(isNaN(geomItem)) return;

                    system.freezeGeom(geomItem);

                    system.evaluate();
                    draw.parseSchema(system.geoms);
                };
                break;
            }
            default : {
                console.warn(`${mode} not found!`);
                break;
            }
        }

        if(mode === 'move-geom-item' || mode === 'move-geoms') {
            const $canvas = $(this.canvas);

            $canvas.mouseup(() => {
                $canvas.unbind('mousemove');
            });
        }
        this.canvas.addEventListener('mousedown', this.handler);
    }

    removeMode() {
        this.canvas.removeEventListener('mousedown', this.handler);
        this.pickedGeoms = [];
    }
}

export default C3djs;
