var c3dlib = require('./c3d.js');

console.log("Solver status: " + c3dlib.c3d_solver_enabler.prototype.GCE_IsMathSolverEnable());
name = 'C3DSolverJS2017.2017022120171231.[slv]';
key = 'kSGkdkmXzJXrZ8DI9m39RfsRfO1j/hsIKS4i8S834izjV9L49qSvAaKYEzabH7PhHU3rODWSgmIEVnHnzGvkPQ==';
c3dlib.c3d_solver_enabler.prototype.GCE_EnableSolverModule(name, name.length, key, key.length);
console.log("Solver status: " + c3dlib.c3d_solver_enabler.prototype.GCE_IsMathSolverEnable());

var c3d_solver_api = new c3dlib.gce_api()
var c3d_solver = c3d_solver_api.GCE_CreateSystem();
filename = 'qq.jrn';
c3d_solver_api.GCE_SetJournal(c3d_solver, filename);

// Create line segment 1
var lseg_point = new c3dlib.GCE_point();
lseg_point.set_x(0.); lseg_point.set_y(0.);
var lsegp1 = c3d_solver_api.GCE_AddPoint(c3d_solver, lseg_point);
lseg_point.set_x(1.); lseg_point.set_y(0.);
var lsegp2 = c3d_solver_api.GCE_AddPoint(c3d_solver, lseg_point);
var lseg_points = [lsegp1, lsegp2];
var lseg1_geom = c3d_solver_api.GCE_AddLineSeg(c3d_solver, lseg_points);

// Create line segment 2
var lseg_point = new c3dlib.GCE_point();
lseg_point.set_x(0.); lseg_point.set_y(0.);
lsegp1 = c3d_solver_api.GCE_AddPoint(c3d_solver, lseg_point);
lseg_point.set_x(-2.); lseg_point.set_y(1.);
lsegp2 = c3d_solver_api.GCE_AddPoint(c3d_solver, lseg_point);
lseg_points = [lsegp1, lsegp2];
var lseg2_geom = c3d_solver_api.GCE_AddLineSeg(c3d_solver, lseg_points);

// Add constraints
var geoms = [lseg1_geom, lseg2_geom];
var constr = c3d_solver_api.GCE_AddPerpendicular(c3d_solver, geoms);

console.log("Geoms: " + geoms);
console.log("Solve system: " + c3d_solver_api.GCE_Evaluate(c3d_solver));
console.log("Check perpendicularity satisfaction: " + c3d_solver_api.GCE_IsSatisfied(c3d_solver, constr));

var beg = new c3dlib.GCE_point();
var end = new c3dlib.GCE_point();
lseg_point = c3d_solver_api.GCE_GetPointXY(c3d_solver, geoms[0], c3dlib.GCE_FIRST_END);
beg.set_x( lseg_point.get_x() ); beg.set_y( lseg_point.get_y() );
lseg_point = c3d_solver_api.GCE_GetPointXY(c3d_solver, geoms[0], c3dlib.GCE_SECOND_END);
end.set_x( lseg_point.get_x() ); end.set_y( lseg_point.get_y() );
console.log("Line segment 1 coords: (" + beg.get_x() + ", " + beg.get_y() + "), (" + end.get_x() + ", " + end.get_y() + ").");

lseg_point = c3d_solver_api.GCE_GetPointXY(c3d_solver, geoms[1], c3dlib.GCE_FIRST_END);
beg.set_x( lseg_point.get_x() ); beg.set_y( lseg_point.get_y() );
lseg_point = c3d_solver_api.GCE_GetPointXY(c3d_solver, geoms[1], c3dlib.GCE_SECOND_END);
end.set_x( lseg_point.get_x() ); end.set_y( lseg_point.get_y() );
console.log("Line segment 2 coords: (" + beg.get_x() + ", " + beg.get_y() + "), (" + end.get_x() + ", " + end.get_y() + ").");

// Dragging
var drg_geoms = new c3dlib.std_vector_geom_item(geoms, geoms.length);
var cursor = new c3dlib.GCE_point();
var result = c3d_solver_api.GCE_PrepareMovingGeoms(c3d_solver, drg_geoms, cursor);
console.log("Result of preparing: " + result);
cursor.set_x(1.); cursor.set_y(2.);
c3d_solver_api.GCE_MovePoint(c3d_solver, cursor);
console.log("Result of moving: " + result);

lseg_point = c3d_solver_api.GCE_GetPointXY(c3d_solver, geoms[0], c3dlib.GCE_FIRST_END);
beg.set_x( lseg_point.get_x() ); beg.set_y( lseg_point.get_y() );
lseg_point = c3d_solver_api.GCE_GetPointXY(c3d_solver, geoms[0], c3dlib.GCE_SECOND_END);
end.set_x( lseg_point.get_x() ); end.set_y( lseg_point.get_y() );
console.log("Line segment 1 coords: (" + beg.get_x() + ", " + beg.get_y() + "), (" + end.get_x() + ", " + end.get_y() + ").");

lseg_point = c3d_solver_api.GCE_GetPointXY(c3d_solver, geoms[1], c3dlib.GCE_FIRST_END);
beg.set_x( lseg_point.get_x() ); beg.set_y( lseg_point.get_y() );
lseg_point = c3d_solver_api.GCE_GetPointXY(c3d_solver, geoms[1], c3dlib.GCE_SECOND_END);
end.set_x( lseg_point.get_x() ); end.set_y( lseg_point.get_y() );
console.log("Line segment 2 coords: (" + beg.get_x() + ", " + beg.get_y() + "), (" + end.get_x() + ", " + end.get_y() + ").");

c3d_solver_api.GCE_RemoveSystem(c3d_solver);
