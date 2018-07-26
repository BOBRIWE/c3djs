
// Bindings utilities

function WrapperObject() {
}
WrapperObject.prototype = Object.create(WrapperObject.prototype);
WrapperObject.prototype.constructor = WrapperObject;
WrapperObject.prototype.__class__ = WrapperObject;
WrapperObject.__cache__ = {};
Module['WrapperObject'] = WrapperObject;

function getCache(__class__) {
  return (__class__ || WrapperObject).__cache__;
}
Module['getCache'] = getCache;

function wrapPointer(ptr, __class__) {
  var cache = getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  delete getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

// Converts big (string or array) values into a C-style storage, in temporary space

var ensureCache = {
  buffer: 0,  // the main buffer of temporary storage
  size: 0,   // the size of buffer
  pos: 0,    // the next free offset in buffer
  temps: [], // extra allocations
  needed: 0, // the total size we need next time

  prepare: function() {
    if (ensureCache.needed) {
      // clear the temps
      for (var i = 0; i < ensureCache.temps.length; i++) {
        Module['_free'](ensureCache.temps[i]);
      }
      ensureCache.temps.length = 0;
      // prepare to allocate a bigger buffer
      Module['_free'](ensureCache.buffer);
      ensureCache.buffer = 0;
      ensureCache.size += ensureCache.needed;
      // clean up
      ensureCache.needed = 0;
    }
    if (!ensureCache.buffer) { // happens first time, or when we need to grow
      ensureCache.size += 128; // heuristic, avoid many small grow events
      ensureCache.buffer = Module['_malloc'](ensureCache.size);
      assert(ensureCache.buffer);
    }
    ensureCache.pos = 0;
  },
  alloc: function(array, view) {
    assert(ensureCache.buffer);
    var bytes = view.BYTES_PER_ELEMENT;
    var len = array.length * bytes;
    len = (len + 7) & -8; // keep things aligned to 8 byte boundaries
    var ret;
    if (ensureCache.pos + len >= ensureCache.size) {
      // we failed to allocate in the buffer, ensureCache time around :(
      assert(len > 0); // null terminator, at least
      ensureCache.needed += len;
      ret = Module['_malloc'](len);
      ensureCache.temps.push(ret);
    } else {
      // we can allocate in the buffer
      ret = ensureCache.buffer + ensureCache.pos;
      ensureCache.pos += len;
    }
    return ret;
  },
  copy: function(array, view, offset) {
    var offsetShifted = offset;
    var bytes = view.BYTES_PER_ELEMENT;
    switch (bytes) {
      case 2: offsetShifted >>= 1; break;
      case 4: offsetShifted >>= 2; break;
      case 8: offsetShifted >>= 3; break;
    }
    for (var i = 0; i < array.length; i++) {
      view[offsetShifted + i] = array[i];
    }
  },
};

function ensureString(value) {
  if (typeof value === 'string') {
    var intArray = intArrayFromString(value);
    var offset = ensureCache.alloc(intArray, HEAP8);
    ensureCache.copy(intArray, HEAP8, offset);
    return offset;
  }
  return value;
}
function ensureInt8(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP8);
    ensureCache.copy(value, HEAP8, offset);
    return offset;
  }
  return value;
}
function ensureInt16(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP16);
    ensureCache.copy(value, HEAP16, offset);
    return offset;
  }
  return value;
}
function ensureInt32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP32);
    ensureCache.copy(value, HEAP32, offset);
    return offset;
  }
  return value;
}
function ensureFloat32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF32);
    ensureCache.copy(value, HEAPF32, offset);
    return offset;
  }
  return value;
}
function ensureFloat64(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF64);
    ensureCache.copy(value, HEAPF64, offset);
    return offset;
  }
  return value;
}


// GCE_vec2d
function GCE_vec2d() {
  this.ptr = _emscripten_bind_GCE_vec2d_GCE_vec2d_0();
  getCache(GCE_vec2d)[this.ptr] = this;
};;
GCE_vec2d.prototype = Object.create(WrapperObject.prototype);
GCE_vec2d.prototype.constructor = GCE_vec2d;
GCE_vec2d.prototype.__class__ = GCE_vec2d;
GCE_vec2d.__cache__ = {};
Module['GCE_vec2d'] = GCE_vec2d;

  GCE_vec2d.prototype['get_x'] = GCE_vec2d.prototype.get_x = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_vec2d_get_x_0(self);
};
    GCE_vec2d.prototype['set_x'] = GCE_vec2d.prototype.set_x = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_vec2d_set_x_1(self, arg0);
};
  GCE_vec2d.prototype['get_y'] = GCE_vec2d.prototype.get_y = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_vec2d_get_y_0(self);
};
    GCE_vec2d.prototype['set_y'] = GCE_vec2d.prototype.set_y = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_vec2d_set_y_1(self, arg0);
};
  GCE_vec2d.prototype['__destroy__'] = GCE_vec2d.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_vec2d___destroy___0(self);
};
// VoidPtr
function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = VoidPtr.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};
// gce_api
function gce_api() {
  this.ptr = _emscripten_bind_gce_api_gce_api_0();
  getCache(gce_api)[this.ptr] = this;
};;
gce_api.prototype = Object.create(WrapperObject.prototype);
gce_api.prototype.constructor = gce_api;
gce_api.prototype.__class__ = gce_api;
gce_api.__cache__ = {};
Module['gce_api'] = gce_api;

gce_api.prototype['GCE_AddPointOnPercent'] = gce_api.prototype.GCE_AddPointOnPercent = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (typeof arg2 == 'object') { arg2 = ensureInt32(arg2); }
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return _emscripten_bind_gce_api_GCE_AddPointOnPercent_4(self, arg0, arg1, arg2, arg3);
};;

gce_api.prototype['GCE_AddCircle'] = gce_api.prototype.GCE_AddCircle = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_AddCircle_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_RemoveConstraint'] = gce_api.prototype.GCE_RemoveConstraint = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return !!(_emscripten_bind_gce_api_GCE_RemoveConstraint_2(self, arg0, arg1));
};;

