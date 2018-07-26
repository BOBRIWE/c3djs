import { System } from './HandlerSystem';

function HandlerGeomUnit(geomItem, func) {
    this.geomItem = geomItem;
    this.update = func.bind(System, this);
    func(this);
}

// GeomUnit.prototype.update = function () {
//     const center = this.self.getPointXY(this.self.pointOf(this.id, Module['GCE_CENTRE']), Module['GCE_PROPER_POINT']);
//     this.radius = this.self.getCoordValue(this.id, Module['GCE_RADIUS']);
//
//     this.center = {
//         x: center.get_x(),
//         y: center.get_y(),
//     }
// }

export default HandlerGeomUnit;
