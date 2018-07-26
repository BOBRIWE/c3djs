
// import Handler from '../../packages/Handler/Handler';
// import Drawer from '../../packages/Drawer/Drawer';

import C3djs from '../../packages/C3djs/C3djs';
import $ from 'jquery';


loadScript( "js/c3d-102057/c3d.js", () => {
    let id = window.setInterval(function() {
        if(!window.runtimeInitialized) {
            console.warn('C3d solver not ready. Reloading...');
            return;
        }

            main();
            window.clearInterval(id);

    }, 50);
} );

function main() {
    const canvas = document.getElementById('canvas');
    const canvasMenu = document.getElementById('canvas-menu');

    const $addSegButton = $('#add-segment-button');
    const $addPointButton = $('#place-point-button');
    const $addCircleButton = $('#add-circle-button');
    const $moveButton = $('#move-button');
    const $addVerticalButton = $('#add-vertical-button');
    const $addHorizontalButton = $('#add-horizontal-button');
    const $addParallelButton = $('#add-parallel-button');
    const $addPerpendicularButton = $('#add-perpendicular-button');
    const $addMiddlePointButton = $('#add-middle-point-button');
    const $addTangentButton = $('#add-tangent-button');
    const $moveGeomsButton = $('#move-geoms-button');
    const $freezeButton = $('#freeze-button');

    const $canvas = $('#canvas');


    const c3djs = new C3djs(canvas);
    c3djs.setMode('add-point');



    $addPointButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('add-point');
    });
    $addSegButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('add-segment');
    });
    $moveButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('move-geom-item');
    });
    $addVerticalButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('add-vertical');
    });
    $addHorizontalButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('add-horizontal');
    });
    $addParallelButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('add-parallel');
    });
    $addPerpendicularButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('add-perpendicular');
    });
    $addMiddlePointButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('add-middle-point');
    });
    $addCircleButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('add-circle');
    });
    $addTangentButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('add-tangent');
    });
    $moveGeomsButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('move-geoms');
    });
    $freezeButton.on('change', function (event) {
        c3djs.removeMode();
        c3djs.setMode('freeze-geom');
    });

}




function loadScript( url, callback ) {
  var script = document.createElement( "script" )
  script.type = "text/javascript";
  if(script.readyState) {  //IE
    script.onreadystatechange = function() {
      if ( script.readyState === "loaded" || script.readyState === "complete" ) {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName( "head" )[0].appendChild( script );
}