gce_api.prototype['GCE_CreateSystem'] = gce_api.prototype.GCE_CreateSystem = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg0 === undefined) { return wrapPointer(_emscripten_bind_gce_api_GCE_CreateSystem_0(self), VoidPtr) }
  return wrapPointer(_emscripten_bind_gce_api_GCE_CreateSystem_1(self, arg0), VoidPtr);
};;

gce_api.prototype['GCE_DimensionParameter'] = gce_api.prototype.GCE_DimensionParameter = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_DimensionParameter_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_GetVarValue'] = gce_api.prototype.GCE_GetVarValue = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_GetVarValue_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_RemoveSystem'] = gce_api.prototype.GCE_RemoveSystem = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_gce_api_GCE_RemoveSystem_1(self, arg0);
};;

gce_api.prototype['GCE_AddTangent'] = gce_api.prototype.GCE_AddTangent = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  if (typeof arg2 == 'object') { arg2 = ensureInt32(arg2); }
  return _emscripten_bind_gce_api_GCE_AddTangent_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_GetPointDOF'] = gce_api.prototype.GCE_GetPointDOF = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return _emscripten_bind_gce_api_GCE_GetPointDOF_4(self, arg0, arg1, arg2, arg3);
};;

gce_api.prototype['GCE_AddEqualLength'] = gce_api.prototype.GCE_AddEqualLength = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddEqualLength_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddAngleBisector'] = gce_api.prototype.GCE_AddAngleBisector = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return _emscripten_bind_gce_api_GCE_AddAngleBisector_5(self, arg0, arg1, arg2, arg3, arg4);
};;

gce_api.prototype['GCE_AddVariable'] = gce_api.prototype.GCE_AddVariable = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_AddVariable_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_AddDistancePLs'] = gce_api.prototype.GCE_AddDistancePLs = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddDistancePLs_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddMiddlePoint'] = gce_api.prototype.GCE_AddMiddlePoint = function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  return _emscripten_bind_gce_api_GCE_AddMiddlePoint_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_PointOf'] = gce_api.prototype.GCE_PointOf = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_PointOf_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddLineSeg'] = gce_api.prototype.GCE_AddLineSeg = function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  return _emscripten_bind_gce_api_GCE_AddLineSeg_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_SetCoordValue'] = gce_api.prototype.GCE_SetCoordValue = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return !!(_emscripten_bind_gce_api_GCE_SetCoordValue_4(self, arg0, arg1, arg2, arg3));
};;

gce_api.prototype['GCE_FixLength'] = gce_api.prototype.GCE_FixLength = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_FixLength_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_AddIncidence'] = gce_api.prototype.GCE_AddIncidence = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddIncidence_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_DeviateDimension'] = gce_api.prototype.GCE_DeviateDimension = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_DeviateDimension_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_GetVectorValue'] = gce_api.prototype.GCE_GetVectorValue = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_gce_api_GCE_GetVectorValue_3(self, arg0, arg1, arg2), GCE_vec2d);
};;

gce_api.prototype['GCE_AddEqualRadius'] = gce_api.prototype.GCE_AddEqualRadius = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddEqualRadius_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddColinear3Points'] = gce_api.prototype.GCE_AddColinear3Points = function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  return _emscripten_bind_gce_api_GCE_AddColinear3Points_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_GetCoordValue'] = gce_api.prototype.GCE_GetCoordValue = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_GetCoordValue_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddSymmetry'] = gce_api.prototype.GCE_AddSymmetry = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddSymmetry_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddEllipse'] = gce_api.prototype.GCE_AddEllipse = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_AddEllipse_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_FixVariable'] = gce_api.prototype.GCE_FixVariable = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_FixVariable_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_AddAngle'] = gce_api.prototype.GCE_AddAngle = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return _emscripten_bind_gce_api_GCE_AddAngle_4(self, arg0, arg1, arg2, arg3);
};;

gce_api.prototype['OK'] = gce_api.prototype.OK = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return !!(_emscripten_bind_gce_api_OK_1(self, arg0));
};;

gce_api.prototype['GCE_AddUnaryConstraint'] = gce_api.prototype.GCE_AddUnaryConstraint = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddUnaryConstraint_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_FixRadius'] = gce_api.prototype.GCE_FixRadius = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_FixRadius_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddLine'] = gce_api.prototype.GCE_AddLine = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_AddLine_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_SetPointXY'] = gce_api.prototype.GCE_SetPointXY = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return !!(_emscripten_bind_gce_api_GCE_SetPointXY_4(self, arg0, arg1, arg2, arg3));
};;

gce_api.prototype['GCE_AddDirectedDistance2P'] = gce_api.prototype.GCE_AddDirectedDistance2P = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddDirectedDistance2P_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddDiameter'] = gce_api.prototype.GCE_AddDiameter = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddDiameter_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddDistance'] = gce_api.prototype.GCE_AddDistance = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddDistance_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddAngle4P'] = gce_api.prototype.GCE_AddAngle4P = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  if (typeof arg2 == 'object') { arg2 = ensureInt32(arg2); }
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return _emscripten_bind_gce_api_GCE_AddAngle4P_4(self, arg0, arg1, arg2, arg3);
};;

gce_api.prototype['GCE_IsConstrainedGeom'] = gce_api.prototype.GCE_IsConstrainedGeom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return !!(_emscripten_bind_gce_api_GCE_IsConstrainedGeom_2(self, arg0, arg1));
};;

gce_api.prototype['GCE_AddPerpendicular'] = gce_api.prototype.GCE_AddPerpendicular = function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  return _emscripten_bind_gce_api_GCE_AddPerpendicular_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_AddAlignPoints'] = gce_api.prototype.GCE_AddAlignPoints = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddAlignPoints_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_FixGeom'] = gce_api.prototype.GCE_FixGeom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_FixGeom_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_AddPoint'] = gce_api.prototype.GCE_AddPoint = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg2 === undefined) { return _emscripten_bind_gce_api_GCE_AddPoint_2(self, arg0, arg1) }
  return _emscripten_bind_gce_api_GCE_AddPoint_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddFixedLength'] = gce_api.prototype.GCE_AddFixedLength = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_AddFixedLength_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_ChangeDrivingDimension'] = gce_api.prototype.GCE_ChangeDrivingDimension = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_ChangeDrivingDimension_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_SetVarValue'] = gce_api.prototype.GCE_SetVarValue = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return !!(_emscripten_bind_gce_api_GCE_SetVarValue_3(self, arg0, arg1, arg2));
};;

