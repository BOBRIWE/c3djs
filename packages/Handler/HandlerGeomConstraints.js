import { System } from './HandlerSystem';

System.prototype.addTangent = function (geomItems, pars) {

    return this.c3d_solver_api.GCE_AddTangent(this.c3d_solver, geomItems, pars);
}

System.prototype.addParallel = function (geomItems) {
    return this.c3d_solver_api.GCE_AddParallel(this.c3d_solver, geomItems);
}

System.prototype.addPerpendicular = function (geomItems) {
    return this.c3d_solver_api.GCE_AddPerpendicular(this.c3d_solver, geomItems);
}

System.prototype.addEqualLength = function (geomItems) {
    return this.c3d_solver_api.GCE_AddEqualLength(this.c3d_solver, ...geomItems);
}

System.prototype.addEqualRadius = function (geomItems) {
    return this.c3d_solver_api.GCE_AddEqualRadius(this.c3d_solver, ...geomItems);
}

System.prototype.addHorizontal = function (geomItem) {
    return this.c3d_solver_api.GCE_AddUnaryConstraint(this.c3d_solver, Module['GCE_HORIZONTAL'], geomItem);
}

System.prototype.addVertical = function (geomItem) {
    return this.c3d_solver_api.GCE_AddUnaryConstraint(this.c3d_solver, Module['GCE_VERTICAL'], geomItem);
}

System.prototype.evaluate = function () {
    const result = this.c3d_solver_api.GCE_Evaluate(this.c3d_solver);

    this.geoms.forEach(geomItem => {
        geomItem.update();
    });

    return result;
}

System.prototype.isSatisfied = function (constraintItem) {
    return this.c3d_solver_api.GCE_IsSatisfied(this.c3d_solver, constraintItem);
}

System.prototype.freezeGeom = function (geomItem) {
    if(this.c3d_solver_api.GCE_GeomType(this.c3d_solver, geomItem) === Module['GCE_CENTRE']) {
        geomItem = this.pointOf(geomItem, Module['GCE_CENTRE']);
    }
    return this.c3d_solver_api.GCE_FreezeGeom(this.c3d_solver, geomItem);
}


System.prototype.addMiddlePoint = function ([geomPoint1, geomPoint2, geomPointMiddle]) {
    // let geomPointMiddle = this.addPoint({
    //     x: 0,
    //     y: 0,
    // });
    if(this.c3d_solver_api.GCE_GeomType(this.c3d_solver, geomPoint1) === Module['GCE_CIRCLE']) {
        geomPoint1 = this.pointOf(geomPoint1, Module['GCE_CENTRE']);
    }
    if(this.c3d_solver_api.GCE_GeomType(this.c3d_solver, geomPoint2) === Module['GCE_CIRCLE']) {
        geomPoint2 = this.pointOf(geomPoint2, Module['GCE_CENTRE']);
    }
    if(this.c3d_solver_api.GCE_GeomType(this.c3d_solver, geomPointMiddle) === Module['GCE_CIRCLE']) {
        geomPointMiddle = this.pointOf(geomPointMiddle, Module['GCE_CENTRE']);
    }


    let constraintItem = this.c3d_solver_api.GCE_AddMiddlePoint(this.c3d_solver, [
        geomPoint1,
        geomPoint2,
        geomPointMiddle
    ]);

    return { geomPointMiddle, constraintItem };
}

System.prototype.dragPoint = function (geomItem, { x, y }) {
    let pointType = Module['GCE_PROPER_POINT'];
    let point = new GCE_point();
    point.set_x(x);
    point.set_y(y);

    if(this.c3d_solver_api.GCE_GeomType(this.c3d_solver, geomItem) === Module['GCE_CIRCLE']) {
        pointType = Module['GCE_CENTRE'];
    }

    return this.c3d_solver_api.GCE_SetPointXY(
        this.c3d_solver,
        geomItem,
        pointType,
        point
    );
}

System.prototype.dragGeoms = function (geomItems, prevPos, { x, y }) {
    let drgGeoms = new std_vector_geom_item(geomItems, geomItems.length);

    let point = new GCE_point();

    console.log(this.c3d_solver_api.GCE_PrepareMovingGeoms(this.c3d_solver, drgGeoms, point));

    point.set_x(x-prevPos.x);
    point.set_y(-(y-prevPos.y));

    return this.c3d_solver_api.GCE_MovePoint(this.c3d_solver, point);
}

System.prototype.draggingPoint  = function () {
    // let drgGeoms = new std_vector_geom_item(geomItems, geomItems.length);
    // GCE_PrepareDraggingPoint
}
