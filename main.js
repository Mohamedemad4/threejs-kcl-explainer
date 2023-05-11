import { pipe,pipe2,pipe3 } from './pipes';
import { scene } from './scene';
import { waterMesh,render } from './water';

scene.add(pipe)


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    controls.update();
    
}

render()
animate();




/***
 * - so far all the fluid sim code i can see is for planer "water" with like "force transformations"
 * we can do something call
 * 
 * half cut the pipes (no we are doing them transparent)
 * layout planer water
 * allow mouse interaction
 * simulate "waves"
 */

/**
 * should we evend o this??
 * or just do 3 vectors we 5alas?
 */