gce_api.prototype['GCE_DeviationTest'] = gce_api.prototype.GCE_DeviationTest = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_DeviationTest_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddFixVariable'] = gce_api.prototype.GCE_AddFixVariable = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_AddFixVariable_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_AddRadiusDimension'] = gce_api.prototype.GCE_AddRadiusDimension = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddRadiusDimension_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_ClearSystem'] = gce_api.prototype.GCE_ClearSystem = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_gce_api_GCE_ClearSystem_1(self, arg0);
};;

gce_api.prototype['GCE_AddLinearEquation'] = gce_api.prototype.GCE_AddLinearEquation = function(arg0, arg1, arg2, arg3, arg4) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureFloat64(arg1); }
  if (typeof arg2 == 'object') { arg2 = ensureInt32(arg2); }
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg4 && typeof arg4 === 'object') arg4 = arg4.ptr;
  return _emscripten_bind_gce_api_GCE_AddLinearEquation_5(self, arg0, arg1, arg2, arg3, arg4);
};;

gce_api.prototype['GCE_AddParallel'] = gce_api.prototype.GCE_AddParallel = function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  return _emscripten_bind_gce_api_GCE_AddParallel_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_AddPointOnParEllipse'] = gce_api.prototype.GCE_AddPointOnParEllipse = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return _emscripten_bind_gce_api_GCE_AddPointOnParEllipse_4(self, arg0, arg1, arg2, arg3);
};;

gce_api.prototype['GCE_GeomType'] = gce_api.prototype.GCE_GeomType = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_GeomType_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_AddDirectedDistance'] = gce_api.prototype.GCE_AddDirectedDistance = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddDirectedDistance_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_AddColinear'] = gce_api.prototype.GCE_AddColinear = function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  return _emscripten_bind_gce_api_GCE_AddColinear_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_AddPointByMetricPercent'] = gce_api.prototype.GCE_AddPointByMetricPercent = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (typeof arg2 == 'object') { arg2 = ensureInt32(arg2); }
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return _emscripten_bind_gce_api_GCE_AddPointByMetricPercent_4(self, arg0, arg1, arg2, arg3);
};;

gce_api.prototype['GCE_AddBoundedCurve'] = gce_api.prototype.GCE_AddBoundedCurve = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (typeof arg2 == 'object') { arg2 = ensureInt32(arg2); }
  return _emscripten_bind_gce_api_GCE_AddBoundedCurve_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_Evaluate'] = gce_api.prototype.GCE_Evaluate = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_gce_api_GCE_Evaluate_1(self, arg0);
};;

gce_api.prototype['GCE_BaseCurveType'] = gce_api.prototype.GCE_BaseCurveType = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_BaseCurveType_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_PointDOF'] = gce_api.prototype.GCE_PointDOF = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return wrapPointer(_emscripten_bind_gce_api_GCE_PointDOF_2(self, arg0, arg1), GCE_point_dof);
};;

gce_api.prototype['GCE_AddCoincidence'] = gce_api.prototype.GCE_AddCoincidence = function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  return _emscripten_bind_gce_api_GCE_AddCoincidence_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_RemoveVariable'] = gce_api.prototype.GCE_RemoveVariable = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return !!(_emscripten_bind_gce_api_GCE_RemoveVariable_2(self, arg0, arg1));
};;

gce_api.prototype['GCE_IsSatisfied'] = gce_api.prototype.GCE_IsSatisfied = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return !!(_emscripten_bind_gce_api_GCE_IsSatisfied_2(self, arg0, arg1));
};;

gce_api.prototype['GCE_PrepareDraggingPoint'] = gce_api.prototype.GCE_PrepareDraggingPoint = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_PrepareDraggingPoint_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_GetPointXY'] = gce_api.prototype.GCE_GetPointXY = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return wrapPointer(_emscripten_bind_gce_api_GCE_GetPointXY_3(self, arg0, arg1, arg2), GCE_point);
};;

gce_api.prototype['GCE_MovePoint'] = gce_api.prototype.GCE_MovePoint = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return _emscripten_bind_gce_api_GCE_MovePoint_2(self, arg0, arg1);
};;

gce_api.prototype['GCE_FreezeGeom'] = gce_api.prototype.GCE_FreezeGeom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return !!(_emscripten_bind_gce_api_GCE_FreezeGeom_2(self, arg0, arg1));
};;

gce_api.prototype['GCE_AddFixCurvePoint'] = gce_api.prototype.GCE_AddFixCurvePoint = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddFixCurvePoint_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_PrepareMovingOfPoint'] = gce_api.prototype.GCE_PrepareMovingOfPoint = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  return _emscripten_bind_gce_api_GCE_PrepareMovingOfPoint_4(self, arg0, arg1, arg2, arg3);
};;

gce_api.prototype['GCE_SetJournal'] = gce_api.prototype.GCE_SetJournal = function(arg0, arg1) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  return !!(_emscripten_bind_gce_api_GCE_SetJournal_2(self, arg0, arg1));
};;

gce_api.prototype['GCE_AddDistance2P'] = gce_api.prototype.GCE_AddDistance2P = function(arg0, arg1, arg2) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (typeof arg1 == 'object') { arg1 = ensureInt32(arg1); }
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_AddDistance2P_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_RemoveGeom'] = gce_api.prototype.GCE_RemoveGeom = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  return !!(_emscripten_bind_gce_api_GCE_RemoveGeom_2(self, arg0, arg1));
};;

gce_api.prototype['GCE_PrepareMovingGeoms'] = gce_api.prototype.GCE_PrepareMovingGeoms = function(arg0, arg1, arg2) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  return _emscripten_bind_gce_api_GCE_PrepareMovingGeoms_3(self, arg0, arg1, arg2);
};;

