var c3dlib = require('./c3d.js');

console.log("Solver status: " + c3dlib.c3d_solver_enabler.prototype.GCE_IsMathSolverEnable());
name = 'C3DSolverJS2017.2017022120171231.[slv]';
key = 'kSGkdkmXzJXrZ8DI9m39RfsRfO1j/hsIKS4i8S834izjV9L49qSvAaKYEzabH7PhHU3rODWSgmIEVnHnzGvkPQ==';
c3dlib.c3d_solver_enabler.prototype.GCE_EnableSolverModule(name, name.length, key, key.length);
console.log("Solver status: " + c3dlib.c3d_solver_enabler.prototype.GCE_IsMathSolverEnable());

// Example of operations with the C3D Solver data structs.

// Point.
var point = new c3dlib.GCE_point();
point.set_x(10.);
point.set_y(5.);
console.log('Point coords is (' + point.get_x() + ', ' + point.get_y() + ')');

// Vector.
var vector = new c3dlib.GCE_vec2d();
vector.set_x(point.get_x() - 1.5);
vector.set_y(point.get_y() - 2);
console.log('Vector coords is (' + vector.get_x() + ', ' + vector.get_y() + ')');

var c3d_solver_api = new c3dlib.gce_api()  // api functions
var c3d_solver = c3d_solver_api.GCE_CreateSystem();  // to create C3D Solver system

// How to add point into C3D Solver.
var pnt = c3d_solver_api.GCE_AddPoint(c3d_solver, point);
console.log("Registered point id: " + pnt);
// How to extract point coordinates from C3D Solver.
var tmp = c3d_solver_api.GCE_GetPointXY(c3d_solver, pnt, c3dlib.GCE_PROPER_POINT);
console.log('Point coords is (' + tmp.get_x() + ', ' + tmp.get_y() + ')');


// Example of solving the system of linear equations.

// Array of variables.
var x = [];
x.push(c3d_solver_api.GCE_AddVariable(c3d_solver, 0.));
x.push(c3d_solver_api.GCE_AddVariable(c3d_solver, 0.));
x.push(c3d_solver_api.GCE_AddVariable(c3d_solver, 0.));

// Adding of equations.
var a1 = [1., 1., 1.];
var equ1 = c3d_solver_api.GCE_AddLinearEquation(c3d_solver, a1, x, 3, -6.5);  // x1 + x2 + x3 - 6.5 = 0
var a2 = [1., 2., 3.];
var equ2 = c3d_solver_api.GCE_AddLinearEquation(c3d_solver, a2, x, 3, -15.);  // x1 + 2*x2 + 3*x3 - 15. = 0
var a3 = [2., 2., -1.];
var equ3 = c3d_solver_api.GCE_AddLinearEquation(c3d_solver, a3, x, 3, -4.);  // 2*x1 + 2*x2 - x3 - 4. = 0

// Check that equations are not satisfied.
console.log("Array of x ids: " + x[0] + ', ' + x[1] + ', ' + x[2] + '.');
console.log("Equations: " + equ1 + ", " + equ2 + ", " + equ3 + ".");
console.log("Equations satisfaction: " + c3d_solver_api.GCE_IsSatisfied(c3d_solver, equ1) + ", " +
                                         c3d_solver_api.GCE_IsSatisfied(c3d_solver, equ2) + ", " +
                                         c3d_solver_api.GCE_IsSatisfied(c3d_solver, equ3) + ".");

// Solve system and check that equation are satisfied.
console.log("Solve system: " + c3d_solver_api.GCE_Evaluate(c3d_solver));
console.log("Equations satisfaction: " + c3d_solver_api.GCE_IsSatisfied(c3d_solver, equ1) + ", " +
                                         c3d_solver_api.GCE_IsSatisfied(c3d_solver, equ2) + ", " +
                                         c3d_solver_api.GCE_IsSatisfied(c3d_solver, equ3) + ".");

console.log("Variable values after evaluation: " + c3d_solver_api.GCE_GetVarValue(c3d_solver, x[0]).toPrecision(3) + ", "
                                                 + c3d_solver_api.GCE_GetVarValue(c3d_solver, x[1]).toPrecision(3) + ", "
                                                 + c3d_solver_api.GCE_GetVarValue(c3d_solver, x[2]).toPrecision(3) + ".");

// Remove system.

c3d_solver_api.GCE_RemoveSystem(c3d_solver);

console.log("GCE_NULL = " + c3d_solver_api.GCE_NULL());
console.log("GCE_NULL_C = " + c3d_solver_api.GCE_NULL_C());
console.log("GCE_NULL_V = " + c3d_solver_api.GCE_NULL_V());
console.log("GCE_NULL_G = " + c3d_solver_api.GCE_NULL_G());
console.log("GCE_UNDEFINED_DBL = " + c3d_solver_api.GCE_UNDEFINED_DBL());

// vecNd test

var vec = new c3dlib.GCE_ldim_pars();
console.log("hp = " + vec.get_hp());
vec.set_hp([1., 2.]);
console.log("new hp = " + vec.get_hp());
var a1 = [4., 5.];
vec.set_hp(a1);
console.log("updated hp = " + vec.get_hp());

var vec = new c3dlib.GCE_vecNd();
var a1 = [3., 5., 7.];
vec.set_size(a1.length);
vec.set_arg(a1);
console.log("size = " + vec.get_size());
console.log("arg = " + vec.get_arg());

c3dlib.c3d_solver_enabler.prototype.GCE_FreeMathModulesChecker();
