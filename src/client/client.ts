import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import {GUI} from '/jsm/libs/dat.gui.module'
import {createCubeFolders, createSphereFolders, createIcosahedronFolders, createMeshBasicMaterialFolders, createMaterialFolder, createMeshNormalMaterialFolders, createMeshLambertMaterialFolders, createMeshPhongMaterialFolders, createMeshStandardMaterialFolders, createMeshMatCapMaterialFolders, createMeshToonMaterialFolders} from './gui.js'
import {addWindowListener, addStatsPanel} from "./window.js"
import {MaterialManager} from "./material.js"

const scene: THREE.Scene = new THREE.Scene()
var axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper);

const light = new THREE.PointLight(0xffffff, 2)
light.position.set(10, 10, 10)
scene.add(light)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.zoomSpeed = 0.1
// controls.addEventListener('change', render)

const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 50, 50)
const icosahedronGeometry: THREE.IcosahedronGeometry = new THREE.IcosahedronGeometry();
const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry()
const torusKnotGeometry: THREE.TorusKnotGeometry = new THREE.TorusKnotGeometry()


// Material Manager options
const materialManager = new MaterialManager();
// materialManager.createMatCapMaterial()
materialManager.createToonMaterial();
// materialManager.createPhongMaterial();
const material = <THREE.MeshToonMaterial>materialManager.getMaterial()
// materialManager.loadGridTexture()
// materialManager.loadEnvironmentTexture()
// materialManager.loadMatCapTexture(2)


const cube: THREE.Mesh = new THREE.Mesh(boxGeometry, material)
cube.position.x = 5
scene.add(cube)

const sphere: THREE.Mesh = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = 3
scene.add(sphere)

const icosahedron: THREE.Mesh = new THREE.Mesh(icosahedronGeometry, material)
icosahedron.position.x = 0
scene.add(icosahedron)

const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, material)
plane.position.x = -2
scene.add(plane)

const torusKnot: THREE.Mesh = new THREE.Mesh(torusKnotGeometry, material)
torusKnot.position.x = -5
scene.add(torusKnot)

scene.add(camera)

camera.position.z = 2

const gui = new GUI();
createMaterialFolder(material, gui);
// createMeshNormalMaterialFolders(material, gui)
// createMeshBasicMaterialFolders(material, gui);
// createMeshLambertMaterialFolders(material, gui)
// createMeshPhongMaterialFolders(material, gui)
// createMeshStandardMaterialFolders(material, gui);
// createMeshMatCapMaterialFolders(material, gui)
createMeshToonMaterialFolders(material, gui, materialManager);


addWindowListener(camera, renderer, render)
let stats = addStatsPanel()



var animate = function () {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);

    // (document.getElementById("debug1") as HTMLDivElement).innerText = "Matrix\n" + cube.matrix.elements.toString().replace(/,/g, "\n",)

    stats.update();
    // light.position.set(camera.position.x, camera.position.y, camera.position.z)
};

function render() {
    stats.begin()
    renderer.render(scene, camera)    
    stats.end()
}

render()

animate();