gce_api.prototype['GCE_NULL'] = gce_api.prototype.GCE_NULL = function() {
  var self = this.ptr;
  return _emscripten_bind_gce_api_GCE_NULL_0(self);
};;

gce_api.prototype['GCE_NULL_G'] = gce_api.prototype.GCE_NULL_G = function() {
  var self = this.ptr;
  return _emscripten_bind_gce_api_GCE_NULL_G_0(self);
};;

gce_api.prototype['GCE_NULL_V'] = gce_api.prototype.GCE_NULL_V = function() {
  var self = this.ptr;
  return _emscripten_bind_gce_api_GCE_NULL_V_0(self);
};;

gce_api.prototype['GCE_NULL_C'] = gce_api.prototype.GCE_NULL_C = function() {
  var self = this.ptr;
  return _emscripten_bind_gce_api_GCE_NULL_C_0(self);
};;

gce_api.prototype['GCE_UNDEFINED_DBL'] = gce_api.prototype.GCE_UNDEFINED_DBL = function() {
  var self = this.ptr;
  return _emscripten_bind_gce_api_GCE_UNDEFINED_DBL_0(self);
};;

  gce_api.prototype['__destroy__'] = gce_api.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gce_api___destroy___0(self);
};
// GCE_dim_pars
function GCE_dim_pars() {
  this.ptr = _emscripten_bind_GCE_dim_pars_GCE_dim_pars_0();
  getCache(GCE_dim_pars)[this.ptr] = this;
};;
GCE_dim_pars.prototype = Object.create(WrapperObject.prototype);
GCE_dim_pars.prototype.constructor = GCE_dim_pars;
GCE_dim_pars.prototype.__class__ = GCE_dim_pars;
GCE_dim_pars.__cache__ = {};
Module['GCE_dim_pars'] = GCE_dim_pars;

  GCE_dim_pars.prototype['get_isDriving'] = GCE_dim_pars.prototype.get_isDriving = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GCE_dim_pars_get_isDriving_0(self));
};
    GCE_dim_pars.prototype['set_isDriving'] = GCE_dim_pars.prototype.set_isDriving = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_dim_pars_set_isDriving_1(self, arg0);
};
  GCE_dim_pars.prototype['get_isInformation'] = GCE_dim_pars.prototype.get_isInformation = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GCE_dim_pars_get_isInformation_0(self));
};
    GCE_dim_pars.prototype['set_isInformation'] = GCE_dim_pars.prototype.set_isInformation = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_dim_pars_set_isInformation_1(self, arg0);
};
  GCE_dim_pars.prototype['get_var'] = GCE_dim_pars.prototype.get_var = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_dim_pars_get_var_0(self);
};
    GCE_dim_pars.prototype['set_var'] = GCE_dim_pars.prototype.set_var = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_dim_pars_set_var_1(self, arg0);
};
  GCE_dim_pars.prototype['get_dimValue'] = GCE_dim_pars.prototype.get_dimValue = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_dim_pars_get_dimValue_0(self);
};
    GCE_dim_pars.prototype['set_dimValue'] = GCE_dim_pars.prototype.set_dimValue = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_dim_pars_set_dimValue_1(self, arg0);
};
  GCE_dim_pars.prototype['__destroy__'] = GCE_dim_pars.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_dim_pars___destroy___0(self);
};
// std_vector_geom_item
function std_vector_geom_item(arg0, arg1) {
  ensureCache.prepare();
  if (typeof arg0 == 'object') { arg0 = ensureInt32(arg0); }
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_std_vector_geom_item_std_vector_geom_item_2(arg0, arg1);
  getCache(std_vector_geom_item)[this.ptr] = this;
};;
std_vector_geom_item.prototype = Object.create(WrapperObject.prototype);
std_vector_geom_item.prototype.constructor = std_vector_geom_item;
std_vector_geom_item.prototype.__class__ = std_vector_geom_item;
std_vector_geom_item.__cache__ = {};
Module['std_vector_geom_item'] = std_vector_geom_item;

  std_vector_geom_item.prototype['__destroy__'] = std_vector_geom_item.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_std_vector_geom_item___destroy___0(self);
};
// c3d_solver_enabler
function c3d_solver_enabler() { throw "cannot construct a c3d_solver_enabler, no constructor in IDL" }
c3d_solver_enabler.prototype = Object.create(WrapperObject.prototype);
c3d_solver_enabler.prototype.constructor = c3d_solver_enabler;
c3d_solver_enabler.prototype.__class__ = c3d_solver_enabler;
c3d_solver_enabler.__cache__ = {};
Module['c3d_solver_enabler'] = c3d_solver_enabler;

c3d_solver_enabler.prototype['GCE_EnableSolverModule'] = c3d_solver_enabler.prototype.GCE_EnableSolverModule = function(arg0, arg1, arg2, arg3) {
  var self = this.ptr;
  ensureCache.prepare();
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  else arg2 = ensureString(arg2);
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  _emscripten_bind_c3d_solver_enabler_GCE_EnableSolverModule_4(self, arg0, arg1, arg2, arg3);
};;

c3d_solver_enabler.prototype['GCE_IsMathSolverEnable'] = c3d_solver_enabler.prototype.GCE_IsMathSolverEnable = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_c3d_solver_enabler_GCE_IsMathSolverEnable_0(self));
};;

