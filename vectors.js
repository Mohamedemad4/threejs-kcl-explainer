import * as THREE from 'three';
import { scene } from './scene';
// draw there vectors and tie them to the pipe and animate them slightly kedahoo


var from1 = new THREE.Vector3( 0, 0, -4 );
var to1 = new THREE.Vector3( 0, 0, -1 );
var direction1 = to1.clone().sub(from1);
var length1 = 1 //direction1.length();
var arrow1 = new THREE.ArrowHelper(direction1.normalize(), from1, length1, "red");


var from2 = new THREE.Vector3( 2, 0, -2 );
var to2 = new THREE.Vector3( 0, 0, 0 );
var direction2 = to2.clone().sub(from2);
var length2 =  1//direction2.length();
var arrow2 = new THREE.ArrowHelper(direction2.normalize(), from2, length2, "blue");



var from3 = new THREE.Vector3( -2, 0, -2 );
var to3 = new THREE.Vector3( 0, 0, 0 );
var direction3 = to3.clone().sub(from3);
var length3 = 1 //direction3.length();
var arrow3 = new THREE.ArrowHelper(direction3.normalize(), from3, length3, "green");


var from4 = new THREE.Vector3( 0, 0, 0 );
var to4 = new THREE.Vector3( 0, 0, 3 );
var direction4 = to4.clone().sub(from4);
var arrow4 = new THREE.ArrowHelper(direction4.normalize(), from2, 2, "blue");



var from5 = new THREE.Vector3( 0, 0, 0 );
var to5 = new THREE.Vector3( 0, 0, 3 );
var direction5 = to5.clone().sub(from5);
var arrow5 = new THREE.ArrowHelper(direction5.normalize(), from5, 2, "green");

var from6 = new THREE.Vector3( 0, 0, 0 );
var to6 = new THREE.Vector3( 0, 0, 3 );
var direction6 = to6.clone().sub(from6);
var arrow6 = new THREE.ArrowHelper(direction6.normalize(), from6, 2, "red");

scene.add(arrow1)
scene.add(arrow3)
scene.add(arrow2)
arrow4.translateX(-1.5)
scene.add(arrow4)


//console.log(arrow5.position)
// const times = [0, 3, 6];
// const values = [
//     -0.6, 0, 0,
//     -10.2, 0, 0, 
//     -30, 0, 0
// ];


// const times = [0, 3, 6];
// const values = [0, 0, 0, 2, 2, 2, 0, 0, 0];

// const positionKF = new THREE.VectorKeyframeTrack(".position", times, values);
// const clip = new THREE.AnimationClip("point-arrow",-1, [positionKF]);
// const mixer = new THREE.AnimationMixer(arrow5)
// const updateAmount = 0.1; // in seconds
// mixer.update(updateAmount);
// console.log(arrow5.isObject3D)

// const action = mixer.clipAction(clip);

//setInterval(()=>action.play(),500)

scene.add(arrow5)
scene.add(arrow6)
arrow5.translateX(-0.6)
arrow4.translateY(2)

export {arrow1,arrow2,arrow3,arrow4,arrow5}