import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import {GUI} from '/jsm/libs/dat.gui.module'
import {createCubeFolders} from './gui.js'
import {addWindowListener, addStatsPanel} from "./window.js"

const scene: THREE.Scene = new THREE.Scene()
var axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.zoomSpeed = 0.1
controls.addEventListener('change', render)

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)
scene.add(camera)

camera.position.z = 2

const gui = new GUI();
createCubeFolders(cube, gui)


addWindowListener(camera, renderer, render)
let stats = addStatsPanel()



var animate = function () {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera)

    stats.update();
};

function render() {
    stats.begin()
    renderer.render(scene, camera)    
    stats.end()
}

render()

animate();