c3d_solver_enabler.prototype['GCE_FreeMathModulesChecker'] = c3d_solver_enabler.prototype.GCE_FreeMathModulesChecker = function() {
  var self = this.ptr;
  _emscripten_bind_c3d_solver_enabler_GCE_FreeMathModulesChecker_0(self);
};;

  c3d_solver_enabler.prototype['__destroy__'] = c3d_solver_enabler.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_c3d_solver_enabler___destroy___0(self);
};
// GCE_point_dof
function GCE_point_dof() {
  this.ptr = _emscripten_bind_GCE_point_dof_GCE_point_dof_0();
  getCache(GCE_point_dof)[this.ptr] = this;
};;
GCE_point_dof.prototype = Object.create(WrapperObject.prototype);
GCE_point_dof.prototype.constructor = GCE_point_dof;
GCE_point_dof.prototype.__class__ = GCE_point_dof;
GCE_point_dof.__cache__ = {};
Module['GCE_point_dof'] = GCE_point_dof;

  GCE_point_dof.prototype['get_dof'] = GCE_point_dof.prototype.get_dof = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_point_dof_get_dof_0(self);
};
    GCE_point_dof.prototype['set_dof'] = GCE_point_dof.prototype.set_dof = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_point_dof_set_dof_1(self, arg0);
};
  GCE_point_dof.prototype['get_dir'] = GCE_point_dof.prototype.get_dir = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GCE_point_dof_get_dir_0(self), GCE_vec2d);
};
    GCE_point_dof.prototype['set_dir'] = GCE_point_dof.prototype.set_dir = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_point_dof_set_dir_1(self, arg0);
};
  GCE_point_dof.prototype['__destroy__'] = GCE_point_dof.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_point_dof___destroy___0(self);
};
// GCE_dragging_point
function GCE_dragging_point() {
  this.ptr = _emscripten_bind_GCE_dragging_point_GCE_dragging_point_0();
  getCache(GCE_dragging_point)[this.ptr] = this;
};;
GCE_dragging_point.prototype = Object.create(WrapperObject.prototype);
GCE_dragging_point.prototype.constructor = GCE_dragging_point;
GCE_dragging_point.prototype.__class__ = GCE_dragging_point;
GCE_dragging_point.__cache__ = {};
Module['GCE_dragging_point'] = GCE_dragging_point;

  GCE_dragging_point.prototype['get_geom'] = GCE_dragging_point.prototype.get_geom = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_dragging_point_get_geom_0(self);
};
    GCE_dragging_point.prototype['set_geom'] = GCE_dragging_point.prototype.set_geom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_dragging_point_set_geom_1(self, arg0);
};
  GCE_dragging_point.prototype['get_point'] = GCE_dragging_point.prototype.get_point = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_dragging_point_get_point_0(self);
};
    GCE_dragging_point.prototype['set_point'] = GCE_dragging_point.prototype.set_point = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_dragging_point_set_point_1(self, arg0);
};
  GCE_dragging_point.prototype['__destroy__'] = GCE_dragging_point.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_dragging_point___destroy___0(self);
};
// GCE_diagnostic_pars
function GCE_diagnostic_pars() {
  this.ptr = _emscripten_bind_GCE_diagnostic_pars_GCE_diagnostic_pars_0();
  getCache(GCE_diagnostic_pars)[this.ptr] = this;
};;
GCE_diagnostic_pars.prototype = Object.create(WrapperObject.prototype);
GCE_diagnostic_pars.prototype.constructor = GCE_diagnostic_pars;
GCE_diagnostic_pars.prototype.__class__ = GCE_diagnostic_pars;
GCE_diagnostic_pars.__cache__ = {};
Module['GCE_diagnostic_pars'] = GCE_diagnostic_pars;

  GCE_diagnostic_pars.prototype['get_consCount'] = GCE_diagnostic_pars.prototype.get_consCount = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_diagnostic_pars_get_consCount_0(self);
};
    GCE_diagnostic_pars.prototype['set_consCount'] = GCE_diagnostic_pars.prototype.set_consCount = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_diagnostic_pars_set_consCount_1(self, arg0);
};
  GCE_diagnostic_pars.prototype['get_reductCoef'] = GCE_diagnostic_pars.prototype.get_reductCoef = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_diagnostic_pars_get_reductCoef_0(self);
};
    GCE_diagnostic_pars.prototype['set_reductCoef'] = GCE_diagnostic_pars.prototype.set_reductCoef = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_diagnostic_pars_set_reductCoef_1(self, arg0);
};
  GCE_diagnostic_pars.prototype['__destroy__'] = GCE_diagnostic_pars.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_diagnostic_pars___destroy___0(self);
};
// GCE_ldim_pars
function GCE_ldim_pars() {
  this.ptr = _emscripten_bind_GCE_ldim_pars_GCE_ldim_pars_0();
  getCache(GCE_ldim_pars)[this.ptr] = this;
};;
GCE_ldim_pars.prototype = Object.create(WrapperObject.prototype);
GCE_ldim_pars.prototype.constructor = GCE_ldim_pars;
GCE_ldim_pars.prototype.__class__ = GCE_ldim_pars;
GCE_ldim_pars.__cache__ = {};
Module['GCE_ldim_pars'] = GCE_ldim_pars;

GCE_ldim_pars.prototype['set_hp'] = GCE_ldim_pars.prototype.set_hp = function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof arg0 == 'object') { arg0 = ensureInt32(arg0); }
  _emscripten_bind_GCE_ldim_pars_set_hp_1(self, arg0);
};;

