// use intellisense from 
// http://shrekshao.github.io/2016/06/20/vscode-01/
// manually created ../jsconfig.json


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  renderer.render(scene, camera);
}

animate();