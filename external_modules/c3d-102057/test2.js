var c3dlib = require('./c3d.js');

console.log("Solver status: " + c3dlib.c3d_solver_enabler.prototype.GCE_IsMathSolverEnable());
name = 'C3DSolverJS2017.2017022120171231.[slv]';
key = 'kSGkdkmXzJXrZ8DI9m39RfsRfO1j/hsIKS4i8S834izjV9L49qSvAaKYEzabH7PhHU3rODWSgmIEVnHnzGvkPQ==';
c3dlib.c3d_solver_enabler.prototype.GCE_EnableSolverModule(name, name.length, key, key.length);
console.log("Solver status: " + c3dlib.c3d_solver_enabler.prototype.GCE_IsMathSolverEnable());

var c3d_solver_api = new c3dlib.gce_api()
var c3d_solver = c3d_solver_api.GCE_CreateSystem();

// Create line
var line_point = new c3dlib.GCE_point();
line_point.set_x(1.); line_point.set_y(2.5);
var line_norm = new c3dlib.GCE_vec2d();
line_norm.set_x(1.); line_norm.set_y(0.);

var line = new c3dlib.GCE_line();
line.set_p(line_point); line.set_norm(line_norm);
var line_geom = c3d_solver_api.GCE_AddLine(c3d_solver, line);

// Create circles
var circle_center = new c3dlib.GCE_point();
circle_center.set_x(-2.1); circle_center.set_y(-3.3);

var circle = new c3dlib.GCE_circle();
circle.set_centre(circle_center); circle.set_radius(1.2);
var circle1_geom = c3d_solver_api.GCE_AddCircle(c3d_solver, circle);

var circle2 = new c3dlib.GCE_circle();
circle2.set_centre(circle_center); circle2.set_radius(3.5);
var circle2_geom = c3d_solver_api.GCE_AddCircle(c3d_solver, circle2);

// Create tangent of line with the circle1
var geoms = [line_geom, circle1_geom];
var pars = [-1, -1];
var tangent = c3d_solver_api.GCE_AddTangent(c3d_solver, geoms, pars);
// Fix circle 2
var fix_crcl2 = c3d_solver_api.GCE_FixGeom(c3d_solver, circle2_geom);
// Make radius of circl1 equal to radius of circle2.
var equal_rads = c3d_solver_api.GCE_AddEqualRadius(c3d_solver, circle1_geom, circle2_geom);

console.log('IDs of geom objects: ' + line_geom + ', ' + circle1_geom + ', ' + circle2_geom + '.');
console.log('IDs of constraints: ' + tangent + ', ' + fix_crcl2 + ', ' + equal_rads + '.');
console.log("Check tangent satisfaction: " + c3d_solver_api.GCE_IsSatisfied(c3d_solver, tangent));
console.log("Check radii equality: " + c3d_solver_api.GCE_IsSatisfied(c3d_solver, equal_rads));
console.log("Solve system: " + c3d_solver_api.GCE_Evaluate(c3d_solver));
console.log("Check tangent satisfaction: " + c3d_solver_api.GCE_IsSatisfied(c3d_solver, tangent));
console.log("Check radii equality: " + c3d_solver_api.GCE_IsSatisfied(c3d_solver, equal_rads));

// Get new values of the radii.
var new_rad1 = c3d_solver_api.GCE_GetCoordValue(c3d_solver, circle1_geom, c3dlib.GCE_RADIUS);
var new_rad2 = c3d_solver_api.GCE_GetCoordValue(c3d_solver, circle2_geom, c3dlib.GCE_RADIUS);
console.log("new radius1 = " + new_rad1 + ', new radius2 = ' + new_rad2);

// Get new circles coordinates.
var tmp = c3d_solver_api.GCE_GetPointXY(c3d_solver, circle1_geom, c3dlib.GCE_CENTRE);
console.log('Old coords of circle1: (' + circle.get_centre().get_x() + ', ' +
            circle.get_centre().get_y() + ') with radius: ' + circle.get_radius());
console.log('New coords of circle1: (' + tmp.get_x() + ', ' + tmp.get_y() + ') with radius: ' + new_rad1);
tmp = c3d_solver_api.GCE_GetPointXY(c3d_solver, circle2_geom, c3dlib.GCE_CENTRE);
console.log('Old coords of circle2: (' + circle2.get_centre().get_x() + ', ' +
            circle2.get_centre().get_y() + ') with radius: ' + circle2.get_radius());
console.log('New coords of circle2: (' + tmp.get_x() + ', ' + tmp.get_y() + ') with radius: ' + new_rad2);

// Get line coordinates.
tmp = c3d_solver_api.GCE_GetCoordValue(c3d_solver, line_geom, c3dlib.GCE_ACRD);
line_norm.set_x(Math.cos(tmp));
line_norm.set_y(Math.sin(tmp));
tmp = c3d_solver_api.GCE_GetCoordValue(c3d_solver, line_geom, c3dlib.GCE_DCRD);
line_point.set_x(tmp*line_norm.get_x());
line_point.set_y(tmp*line_norm.get_y());
console.log('Coords of line normal: (' + line_norm.get_x().toPrecision(3) + ', ' +
                                         line_norm.get_y().toPrecision(3) + ')');
console.log('Coords of line point: (' + line_point.get_x().toPrecision(3) + ', ' +
                                        line_point.get_y().toPrecision(3) + ')');

c3d_solver_api.GCE_RemoveSystem(c3d_solver);