GCE_ldim_pars.prototype['get_hp'] = GCE_ldim_pars.prototype.get_hp = function() {
  var self = this.ptr;
  var arrpntr = _emscripten_bind_GCE_ldim_pars_get_hp_0(self);
  var arr = new Array();
  arr.push(Module.getValue(arrpntr, "i32"));
  arr.push(Module.getValue(arrpntr+4, "i32"))
  return arr;
};;

  GCE_ldim_pars.prototype['get_dPars'] = GCE_ldim_pars.prototype.get_dPars = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GCE_ldim_pars_get_dPars_0(self), GCE_dim_pars);
};
    GCE_ldim_pars.prototype['set_dPars'] = GCE_ldim_pars.prototype.set_dPars = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_ldim_pars_set_dPars_1(self, arg0);
};
  GCE_ldim_pars.prototype['get_dirAngle'] = GCE_ldim_pars.prototype.get_dirAngle = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_ldim_pars_get_dirAngle_0(self);
};
    GCE_ldim_pars.prototype['set_dirAngle'] = GCE_ldim_pars.prototype.set_dirAngle = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_ldim_pars_set_dirAngle_1(self, arg0);
};
  GCE_ldim_pars.prototype['__destroy__'] = GCE_ldim_pars.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_ldim_pars___destroy___0(self);
};
// GCE_adim_pars
function GCE_adim_pars() {
  this.ptr = _emscripten_bind_GCE_adim_pars_GCE_adim_pars_0();
  getCache(GCE_adim_pars)[this.ptr] = this;
};;
GCE_adim_pars.prototype = Object.create(WrapperObject.prototype);
GCE_adim_pars.prototype.constructor = GCE_adim_pars;
GCE_adim_pars.prototype.__class__ = GCE_adim_pars;
GCE_adim_pars.__cache__ = {};
Module['GCE_adim_pars'] = GCE_adim_pars;

  GCE_adim_pars.prototype['get_dPars'] = GCE_adim_pars.prototype.get_dPars = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GCE_adim_pars_get_dPars_0(self), GCE_dim_pars);
};
    GCE_adim_pars.prototype['set_dPars'] = GCE_adim_pars.prototype.set_dPars = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_adim_pars_set_dPars_1(self, arg0);
};
  GCE_adim_pars.prototype['get_factor'] = GCE_adim_pars.prototype.get_factor = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_adim_pars_get_factor_0(self);
};
    GCE_adim_pars.prototype['set_factor'] = GCE_adim_pars.prototype.set_factor = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_adim_pars_set_factor_1(self, arg0);
};
  GCE_adim_pars.prototype['get_adjacent'] = GCE_adim_pars.prototype.get_adjacent = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_GCE_adim_pars_get_adjacent_0(self));
};
    GCE_adim_pars.prototype['set_adjacent'] = GCE_adim_pars.prototype.set_adjacent = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_adim_pars_set_adjacent_1(self, arg0);
};
  GCE_adim_pars.prototype['__destroy__'] = GCE_adim_pars.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_adim_pars___destroy___0(self);
};
// GCE_line
function GCE_line() {
  this.ptr = _emscripten_bind_GCE_line_GCE_line_0();
  getCache(GCE_line)[this.ptr] = this;
};;
GCE_line.prototype = Object.create(WrapperObject.prototype);
GCE_line.prototype.constructor = GCE_line;
GCE_line.prototype.__class__ = GCE_line;
GCE_line.__cache__ = {};
Module['GCE_line'] = GCE_line;

  GCE_line.prototype['get_p'] = GCE_line.prototype.get_p = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GCE_line_get_p_0(self), GCE_point);
};
    GCE_line.prototype['set_p'] = GCE_line.prototype.set_p = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_line_set_p_1(self, arg0);
};
  GCE_line.prototype['get_norm'] = GCE_line.prototype.get_norm = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GCE_line_get_norm_0(self), GCE_vec2d);
};
    GCE_line.prototype['set_norm'] = GCE_line.prototype.set_norm = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_line_set_norm_1(self, arg0);
};
  GCE_line.prototype['__destroy__'] = GCE_line.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_line___destroy___0(self);
};
// GCE_point
function GCE_point() {
  this.ptr = _emscripten_bind_GCE_point_GCE_point_0();
  getCache(GCE_point)[this.ptr] = this;
};;
GCE_point.prototype = Object.create(WrapperObject.prototype);
GCE_point.prototype.constructor = GCE_point;
GCE_point.prototype.__class__ = GCE_point;
GCE_point.__cache__ = {};
Module['GCE_point'] = GCE_point;

  GCE_point.prototype['get_x'] = GCE_point.prototype.get_x = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_point_get_x_0(self);
};
    GCE_point.prototype['set_x'] = GCE_point.prototype.set_x = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_point_set_x_1(self, arg0);
};
  GCE_point.prototype['get_y'] = GCE_point.prototype.get_y = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_point_get_y_0(self);
};
    GCE_point.prototype['set_y'] = GCE_point.prototype.set_y = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_point_set_y_1(self, arg0);
};
  GCE_point.prototype['__destroy__'] = GCE_point.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_point___destroy___0(self);
};
// GCE_circle
function GCE_circle() {
  this.ptr = _emscripten_bind_GCE_circle_GCE_circle_0();
  getCache(GCE_circle)[this.ptr] = this;
};;
GCE_circle.prototype = Object.create(WrapperObject.prototype);
GCE_circle.prototype.constructor = GCE_circle;
GCE_circle.prototype.__class__ = GCE_circle;
GCE_circle.__cache__ = {};
Module['GCE_circle'] = GCE_circle;

  GCE_circle.prototype['get_centre'] = GCE_circle.prototype.get_centre = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GCE_circle_get_centre_0(self), GCE_point);
};
    GCE_circle.prototype['set_centre'] = GCE_circle.prototype.set_centre = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_circle_set_centre_1(self, arg0);
};
  GCE_circle.prototype['get_radius'] = GCE_circle.prototype.get_radius = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_circle_get_radius_0(self);
};
    GCE_circle.prototype['set_radius'] = GCE_circle.prototype.set_radius = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_circle_set_radius_1(self, arg0);
};
  GCE_circle.prototype['__destroy__'] = GCE_circle.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_circle___destroy___0(self);
};
// geom_point
function geom_point() {
  this.ptr = _emscripten_bind_geom_point_geom_point_0();
  getCache(geom_point)[this.ptr] = this;
};;
geom_point.prototype = Object.create(WrapperObject.prototype);
geom_point.prototype.constructor = geom_point;
geom_point.prototype.__class__ = geom_point;
geom_point.__cache__ = {};
Module['geom_point'] = geom_point;

  geom_point.prototype['get_geom'] = geom_point.prototype.get_geom = function() {
  var self = this.ptr;
  return _emscripten_bind_geom_point_get_geom_0(self);
};
    geom_point.prototype['set_geom'] = geom_point.prototype.set_geom = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_geom_point_set_geom_1(self, arg0);
};
  geom_point.prototype['get_pntName'] = geom_point.prototype.get_pntName = function() {
  var self = this.ptr;
  return _emscripten_bind_geom_point_get_pntName_0(self);
};
    geom_point.prototype['set_pntName'] = geom_point.prototype.set_pntName = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_geom_point_set_pntName_1(self, arg0);
};
  geom_point.prototype['__destroy__'] = geom_point.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_geom_point___destroy___0(self);
};
// GCE_vecNd
function GCE_vecNd() {
  this.ptr = _emscripten_bind_GCE_vecNd_GCE_vecNd_0();
  getCache(GCE_vecNd)[this.ptr] = this;
};;
GCE_vecNd.prototype = Object.create(WrapperObject.prototype);
GCE_vecNd.prototype.constructor = GCE_vecNd;
GCE_vecNd.prototype.__class__ = GCE_vecNd;
GCE_vecNd.__cache__ = {};
Module['GCE_vecNd'] = GCE_vecNd;

