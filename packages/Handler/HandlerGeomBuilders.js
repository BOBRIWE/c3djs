import { System } from './HandlerSystem';
import HandlerGeomUnit from './HandlerGeomUnit';

System.prototype.addPoint = function ({ x, y }) {
    let point = new GCE_point();
    point.set_x(x);
    point.set_y(y);

    let readyPoint = this.c3d_solver_api.GCE_AddPoint(this.c3d_solver, point);

    this.geoms.push(new HandlerGeomUnit(readyPoint, guCtx => {
        const point = this.getPointXY(guCtx.geomItem, Module['GCE_PROPER_POINT']);

        guCtx.point = {
            x: point.get_x(),
            y: point.get_y(),
        }

        guCtx.type = 'point';
    }));

    return readyPoint;
};

System.prototype.addLineSeg = function (points) {
    let point1 = points[0];
    let point2 = points[1];
    if(this.c3d_solver_api.GCE_GeomType(this.c3d_solver, points[0]) === Module['GCE_CIRCLE']) {
        point1 = this.pointOf(points[0], Module['GCE_CENTRE']);
    }

    if(this.c3d_solver_api.GCE_GeomType(this.c3d_solver, points[1]) === Module['GCE_CIRCLE']) {
        point2 = this.pointOf(points[1], Module['GCE_CENTRE']);
    }

    let readyLineSeg = this.c3d_solver_api.GCE_AddLineSeg(this.c3d_solver, [point1, point2]);

    this.geoms.push(new HandlerGeomUnit(readyLineSeg, guCtx => {
        let point = this.getPointXY(guCtx.geomItem, Module['GCE_FIRST_END']);
        const point1 = {
            x: point.get_x(),
            y: point.get_y(),
        };

        point = this.getPointXY(guCtx.geomItem, Module['GCE_SECOND_END'])
        const point2 = {
            x: point.get_x(),
            y: point.get_y(),
        };


        guCtx.points = [
            point1,
            point2
        ];

        guCtx.type = 'line-seg';
    }));

    return readyLineSeg;
};

System.prototype.addCircle = function ({ x, y }, radius) {

    let center = new GCE_point();
    center.set_x(x); center.set_y(y);

    let circle = new GCE_circle();
    circle.set_centre(center);
    circle.set_radius(radius);

    let readyCircle = this.c3d_solver_api.GCE_AddCircle(this.c3d_solver, circle);

    this.geoms.push(new HandlerGeomUnit(readyCircle, guCtx => {
        const center = this.getPointXY(this.pointOf(guCtx.geomItem, Module['GCE_CENTRE']), Module['GCE_PROPER_POINT']);
        guCtx.radius = this.getCoordValue(guCtx.geomItem, Module['GCE_RADIUS']);

        guCtx.center = {
            x: center.get_x(),
            y: center.get_y(),
        }

        guCtx.type = 'circle';
    }));

    return readyCircle;
};
