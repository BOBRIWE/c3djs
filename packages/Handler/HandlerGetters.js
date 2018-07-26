import { System } from './HandlerSystem';

System.prototype.getPointXY = function (geomItem, pointType) {
    return this.c3d_solver_api.GCE_GetPointXY(this.c3d_solver, geomItem, pointType);
}

System.prototype.getCoordValue = function (geomItem, pointType) {
    return this.c3d_solver_api.GCE_GetCoordValue(this.c3d_solver, geomItem, pointType);
}

System.prototype.pointOf = function (geomItem, pointType) {
    return this.c3d_solver_api.GCE_PointOf(this.c3d_solver, geomItem, pointType);
}
