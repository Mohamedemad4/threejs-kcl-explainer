import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { renderer } from './water';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 10, 0);
camera.lookAt(scene.position);


const controls = new OrbitControls(camera, renderer.domElement);
document.body.appendChild( renderer.domElement );

let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

window.addEventListener("resize", onResize);

renderer.setAnimationLoop(_ => {
  renderer.render(scene, camera);
})

function onResize(event) {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}



export {scene}


/***
 * - so far all the fluid sim code i can see is for planer "water" with like "force transformations"
 * we can do something call
 * 
 * half cut the pipes
 * layout planer water
 * allow mouse interaction
 * simulate "waves"
 */