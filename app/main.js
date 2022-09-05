import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight) // Make it a full screen canvas
// camera.position.setZ(30); // Move camera from center of scene to the z axis

renderer.render(scene, camera);  // Draw

// Add Object
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial({ color: 0xC70039});
const cube = new THREE.Mesh( geometry, material);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper);

const ambientLight = new THREE.AmbientLight(0xffffff);

// Add to scene
scene.add(cube);
scene.add(pointLight, ambientLight);


const controls = new OrbitControls(camera, renderer.domElement); // Listen to DOM elements on the mouse & update camera position

// Animate function
function animate() {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
  cube.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

// Generate random stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.24, 24, 24); // Sphere with 0.25 radius
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background Image
const spaceTexture = new THREE.TextureLoader().load('bg.jpg');
scene.background = spaceTexture;

// Avatar
// const ethyTexture = new THREE.TextureLoader().load('ethy.jpg');
// const ethy = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial({map: ethyTexture})
// );
// scene.add(ethy);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  // rotate avatar
  // ethy.rotateY += 0.01;
  // ethy.rotateZ += 0.01;

  camera.position.x = t * -0.07;
  camera.position.y = t * -0.02;
  camera.position.z = t * -0.01;

}

document.body.onscroll = moveCamera;
moveCamera()

animate();
