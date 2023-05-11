
import * as THREE from 'three';

let r = 1, R = 1.25;

// pipe 1
let pipeShape = new THREE.Shape();
pipeShape.absarc(0, 0, R, 0, Math.PI *2 );
pipeShape.holes.push(new THREE.Path().absarc(0, 0, r, 0, Math.PI * 2, true));
let pipeGeometry = new THREE.ExtrudeGeometry(pipeShape, {
    curveSegments: 100,
    depth: 10,
    bevelEnabled: false
});
pipeGeometry.center();
let pipeMaterial = new THREE.MeshNormalMaterial({color: "silver"});
pipeMaterial.transparent=true
pipeMaterial.opacity=0.7
let pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);



// minor pipes have different sizes
let pipe_minor_internal_radius = 0.75, pipe_minor_outer_radius = 1;

// pipe 2
let pipe2Shape = new THREE.Shape();
pipe2Shape.absarc(1, 0, pipe_minor_outer_radius, 0, Math.PI * 2);
pipe2Shape.holes.push(new THREE.Path().absarc(1, 0, pipe_minor_internal_radius, 0, Math.PI * 2, true));
let pipe2Geometry = new THREE.ExtrudeGeometry(pipe2Shape, {
    curveSegments: 100,
    depth: 7,
    bevelEnabled: false
});
//pipe2Geometry.rotateX(0)
pipe2Geometry.rotateY(2)
let pipe2Material = new THREE.MeshNormalMaterial({color: "silver"});
let pipe2 = new THREE.Mesh(pipe2Geometry, pipe2Material);
pipe2Material.transparent=true
pipe2Material.opacity=0.7


// pipe 3

let pipe3Shape = new THREE.Shape();
pipe3Shape.absarc(1, 0, pipe_minor_outer_radius, 0, Math.PI * 2);
pipe3Shape.holes.push(new THREE.Path().absarc(1, 0,pipe_minor_internal_radius, 0, Math.PI * 2, true));
let pipe3Geometry = new THREE.ExtrudeGeometry(pipe3Shape, {
    curveSegments: 100,
    depth: 7,
    bevelEnabled: false
});
// pipe3Geometry.rotateX(0)
pipe3Geometry.rotateY(-2)
let pipe3Material = new THREE.MeshNormalMaterial({transparent:true,color: "silver"});
let pipe3 = new THREE.Mesh(pipe3Geometry, pipe3Material);
pipe3Material.transparent=true
pipe3Material.opacity=0.7


pipe.add(pipe2)
pipe.add(pipe3)
pipe2.position.x=1


/**
 * current orientation
 *  +z is downwards
 *  +y towards the viewer (out of the screen)
 *  +x to the right
 */
pipe3.position.z=-1.8
//pipe3.position.y=-1
pipe3.position.x=-0.2

export {pipe,pipe2,pipe3}
