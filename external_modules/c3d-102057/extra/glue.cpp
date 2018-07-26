
#include <emscripten.h>

extern "C" {

// Not using size_t for array indices as the values used by the javascript code are signed.
void array_bounds_check(const int array_size, const int array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    EM_ASM({
      throw 'Array index ' + $0 + ' out of bounds: [0,' + $1 + ')';
    }, array_idx, array_size);
  }
}

// STL
struct std_vector_geom_item
{
  std::vector<geom_item> items;
  std_vector_geom_item( geom_item * arrElems, size_t arrSize )
  : items(arrSize) {
    for ( size_t i=0; i<arrSize; ++i ) {
      this->items[i] = arrElems[i];
    }
  }
  ~std_vector_geom_item() = default;
  std_vector_geom_item( const std_vector_geom_item & ) = default;
  std_vector_geom_item & operator=( const std_vector_geom_item & ) = default;
};

// GCE_vec2d

GCE_vec2d* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vec2d_GCE_vec2d_0() {
  return new GCE_vec2d();
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vec2d_get_x_0(GCE_vec2d* self) {
  return self->x;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vec2d_set_x_1(GCE_vec2d* self, double arg0) {
  self->x = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vec2d_get_y_0(GCE_vec2d* self) {
  return self->y;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vec2d_set_y_1(GCE_vec2d* self, double arg0) {
  self->y = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vec2d___destroy___0(GCE_vec2d* self) {
  delete self;
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// gce_api

gce_api* EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_gce_api_0() {
  return new gce_api();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddPointOnPercent_4(gce_api* self, void* arg0, unsigned int arg1, unsigned int* arg2, double arg3) {
  return self->GCE_AddPointOnPercent(arg0, arg1, arg2, arg3);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddCircle_2(gce_api* self, void* arg0, GCE_circle* arg1) {
  return self->GCE_AddCircle(arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_RemoveConstraint_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_RemoveConstraint(arg0, arg1);
}

void* EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_CreateSystem_0(gce_api* self) {
  return self->GCE_CreateSystem();
}

void* EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_CreateSystem_1(gce_api* self, void* arg0) {
  return self->GCE_CreateSystem(arg0);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_DimensionParameter_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_DimensionParameter(arg0, arg1);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_GetVarValue_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_GetVarValue(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_RemoveSystem_1(gce_api* self, void* arg0) {
  self->GCE_RemoveSystem(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddTangent_3(gce_api* self, void* arg0, unsigned int* arg1, unsigned int* arg2) {
  return self->GCE_AddTangent(arg0, arg1, arg2);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_GetPointDOF_4(gce_api* self, void* arg0, unsigned int arg1, query_geom_type arg2, double arg3) {
  return self->GCE_GetPointDOF(arg0, arg1, arg2, arg3);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddEqualLength_3(gce_api* self, void* arg0, unsigned int arg1, unsigned int arg2) {
  return self->GCE_AddEqualLength(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddAngleBisector_5(gce_api* self, void* arg0, unsigned int arg1, unsigned int arg2, unsigned int arg3, GCE_bisec_variant arg4) {
  return self->GCE_AddAngleBisector(arg0, arg1, arg2, arg3, arg4);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddVariable_2(gce_api* self, void* arg0, double arg1) {
  return self->GCE_AddVariable(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddDistancePLs_3(gce_api* self, void* arg0, unsigned int* arg1, GCE_dim_pars* arg2) {
  return self->GCE_AddDistancePLs(arg0, arg1, *arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddMiddlePoint_2(gce_api* self, void* arg0, unsigned int* arg1) {
  return self->GCE_AddMiddlePoint(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_PointOf_3(gce_api* self, void* arg0, unsigned int arg1, query_geom_type arg2) {
  return self->GCE_PointOf(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddLineSeg_2(gce_api* self, void* arg0, unsigned int* arg1) {
  return self->GCE_AddLineSeg(arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_SetCoordValue_4(gce_api* self, void* arg0, unsigned int arg1, coord_name arg2, double arg3) {
  return self->GCE_SetCoordValue(arg0, arg1, arg2, arg3);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_FixLength_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_FixLength(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddIncidence_3(gce_api* self, void* arg0, unsigned int arg1, unsigned int arg2) {
  return self->GCE_AddIncidence(arg0, arg1, arg2);
}

GCE_result EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_DeviateDimension_3(gce_api* self, void* arg0, unsigned int arg1, double arg2) {
  return self->GCE_DeviateDimension(arg0, arg1, arg2);
}

GCE_vec2d* EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_GetVectorValue_3(gce_api* self, void* arg0, unsigned int arg1, query_geom_type arg2) {
  static GCE_vec2d temp;
  return (temp = self->GCE_GetVectorValue(arg0, arg1, arg2), &temp);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddEqualRadius_3(gce_api* self, void* arg0, unsigned int arg1, unsigned int arg2) {
  return self->GCE_AddEqualRadius(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddColinear3Points_2(gce_api* self, void* arg0, unsigned int* arg1) {
  return self->GCE_AddColinear3Points(arg0, arg1);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_GetCoordValue_3(gce_api* self, void* arg0, unsigned int arg1, coord_name arg2) {
  return self->GCE_GetCoordValue(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddSymmetry_3(gce_api* self, void* arg0, unsigned int* arg1, unsigned int arg2) {
  return self->GCE_AddSymmetry(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddEllipse_2(gce_api* self, void* arg0, GCE_ellipse* arg1) {
  return self->GCE_AddEllipse(arg0, *arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_FixVariable_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_FixVariable(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddAngle_4(gce_api* self, void* arg0, unsigned int arg1, unsigned int arg2, GCE_adim_pars* arg3) {
  return self->GCE_AddAngle(arg0, arg1, arg2, *arg3);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_OK_1(gce_api* self, GCE_result arg0) {
  return self->OK(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddUnaryConstraint_3(gce_api* self, void* arg0, constraint_type arg1, unsigned int arg2) {
  return self->GCE_AddUnaryConstraint(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_FixRadius_3(gce_api* self, void* arg0, unsigned int arg1, coord_name arg2) {
  return self->GCE_FixRadius(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddLine_2(gce_api* self, void* arg0, GCE_line* arg1) {
  return self->GCE_AddLine(arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_SetPointXY_4(gce_api* self, void* arg0, unsigned int arg1, query_geom_type arg2, GCE_point* arg3) {
  return self->GCE_SetPointXY(arg0, arg1, arg2, *arg3);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddDirectedDistance2P_3(gce_api* self, void* arg0, unsigned int* arg1, GCE_ldim_pars* arg2) {
  return self->GCE_AddDirectedDistance2P(arg0, arg1, *arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddDiameter_3(gce_api* self, void* arg0, unsigned int arg1, GCE_dim_pars* arg2) {
  return self->GCE_AddDiameter(arg0, arg1, *arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddDistance_3(gce_api* self, void* arg0, unsigned int* arg1, GCE_ldim_pars* arg2) {
  return self->GCE_AddDistance(arg0, arg1, *arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddAngle4P_4(gce_api* self, void* arg0, unsigned int* arg1, unsigned int* arg2, GCE_adim_pars* arg3) {
  return self->GCE_AddAngle4P(arg0, arg1, arg2, *arg3);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_IsConstrainedGeom_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_IsConstrainedGeom(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddPerpendicular_2(gce_api* self, void* arg0, unsigned int* arg1) {
  return self->GCE_AddPerpendicular(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddAlignPoints_3(gce_api* self, void* arg0, unsigned int* arg1, double arg2) {
  return self->GCE_AddAlignPoints(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_FixGeom_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_FixGeom(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddPoint_2(gce_api* self, void* arg0, GCE_point* arg1) {
  return self->GCE_AddPoint(arg0, *arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddPoint_3(gce_api* self, void* arg0, GCE_point* arg1, int arg2) {
  return self->GCE_AddPoint(arg0, *arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddFixedLength_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_AddFixedLength(arg0, arg1);
}

GCE_result EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_ChangeDrivingDimension_3(gce_api* self, void* arg0, unsigned int arg1, double arg2) {
  return self->GCE_ChangeDrivingDimension(arg0, arg1, arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_SetVarValue_3(gce_api* self, void* arg0, unsigned int arg1, double arg2) {
  return self->GCE_SetVarValue(arg0, arg1, arg2);
}

GCE_result EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_DeviationTest_3(gce_api* self, void* arg0, unsigned int arg1, double arg2) {
  return self->GCE_DeviationTest(arg0, arg1, arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddFixVariable_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_AddFixVariable(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddRadiusDimension_3(gce_api* self, void* arg0, unsigned int arg1, GCE_dim_pars* arg2) {
  return self->GCE_AddRadiusDimension(arg0, arg1, *arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_ClearSystem_1(gce_api* self, void* arg0) {
  self->GCE_ClearSystem(arg0);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddLinearEquation_5(gce_api* self, void* arg0, double* arg1, unsigned int* arg2, unsigned int arg3, double arg4) {
  return self->GCE_AddLinearEquation(arg0, arg1, arg2, arg3, arg4);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddParallel_2(gce_api* self, void* arg0, unsigned int* arg1) {
  return self->GCE_AddParallel(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddPointOnParEllipse_4(gce_api* self, void* arg0, unsigned int arg1, unsigned int arg2, double arg3) {
  return self->GCE_AddPointOnParEllipse(arg0, arg1, arg2, arg3);
}

geom_type EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_GeomType_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_GeomType(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddDirectedDistance_3(gce_api* self, void* arg0, unsigned int* arg1, GCE_ldim_pars* arg2) {
  return self->GCE_AddDirectedDistance(arg0, arg1, *arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddColinear_2(gce_api* self, void* arg0, unsigned int* arg1) {
  return self->GCE_AddColinear(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddPointByMetricPercent_4(gce_api* self, void* arg0, unsigned int arg1, unsigned int* arg2, double arg3) {
  return self->GCE_AddPointByMetricPercent(arg0, arg1, arg2, arg3);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddBoundedCurve_3(gce_api* self, void* arg0, unsigned int arg1, unsigned int* arg2) {
  return self->GCE_AddBoundedCurve(arg0, arg1, arg2);
}

GCE_result EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_Evaluate_1(gce_api* self, void* arg0) {
  return self->GCE_Evaluate(arg0);
}

geom_type EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_BaseCurveType_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_BaseCurveType(arg0, arg1);
}

GCE_point_dof* EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_PointDOF_2(gce_api* self, void* arg0, unsigned int arg1) {
  static GCE_point_dof temp;
  return (temp = self->GCE_PointDOF(arg0, arg1), &temp);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddCoincidence_2(gce_api* self, void* arg0, unsigned int* arg1) {
  return self->GCE_AddCoincidence(arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_RemoveVariable_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_RemoveVariable(arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_IsSatisfied_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_IsSatisfied(arg0, arg1);
}

GCE_result EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_PrepareDraggingPoint_3(gce_api* self, void* arg0, GCE_dragging_point* arg1, GCE_point* arg2) {
  return self->GCE_PrepareDraggingPoint(arg0, *arg1, *arg2);
}

GCE_point* EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_GetPointXY_3(gce_api* self, void* arg0, unsigned int arg1, query_geom_type arg2) {
  static GCE_point temp;
  return (temp = self->GCE_GetPointXY(arg0, arg1, arg2), &temp);
}

GCE_result EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_MovePoint_2(gce_api* self, void* arg0, GCE_point* arg1) {
  return self->GCE_MovePoint(arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_FreezeGeom_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_FreezeGeom(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddFixCurvePoint_3(gce_api* self, void* arg0, unsigned int arg1, unsigned int arg2) {
  return self->GCE_AddFixCurvePoint(arg0, arg1, arg2);
}

GCE_result EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_PrepareMovingOfPoint_4(gce_api* self, void* arg0, unsigned int arg1, query_geom_type arg2, GCE_point* arg3) {
  return self->GCE_PrepareMovingOfPoint(arg0, arg1, arg2, *arg3);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_SetJournal_2(gce_api* self, void* arg0, char* arg1) {
  return self->GCE_SetJournal(arg0, arg1);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_AddDistance2P_3(gce_api* self, void* arg0, unsigned int* arg1, GCE_dim_pars* arg2) {
  return self->GCE_AddDistance2P(arg0, arg1, *arg2);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_RemoveGeom_2(gce_api* self, void* arg0, unsigned int arg1) {
  return self->GCE_RemoveGeom(arg0, arg1);
}

GCE_result EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_PrepareMovingGeoms_3(gce_api* self, void* arg0, std_vector_geom_item* arg1, GCE_point* arg2) {
  return self->GCE_PrepareMovingGeoms(arg0, arg1->items, *arg2);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_NULL_0(gce_api* self) {
  static unsigned int temp;
  return (temp = self->GCE_NULL(), temp);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_NULL_G_0(gce_api* self) {
  static unsigned int temp;
  return (temp = self->GCE_NULL_G(), temp);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_NULL_V_0(gce_api* self) {
  static unsigned int temp;
  return (temp = self->GCE_NULL_V(), temp);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_NULL_C_0(gce_api* self) {
  static unsigned int temp;
  return (temp = self->GCE_NULL_C(), temp);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api_GCE_UNDEFINED_DBL_0(gce_api* self) {
  static double temp;
  return (temp = self->GCE_UNDEFINED_DBL(), temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gce_api___destroy___0(gce_api* self) {
  delete self;
}

// GCE_dim_pars

GCE_dim_pars* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dim_pars_GCE_dim_pars_0() {
  return new GCE_dim_pars();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dim_pars_get_isDriving_0(GCE_dim_pars* self) {
  return self->isDriving;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dim_pars_set_isDriving_1(GCE_dim_pars* self, bool arg0) {
  self->isDriving = arg0;
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dim_pars_get_isInformation_0(GCE_dim_pars* self) {
  return self->isInformation;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dim_pars_set_isInformation_1(GCE_dim_pars* self, bool arg0) {
  self->isInformation = arg0;
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dim_pars_get_var_0(GCE_dim_pars* self) {
  return self->var;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dim_pars_set_var_1(GCE_dim_pars* self, unsigned int arg0) {
  self->var = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dim_pars_get_dimValue_0(GCE_dim_pars* self) {
  return self->dimValue;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dim_pars_set_dimValue_1(GCE_dim_pars* self, double arg0) {
  self->dimValue = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dim_pars___destroy___0(GCE_dim_pars* self) {
  delete self;
}

// std_vector_geom_item

std_vector_geom_item* EMSCRIPTEN_KEEPALIVE emscripten_bind_std_vector_geom_item_std_vector_geom_item_2(unsigned int* arg0, unsigned int arg1) {
  return new std_vector_geom_item(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_std_vector_geom_item___destroy___0(std_vector_geom_item* self) {
  delete self;
}

// c3d_solver_enabler

void EMSCRIPTEN_KEEPALIVE emscripten_bind_c3d_solver_enabler_GCE_EnableSolverModule_4(c3d_solver_enabler* self, char* arg0, int arg1, char* arg2, int arg3) {
  self->GCE_EnableSolverModule(arg0, arg1, arg2, arg3);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_c3d_solver_enabler_GCE_IsMathSolverEnable_0(c3d_solver_enabler* self) {
  return self->GCE_IsMathSolverEnable();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_c3d_solver_enabler_GCE_FreeMathModulesChecker_0(c3d_solver_enabler* self) {
  self->GCE_FreeMathModulesChecker();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_c3d_solver_enabler___destroy___0(c3d_solver_enabler* self) {
  delete self;
}

// GCE_point_dof

GCE_point_dof* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_dof_GCE_point_dof_0() {
  return new GCE_point_dof();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_dof_get_dof_0(GCE_point_dof* self) {
  return self->dof;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_dof_set_dof_1(GCE_point_dof* self, int arg0) {
  self->dof = arg0;
}

GCE_vec2d* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_dof_get_dir_0(GCE_point_dof* self) {
  return &self->dir;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_dof_set_dir_1(GCE_point_dof* self, GCE_vec2d* arg0) {
  self->dir = *arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_dof___destroy___0(GCE_point_dof* self) {
  delete self;
}

// GCE_dragging_point

GCE_dragging_point* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dragging_point_GCE_dragging_point_0() {
  return new GCE_dragging_point();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dragging_point_get_geom_0(GCE_dragging_point* self) {
  return self->geom;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dragging_point_set_geom_1(GCE_dragging_point* self, unsigned int arg0) {
  self->geom = arg0;
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dragging_point_get_point_0(GCE_dragging_point* self) {
  return self->point;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dragging_point_set_point_1(GCE_dragging_point* self, unsigned int arg0) {
  self->point = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_dragging_point___destroy___0(GCE_dragging_point* self) {
  delete self;
}

// GCE_diagnostic_pars

GCE_diagnostic_pars* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_diagnostic_pars_GCE_diagnostic_pars_0() {
  return new GCE_diagnostic_pars();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_diagnostic_pars_get_consCount_0(GCE_diagnostic_pars* self) {
  return self->consCount;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_diagnostic_pars_set_consCount_1(GCE_diagnostic_pars* self, unsigned int arg0) {
  self->consCount = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_diagnostic_pars_get_reductCoef_0(GCE_diagnostic_pars* self) {
  return self->reductCoef;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_diagnostic_pars_set_reductCoef_1(GCE_diagnostic_pars* self, double arg0) {
  self->reductCoef = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_diagnostic_pars___destroy___0(GCE_diagnostic_pars* self) {
  delete self;
}

// GCE_ldim_pars

GCE_ldim_pars* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ldim_pars_GCE_ldim_pars_0() {
  return new GCE_ldim_pars();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ldim_pars_set_hp_1(GCE_ldim_pars* self, unsigned int* arg0) {
  self->hp[0] = arg0[0];
  self->hp[1] = arg0[1];
}

void* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ldim_pars_get_hp_0(GCE_ldim_pars* self) {
  return self->hp;
}

GCE_dim_pars* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ldim_pars_get_dPars_0(GCE_ldim_pars* self) {
  return &self->dPars;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ldim_pars_set_dPars_1(GCE_ldim_pars* self, GCE_dim_pars* arg0) {
  self->dPars = *arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ldim_pars_get_dirAngle_0(GCE_ldim_pars* self) {
  return self->dirAngle;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ldim_pars_set_dirAngle_1(GCE_ldim_pars* self, double arg0) {
  self->dirAngle = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ldim_pars___destroy___0(GCE_ldim_pars* self) {
  delete self;
}

// GCE_adim_pars

GCE_adim_pars* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_adim_pars_GCE_adim_pars_0() {
  return new GCE_adim_pars();
}

GCE_dim_pars* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_adim_pars_get_dPars_0(GCE_adim_pars* self) {
  return &self->dPars;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_adim_pars_set_dPars_1(GCE_adim_pars* self, GCE_dim_pars* arg0) {
  self->dPars = *arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_adim_pars_get_factor_0(GCE_adim_pars* self) {
  return self->factor;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_adim_pars_set_factor_1(GCE_adim_pars* self, double arg0) {
  self->factor = arg0;
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_adim_pars_get_adjacent_0(GCE_adim_pars* self) {
  return self->adjacent;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_adim_pars_set_adjacent_1(GCE_adim_pars* self, bool arg0) {
  self->adjacent = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_adim_pars___destroy___0(GCE_adim_pars* self) {
  delete self;
}

// GCE_line

GCE_line* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_line_GCE_line_0() {
  return new GCE_line();
}

GCE_point* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_line_get_p_0(GCE_line* self) {
  return &self->p;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_line_set_p_1(GCE_line* self, GCE_point* arg0) {
  self->p = *arg0;
}

GCE_vec2d* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_line_get_norm_0(GCE_line* self) {
  return &self->norm;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_line_set_norm_1(GCE_line* self, GCE_vec2d* arg0) {
  self->norm = *arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_line___destroy___0(GCE_line* self) {
  delete self;
}

// GCE_point

GCE_point* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_GCE_point_0() {
  return new GCE_point();
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_get_x_0(GCE_point* self) {
  return self->x;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_set_x_1(GCE_point* self, double arg0) {
  self->x = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_get_y_0(GCE_point* self) {
  return self->y;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point_set_y_1(GCE_point* self, double arg0) {
  self->y = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_point___destroy___0(GCE_point* self) {
  delete self;
}

// GCE_circle

GCE_circle* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_circle_GCE_circle_0() {
  return new GCE_circle();
}

GCE_point* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_circle_get_centre_0(GCE_circle* self) {
  return &self->centre;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_circle_set_centre_1(GCE_circle* self, GCE_point* arg0) {
  self->centre = *arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_circle_get_radius_0(GCE_circle* self) {
  return self->radius;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_circle_set_radius_1(GCE_circle* self, double arg0) {
  self->radius = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_circle___destroy___0(GCE_circle* self) {
  delete self;
}

// geom_point

geom_point* EMSCRIPTEN_KEEPALIVE emscripten_bind_geom_point_geom_point_0() {
  return new geom_point();
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_geom_point_get_geom_0(geom_point* self) {
  return self->geom;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_geom_point_set_geom_1(geom_point* self, unsigned int arg0) {
  self->geom = arg0;
}

query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_bind_geom_point_get_pntName_0(geom_point* self) {
  return self->pntName;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_geom_point_set_pntName_1(geom_point* self, query_geom_type arg0) {
  self->pntName = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_geom_point___destroy___0(geom_point* self) {
  delete self;
}

// GCE_vecNd

GCE_vecNd* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vecNd_GCE_vecNd_0() {
  return new GCE_vecNd();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vecNd_set_arg_1(GCE_vecNd* self, double* arg0) {
  self->arg = arg0;
}

void* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vecNd_get_arg_0(GCE_vecNd* self) {
  return self->arg;
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vecNd_get_size_0(GCE_vecNd* self) {
  return self->size;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vecNd_set_size_1(GCE_vecNd* self, unsigned int arg0) {
  self->size = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_vecNd___destroy___0(GCE_vecNd* self) {
  delete self;
}

// GCE_ellipse

GCE_ellipse* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ellipse_GCE_ellipse_0() {
  return new GCE_ellipse();
}

GCE_point* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ellipse_get_centre_0(GCE_ellipse* self) {
  return &self->centre;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ellipse_set_centre_1(GCE_ellipse* self, GCE_point* arg0) {
  self->centre = *arg0;
}

GCE_vec2d* EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ellipse_get_direct_0(GCE_ellipse* self) {
  return &self->direct;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ellipse_set_direct_1(GCE_ellipse* self, GCE_vec2d* arg0) {
  self->direct = *arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ellipse_get_majorR_0(GCE_ellipse* self) {
  return self->majorR;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ellipse_set_majorR_1(GCE_ellipse* self, double arg0) {
  self->majorR = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ellipse_get_minorR_0(GCE_ellipse* self) {
  return self->minorR;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ellipse_set_minorR_1(GCE_ellipse* self, double arg0) {
  self->minorR = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GCE_ellipse___destroy___0(GCE_ellipse* self) {
  delete self;
}

// coord_name
coord_name EMSCRIPTEN_KEEPALIVE emscripten_enum_coord_name_GCE_X() {
  return GCE_X;
}
coord_name EMSCRIPTEN_KEEPALIVE emscripten_enum_coord_name_GCE_Y() {
  return GCE_Y;
}
coord_name EMSCRIPTEN_KEEPALIVE emscripten_enum_coord_name_GCE_ACRD() {
  return GCE_ACRD;
}
coord_name EMSCRIPTEN_KEEPALIVE emscripten_enum_coord_name_GCE_DCRD() {
  return GCE_DCRD;
}
coord_name EMSCRIPTEN_KEEPALIVE emscripten_enum_coord_name_GCE_RADIUS() {
  return GCE_RADIUS;
}
coord_name EMSCRIPTEN_KEEPALIVE emscripten_enum_coord_name_GCE_MAJOR_RADIUS() {
  return GCE_MAJOR_RADIUS;
}
coord_name EMSCRIPTEN_KEEPALIVE emscripten_enum_coord_name_GCE_MINOR_RADIUS() {
  return GCE_MINOR_RADIUS;
}
coord_name EMSCRIPTEN_KEEPALIVE emscripten_enum_coord_name_GCE_NULL_CRD() {
  return GCE_NULL_CRD;
}

// constraint_type
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_FIX_GEOM() {
  return GCE_FIX_GEOM;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_HORIZONTAL() {
  return GCE_HORIZONTAL;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_VERTICAL() {
  return GCE_VERTICAL;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_LENGTH() {
  return GCE_LENGTH;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_COINCIDENT() {
  return GCE_COINCIDENT;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_EQUAL_LENGTH() {
  return GCE_EQUAL_LENGTH;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_EQUAL_RADIUS() {
  return GCE_EQUAL_RADIUS;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_PARALLEL() {
  return GCE_PARALLEL;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_PERPENDICULAR() {
  return GCE_PERPENDICULAR;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_TANGENT() {
  return GCE_TANGENT;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_COLINEAR() {
  return GCE_COLINEAR;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_ALIGN_2P() {
  return GCE_ALIGN_2P;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_ANGLE_BISECTOR() {
  return GCE_ANGLE_BISECTOR;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_MIDDLE_POINT() {
  return GCE_MIDDLE_POINT;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_COLINEAR_3P() {
  return GCE_COLINEAR_3P;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_SYMMETRIC() {
  return GCE_SYMMETRIC;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_DISTANCE() {
  return GCE_DISTANCE;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_RADIUS_DIM() {
  return GCE_RADIUS_DIM;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_DIAMETER() {
  return GCE_DIAMETER;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_ANGLE() {
  return GCE_ANGLE;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_ANGLE_OX() {
  return GCE_ANGLE_OX;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_CONSTRAINTS_COUNT() {
  return GCE_CONSTRAINTS_COUNT;
}
constraint_type EMSCRIPTEN_KEEPALIVE emscripten_enum_constraint_type_GCE_UNKNOWN_CON() {
  return GCE_UNKNOWN_CON;
}

// GCE_bisec_variant
GCE_bisec_variant EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_bisec_variant_bv_None() {
  return bv_None;
}
GCE_bisec_variant EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_bisec_variant_bv_NormalSum() {
  return bv_NormalSum;
}
GCE_bisec_variant EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_bisec_variant_bv_NormalDiff() {
  return bv_NormalDiff;
}

// GCE_result
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_None() {
  return GCE_RESULT_None;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_Ok() {
  return GCE_RESULT_Ok;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_Satisfied() {
  return GCE_RESULT_Satisfied;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_Not_Satisfied() {
  return GCE_RESULT_Not_Satisfied;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_Overconstrained() {
  return GCE_RESULT_Overconstrained;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_InvalidGeometry() {
  return GCE_RESULT_InvalidGeometry;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_MovingOfFixedGeom() {
  return GCE_RESULT_MovingOfFixedGeom;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_Unregistered() {
  return GCE_RESULT_Unregistered;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_SystemError() {
  return GCE_RESULT_SystemError;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_NullSystem() {
  return GCE_RESULT_NullSystem;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_CircleCantStretched() {
  return GCE_RESULT_CircleCantStretched;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_SingularMatrix() {
  return GCE_RESULT_SingularMatrix;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_DegenerateScalingFactor() {
  return GCE_RESULT_DegenerateScalingFactor;
}
GCE_result EMSCRIPTEN_KEEPALIVE emscripten_enum_GCE_result_GCE_RESULT_InvalidDimensionTransform() {
  return GCE_RESULT_InvalidDimensionTransform;
}

// query_geom_type
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_FIRST_PTYPE() {
  return GCE_FIRST_PTYPE;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_IMPROPER_POINT() {
  return GCE_IMPROPER_POINT;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_FIRST_END() {
  return GCE_FIRST_END;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_SECOND_END() {
  return GCE_SECOND_END;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_CENTRE() {
  return GCE_CENTRE;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_PROPER_POINT() {
  return GCE_PROPER_POINT;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_Q1() {
  return GCE_Q1;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_Q2() {
  return GCE_Q2;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_Q3() {
  return GCE_Q3;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_Q4() {
  return GCE_Q4;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_LAST_PTYPE() {
  return GCE_LAST_PTYPE;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_DIRECTION() {
  return GCE_DIRECTION;
}
query_geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_query_geom_type_GCE_ORIENTATION() {
  return GCE_ORIENTATION;
}

// geom_type
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_ANY_GEOM() {
  return GCE_ANY_GEOM;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_POINT() {
  return GCE_POINT;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_LINE() {
  return GCE_LINE;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_CIRCLE() {
  return GCE_CIRCLE;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_ELLIPSE() {
  return GCE_ELLIPSE;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_SPLINE() {
  return GCE_SPLINE;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_PARAMETRIC_CURVE() {
  return GCE_PARAMETRIC_CURVE;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_BOUNDED_CURVE() {
  return GCE_BOUNDED_CURVE;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_LINE_SEGMENT() {
  return GCE_LINE_SEGMENT;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_ARC() {
  return GCE_ARC;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_ELLIPSE_ARC() {
  return GCE_ELLIPSE_ARC;
}
geom_type EMSCRIPTEN_KEEPALIVE emscripten_enum_geom_type_GCE_SET() {
  return GCE_SET;
}

}