GCE_vecNd.prototype['set_arg'] = GCE_vecNd.prototype.set_arg = function(arg0) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof arg0 == 'object') { arg0 = ensureFloat64(arg0); }
  _emscripten_bind_GCE_vecNd_set_arg_1(self, arg0);
};;

GCE_vecNd.prototype['get_arg'] = GCE_vecNd.prototype.get_arg = function() {
  var self = this.ptr;
  var arrpntr = _emscripten_bind_GCE_vecNd_get_arg_0(self);
  var arr = new Array();
  for (var i=0; i<this.get_size(); i++) arr.push(Module.getValue(arrpntr+i*8, 'double'));
  return arr;
};;

  GCE_vecNd.prototype['get_size'] = GCE_vecNd.prototype.get_size = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_vecNd_get_size_0(self);
};
    GCE_vecNd.prototype['set_size'] = GCE_vecNd.prototype.set_size = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_vecNd_set_size_1(self, arg0);
};
  GCE_vecNd.prototype['__destroy__'] = GCE_vecNd.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_vecNd___destroy___0(self);
};
// GCE_ellipse
function GCE_ellipse() {
  this.ptr = _emscripten_bind_GCE_ellipse_GCE_ellipse_0();
  getCache(GCE_ellipse)[this.ptr] = this;
};;
GCE_ellipse.prototype = Object.create(WrapperObject.prototype);
GCE_ellipse.prototype.constructor = GCE_ellipse;
GCE_ellipse.prototype.__class__ = GCE_ellipse;
GCE_ellipse.__cache__ = {};
Module['GCE_ellipse'] = GCE_ellipse;

  GCE_ellipse.prototype['get_centre'] = GCE_ellipse.prototype.get_centre = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GCE_ellipse_get_centre_0(self), GCE_point);
};
    GCE_ellipse.prototype['set_centre'] = GCE_ellipse.prototype.set_centre = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_ellipse_set_centre_1(self, arg0);
};
  GCE_ellipse.prototype['get_direct'] = GCE_ellipse.prototype.get_direct = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_GCE_ellipse_get_direct_0(self), GCE_vec2d);
};
    GCE_ellipse.prototype['set_direct'] = GCE_ellipse.prototype.set_direct = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_ellipse_set_direct_1(self, arg0);
};
  GCE_ellipse.prototype['get_majorR'] = GCE_ellipse.prototype.get_majorR = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_ellipse_get_majorR_0(self);
};
    GCE_ellipse.prototype['set_majorR'] = GCE_ellipse.prototype.set_majorR = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_ellipse_set_majorR_1(self, arg0);
};
  GCE_ellipse.prototype['get_minorR'] = GCE_ellipse.prototype.get_minorR = function() {
  var self = this.ptr;
  return _emscripten_bind_GCE_ellipse_get_minorR_0(self);
};
    GCE_ellipse.prototype['set_minorR'] = GCE_ellipse.prototype.set_minorR = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_GCE_ellipse_set_minorR_1(self, arg0);
};
  GCE_ellipse.prototype['__destroy__'] = GCE_ellipse.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GCE_ellipse___destroy___0(self);
};
(function() {
  function setupEnums() {


    // coord_name

    Module['GCE_X'] = _emscripten_enum_coord_name_GCE_X();

    Module['GCE_Y'] = _emscripten_enum_coord_name_GCE_Y();

    Module['GCE_ACRD'] = _emscripten_enum_coord_name_GCE_ACRD();

    Module['GCE_DCRD'] = _emscripten_enum_coord_name_GCE_DCRD();

    Module['GCE_RADIUS'] = _emscripten_enum_coord_name_GCE_RADIUS();

    Module['GCE_MAJOR_RADIUS'] = _emscripten_enum_coord_name_GCE_MAJOR_RADIUS();

    Module['GCE_MINOR_RADIUS'] = _emscripten_enum_coord_name_GCE_MINOR_RADIUS();

    Module['GCE_NULL_CRD'] = _emscripten_enum_coord_name_GCE_NULL_CRD();



    // constraint_type

    Module['GCE_FIX_GEOM'] = _emscripten_enum_constraint_type_GCE_FIX_GEOM();

    Module['GCE_HORIZONTAL'] = _emscripten_enum_constraint_type_GCE_HORIZONTAL();

    Module['GCE_VERTICAL'] = _emscripten_enum_constraint_type_GCE_VERTICAL();

    Module['GCE_LENGTH'] = _emscripten_enum_constraint_type_GCE_LENGTH();

    Module['GCE_COINCIDENT'] = _emscripten_enum_constraint_type_GCE_COINCIDENT();

    Module['GCE_EQUAL_LENGTH'] = _emscripten_enum_constraint_type_GCE_EQUAL_LENGTH();

    Module['GCE_EQUAL_RADIUS'] = _emscripten_enum_constraint_type_GCE_EQUAL_RADIUS();

    Module['GCE_PARALLEL'] = _emscripten_enum_constraint_type_GCE_PARALLEL();

    Module['GCE_PERPENDICULAR'] = _emscripten_enum_constraint_type_GCE_PERPENDICULAR();

    Module['GCE_TANGENT'] = _emscripten_enum_constraint_type_GCE_TANGENT();

    Module['GCE_COLINEAR'] = _emscripten_enum_constraint_type_GCE_COLINEAR();

    Module['GCE_ALIGN_2P'] = _emscripten_enum_constraint_type_GCE_ALIGN_2P();

    Module['GCE_ANGLE_BISECTOR'] = _emscripten_enum_constraint_type_GCE_ANGLE_BISECTOR();

    Module['GCE_MIDDLE_POINT'] = _emscripten_enum_constraint_type_GCE_MIDDLE_POINT();

    Module['GCE_COLINEAR_3P'] = _emscripten_enum_constraint_type_GCE_COLINEAR_3P();

    Module['GCE_SYMMETRIC'] = _emscripten_enum_constraint_type_GCE_SYMMETRIC();

    Module['GCE_DISTANCE'] = _emscripten_enum_constraint_type_GCE_DISTANCE();

    Module['GCE_RADIUS_DIM'] = _emscripten_enum_constraint_type_GCE_RADIUS_DIM();

    Module['GCE_DIAMETER'] = _emscripten_enum_constraint_type_GCE_DIAMETER();

    Module['GCE_ANGLE'] = _emscripten_enum_constraint_type_GCE_ANGLE();

    Module['GCE_ANGLE_OX'] = _emscripten_enum_constraint_type_GCE_ANGLE_OX();

    Module['GCE_CONSTRAINTS_COUNT'] = _emscripten_enum_constraint_type_GCE_CONSTRAINTS_COUNT();

    Module['GCE_UNKNOWN_CON'] = _emscripten_enum_constraint_type_GCE_UNKNOWN_CON();



    // GCE_bisec_variant

    Module['bv_None'] = _emscripten_enum_GCE_bisec_variant_bv_None();

    Module['bv_NormalSum'] = _emscripten_enum_GCE_bisec_variant_bv_NormalSum();

    Module['bv_NormalDiff'] = _emscripten_enum_GCE_bisec_variant_bv_NormalDiff();



    // GCE_result

    Module['GCE_RESULT_None'] = _emscripten_enum_GCE_result_GCE_RESULT_None();

    Module['GCE_RESULT_Ok'] = _emscripten_enum_GCE_result_GCE_RESULT_Ok();

    Module['GCE_RESULT_Satisfied'] = _emscripten_enum_GCE_result_GCE_RESULT_Satisfied();

    Module['GCE_RESULT_Not_Satisfied'] = _emscripten_enum_GCE_result_GCE_RESULT_Not_Satisfied();

    Module['GCE_RESULT_Overconstrained'] = _emscripten_enum_GCE_result_GCE_RESULT_Overconstrained();

    Module['GCE_RESULT_InvalidGeometry'] = _emscripten_enum_GCE_result_GCE_RESULT_InvalidGeometry();

    Module['GCE_RESULT_MovingOfFixedGeom'] = _emscripten_enum_GCE_result_GCE_RESULT_MovingOfFixedGeom();

    Module['GCE_RESULT_Unregistered'] = _emscripten_enum_GCE_result_GCE_RESULT_Unregistered();

    Module['GCE_RESULT_SystemError'] = _emscripten_enum_GCE_result_GCE_RESULT_SystemError();

    Module['GCE_RESULT_NullSystem'] = _emscripten_enum_GCE_result_GCE_RESULT_NullSystem();

    Module['GCE_RESULT_CircleCantStretched'] = _emscripten_enum_GCE_result_GCE_RESULT_CircleCantStretched();

    Module['GCE_RESULT_SingularMatrix'] = _emscripten_enum_GCE_result_GCE_RESULT_SingularMatrix();

    Module['GCE_RESULT_DegenerateScalingFactor'] = _emscripten_enum_GCE_result_GCE_RESULT_DegenerateScalingFactor();

    Module['GCE_RESULT_InvalidDimensionTransform'] = _emscripten_enum_GCE_result_GCE_RESULT_InvalidDimensionTransform();



    // query_geom_type

    Module['GCE_FIRST_PTYPE'] = _emscripten_enum_query_geom_type_GCE_FIRST_PTYPE();

    Module['GCE_IMPROPER_POINT'] = _emscripten_enum_query_geom_type_GCE_IMPROPER_POINT();

    Module['GCE_FIRST_END'] = _emscripten_enum_query_geom_type_GCE_FIRST_END();

    Module['GCE_SECOND_END'] = _emscripten_enum_query_geom_type_GCE_SECOND_END();

    Module['GCE_CENTRE'] = _emscripten_enum_query_geom_type_GCE_CENTRE();

    Module['GCE_PROPER_POINT'] = _emscripten_enum_query_geom_type_GCE_PROPER_POINT();

    Module['GCE_Q1'] = _emscripten_enum_query_geom_type_GCE_Q1();

    Module['GCE_Q2'] = _emscripten_enum_query_geom_type_GCE_Q2();

    Module['GCE_Q3'] = _emscripten_enum_query_geom_type_GCE_Q3();

    Module['GCE_Q4'] = _emscripten_enum_query_geom_type_GCE_Q4();

    Module['GCE_LAST_PTYPE'] = _emscripten_enum_query_geom_type_GCE_LAST_PTYPE();

    Module['GCE_DIRECTION'] = _emscripten_enum_query_geom_type_GCE_DIRECTION();

    Module['GCE_ORIENTATION'] = _emscripten_enum_query_geom_type_GCE_ORIENTATION();



    // geom_type

    Module['GCE_ANY_GEOM'] = _emscripten_enum_geom_type_GCE_ANY_GEOM();

    Module['GCE_POINT'] = _emscripten_enum_geom_type_GCE_POINT();

    Module['GCE_LINE'] = _emscripten_enum_geom_type_GCE_LINE();

    Module['GCE_CIRCLE'] = _emscripten_enum_geom_type_GCE_CIRCLE();

    Module['GCE_ELLIPSE'] = _emscripten_enum_geom_type_GCE_ELLIPSE();

    Module['GCE_SPLINE'] = _emscripten_enum_geom_type_GCE_SPLINE();

    Module['GCE_PARAMETRIC_CURVE'] = _emscripten_enum_geom_type_GCE_PARAMETRIC_CURVE();

    Module['GCE_BOUNDED_CURVE'] = _emscripten_enum_geom_type_GCE_BOUNDED_CURVE();

    Module['GCE_LINE_SEGMENT'] = _emscripten_enum_geom_type_GCE_LINE_SEGMENT();

    Module['GCE_ARC'] = _emscripten_enum_geom_type_GCE_ARC();

    Module['GCE_ELLIPSE_ARC'] = _emscripten_enum_geom_type_GCE_ELLIPSE_ARC();

    Module['GCE_SET'] = _emscripten_enum_geom_type_GCE_SET();

  }
  if (Module['calledRun']) setupEnums();
  else addOnPreMain(setupEnums);
})();
