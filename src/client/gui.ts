import * as THREE from '/build/three.module.js'
import { GUI } from "three/examples/jsm/libs/dat.gui.module"
import { MaterialManager } from './material';

export function createCubeFolders(cube: THREE.Mesh, gui: GUI): void {
    const cubeFolder = gui.addFolder("Cube")

    const cubeRotationFolder = cubeFolder.addFolder("Rotation");
    cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01)
    cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01)
    cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01)

    const cubePositionFolder = cubeFolder.addFolder("Position");
    cubePositionFolder.add(cube.position, "x", 0, 10, 0.01);
    cubePositionFolder.add(cube.position, "y", 0, 10, 0.01);
    cubePositionFolder.add(cube.position, "z", 0, 10, 0.01);

    const cubeScaleFolder = cubeFolder.addFolder("Scale");
    cubeScaleFolder.add(cube.scale, "x", 0, 2, 0.01).onFinishChange(() => console.dir(cube.geometry));
    cubeScaleFolder.add(cube.scale, "y", 0, 2, 0.01);
    cubeScaleFolder.add(cube.scale, "z", 0, 2, 0.01);

    cubeFolder.add(cube, "visible", true );

    var cubeData = {
        width: 1,
        height: 1,
        depth: 1,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1
    };
    const cubePropertiesFolder = cubeFolder.addFolder("Properties")
    cubePropertiesFolder.add(cubeData, 'width', 1, 30).onChange(regenerateBoxGeometry).onFinishChange(()=> console.dir(cube.geometry))
    cubePropertiesFolder.add(cubeData, 'height', 1, 30).onChange(regenerateBoxGeometry);
    cubePropertiesFolder.add(cubeData, 'depth', 1, 30).onChange(regenerateBoxGeometry);
    cubePropertiesFolder.add(cubeData, 'widthSegments', 1, 30).onChange(regenerateBoxGeometry);
    cubePropertiesFolder.add(cubeData, 'heightSegments', 1, 30).onChange(regenerateBoxGeometry);
    cubePropertiesFolder.add(cubeData, 'depthSegments', 1, 30).onChange(regenerateBoxGeometry);
    
    function regenerateBoxGeometry() {
        let newGeometry = new THREE.BoxGeometry(
            cubeData.width, cubeData.height, cubeData.depth, cubeData.widthSegments, cubeData.heightSegments, cubeData.depthSegments
        )
        cube.geometry.dispose()
        cube.geometry = newGeometry
    }
}

export function createSphereFolders(sphere: THREE.Mesh, gui: GUI): void {
    var sphereData = {
        radius: 1,
        widthSegments: 8,
        heightSegments: 6,
        phiStart: 0,
        phiLength: Math.PI * 2,
        thetaStart: 0,
        thetaLength: Math.PI
    };
    const sphereFolder = gui.addFolder("Sphere")
    const spherePropertiesFolder = sphereFolder.addFolder("Properties")
    spherePropertiesFolder.add(sphereData, 'radius', .1, 30).onChange(regenerateSphereGeometry);
    spherePropertiesFolder.add(sphereData, 'widthSegments', 1, 32).onChange(regenerateSphereGeometry);
    spherePropertiesFolder.add(sphereData, 'heightSegments', 1, 16).onChange(regenerateSphereGeometry);
    spherePropertiesFolder.add(sphereData, 'phiStart', 0, Math.PI * 2).onChange(regenerateSphereGeometry);
    spherePropertiesFolder.add(sphereData, 'phiLength', 0, Math.PI * 2).onChange(regenerateSphereGeometry);
    spherePropertiesFolder.add(sphereData, 'thetaStart', 0, Math.PI).onChange(regenerateSphereGeometry);
    spherePropertiesFolder.add(sphereData, 'thetaLength', 0, Math.PI).onChange(regenerateSphereGeometry);
    
    function regenerateSphereGeometry() {
        let newGeometry = new THREE.SphereGeometry(
            sphereData.radius, sphereData.widthSegments, sphereData.heightSegments, sphereData.phiStart, sphereData.phiLength, sphereData.thetaStart, sphereData.thetaLength
        )
        sphere.geometry.dispose()
        sphere.geometry = newGeometry
    }
}

export function createIcosahedronFolders(icosahedron: THREE.Mesh, gui: GUI) {
    var icosahedronData = {
        radius: 1,
        detail: 0
    };
    const icosahedronFolder = gui.addFolder("Icosahedron")
    const icosahedronPropertiesFolder = icosahedronFolder.addFolder("Properties")
    icosahedronPropertiesFolder.add(icosahedronData, 'radius', .1, 10).onChange(regenerateIcosahedronGeometry);
    icosahedronPropertiesFolder.add(icosahedronData, 'detail', 0, 5).step(1).onChange(regenerateIcosahedronGeometry);
    
    function regenerateIcosahedronGeometry() {
        let newGeometry = new THREE.IcosahedronGeometry(
            icosahedronData.radius, icosahedronData.detail
        )
        icosahedron.geometry.dispose()
        icosahedron.geometry = newGeometry
    }
    
}

export function createMaterialFolder(material: THREE.Material, gui: GUI) {

    var options = {
        side: {
            "FrontSide": THREE.FrontSide,
            "BackSide": THREE.BackSide,
            "DoubleSide": THREE.DoubleSide,
        }
    }
    
    const materialFolder = gui.addFolder('THREE.Material')
    materialFolder.add(material, 'transparent')
    materialFolder.add(material, 'opacity', 0, 1, 0.01)
    materialFolder.add(material, 'depthTest')
    materialFolder.add(material, 'depthWrite')
    materialFolder.add(material, 'alphaTest', 0, 1, 0.01).onChange(() => updateMaterial())
    materialFolder.add(material, 'visible')
    materialFolder.add(material, 'side', options.side).onChange(() => updateMaterial())
    materialFolder.open()

    function updateMaterial() {
        material.side = Number(material.side)
        material.needsUpdate = true
    }
}

export function createMeshBasicMaterialFolders(material: THREE.MeshBasicMaterial, gui: GUI) {

    
    var options = {
        combine: {
            "MultiplyOperation": THREE.MultiplyOperation,
            "MixOperation": THREE.MixOperation,
            "AddOperation": THREE.AddOperation
        }
    }


    var meshBasicMaterialFolder = gui.addFolder('THREE.MeshBasicMaterial');

    var data = {
        color: material.color.getHex(),
    };

    meshBasicMaterialFolder.addColor(data, 'color').onChange(() => { material.color.setHex(Number(data.color.toString().replace('#', '0x'))) });
    meshBasicMaterialFolder.add(material, 'wireframe');
    // meshBasicMaterialFolder.add(material, 'wireframeLinewidth', 0, 10);
    meshBasicMaterialFolder.add(material, 'combine', options.combine).onChange(() => updateMaterial())
    meshBasicMaterialFolder.add(material, 'reflectivity', 0, 1);
    meshBasicMaterialFolder.add(material, 'refractionRatio', 0, 1);
    meshBasicMaterialFolder.open()

    function updateMaterial() {
        material.combine = Number(material.combine)
        material.needsUpdate = true
    }

}

export function createMeshNormalMaterialFolders(material: THREE.MeshNormalMaterial, gui: GUI) {
    var meshNormalMaterialFolder = gui.addFolder('THREE.MeshNormalMaterial');

    meshNormalMaterialFolder.add(material, 'wireframe');
    meshNormalMaterialFolder.add(material, 'flatShading').onChange(() => updateMaterial())
    meshNormalMaterialFolder.open()

    function updateMaterial() {
        material.side = Number(material.side)
        material.needsUpdate = true
    }
}

export function createMeshLambertMaterialFolders(material: THREE.MeshLambertMaterial, gui: GUI) {

    var data = {
        color: material.color.getHex(),
        emissive: material.emissive.getHex()
    };

    var options = {
        combine: {
            "MultiplyOperation": THREE.MultiplyOperation,
            "MixOperation": THREE.MixOperation,
            "AddOperation": THREE.AddOperation
        },
    }
    var meshLambertMaterialFolder = gui.addFolder('THREE.MeshLambertMaterial');


    meshLambertMaterialFolder.addColor(data, 'color').onChange(() => { material.color.setHex(Number(data.color.toString().replace('#', '0x'))) });
    meshLambertMaterialFolder.addColor(data, 'emissive').onChange(() => { material.emissive.setHex(Number(data.emissive.toString().replace('#', '0x'))) });
    meshLambertMaterialFolder.add(material, 'wireframe');
    meshLambertMaterialFolder.add(material, 'combine', options.combine).onChange(() => updateMaterial())
    meshLambertMaterialFolder.add(material, 'reflectivity', 0, 1);
    meshLambertMaterialFolder.add(material, 'refractionRatio', 0, 1);
    meshLambertMaterialFolder.open()

    function updateMaterial() {
        material.combine = Number(material.combine)
        material.needsUpdate = true
    }
}

export function createMeshPhongMaterialFolders(material: THREE.MeshPhongMaterial, gui: GUI) {
    var options = {
        combine: {
            "MultiplyOperation": THREE.MultiplyOperation,
            "MixOperation": THREE.MixOperation,
            "AddOperation": THREE.AddOperation
        },
    }

    var data = {
        color: material.color.getHex(),
        emissive: material.emissive.getHex(),
        specular: material.specular.getHex()
    };
    
    var meshPhongMaterialFolder = gui.addFolder('THREE.MeshPhongMaterial');
    
    meshPhongMaterialFolder.addColor(data, 'color').onChange(() => { material.color.setHex(Number(data.color.toString().replace('#', '0x'))) });
    meshPhongMaterialFolder.addColor(data, 'emissive').onChange(() => { material.emissive.setHex(Number(data.emissive.toString().replace('#', '0x'))) });
    meshPhongMaterialFolder.addColor(data, 'specular').onChange(() => { material.specular.setHex(Number(data.specular.toString().replace('#', '0x'))) });
    meshPhongMaterialFolder.add(material, 'shininess', 0, 1024);
    meshPhongMaterialFolder.add(material, 'wireframe');
    meshPhongMaterialFolder.add(material, 'flatShading').onChange(() => updateMaterial())
    meshPhongMaterialFolder.add(material, 'combine', options.combine).onChange(() => updateMaterial())
    meshPhongMaterialFolder.add(material, 'reflectivity', 0, 1);
    meshPhongMaterialFolder.add(material, 'refractionRatio', 0, 1);
    meshPhongMaterialFolder.open()
    
    function updateMaterial() {
        material.combine = Number(material.combine)
        material.needsUpdate = true
    }
} 


export function createMeshStandardMaterialFolders(material: THREE.MeshStandardMaterial, gui: GUI) {


    var meshStandardMaterialFolder = gui.addFolder('THREE.MeshStandardMaterial');

    var data = {
        color: material.color.getHex(),
        emissive: material.emissive.getHex()
    };

    meshStandardMaterialFolder.addColor(data, 'color').onChange(() => { material.color.setHex(Number(data.color.toString().replace('#', '0x'))) });
    meshStandardMaterialFolder.addColor(data, 'emissive').onChange(() => { material.emissive.setHex(Number(data.emissive.toString().replace('#', '0x'))) });
    meshStandardMaterialFolder.add(material, 'wireframe');
    meshStandardMaterialFolder.add(material, 'flatShading').onChange(() => updateMaterial())
    meshStandardMaterialFolder.add( material, 'roughness', 0, 1 );
    meshStandardMaterialFolder.add( material, 'metalness', 0, 1 );
    meshStandardMaterialFolder.open()

    function updateMaterial() {
        material.needsUpdate = true
    }
}

export function createMeshMatCapMaterialFolders(material: THREE.MeshMatcapMaterial, gui: GUI) {
    var data = {
        color: material.color.getHex()
    };
    
    
    var meshMatcapMaterialFolder = gui.addFolder('THREE.MeshMatcapMaterial');
    meshMatcapMaterialFolder.addColor(data, 'color').onChange(() => { material.color.setHex(Number(data.color.toString().replace('#', '0x'))) });
    meshMatcapMaterialFolder.add(material, 'flatShading').onChange(() => updateMaterial())
    meshMatcapMaterialFolder.open()
    
    function updateMaterial() {
        material.needsUpdate = true
    }
}

export function createMeshToonMaterialFolders(material: THREE.MeshToonMaterial, gui: GUI, materialManager: MaterialManager) {

    var data = {
        color: material.color.getHex(),
        gradientMap: "fiveTone"
    }

    var options = {
        gradientMap: {
            "Default": null,
            "threeTone": "threeTone",
            "fourTone": "fourTone",
            "fiveTone": "fiveTone"
        }
    }

    var meshToonMaterialFolder = gui.addFolder('THREE.MeshToonMaterial')
    meshToonMaterialFolder.addColor(data, 'color').onChange(() => { material.color.setHex(Number(data.color.toString().replace('#', '0x'))) })
    meshToonMaterialFolder.add(material, 'flatShading').onChange(() => updateMaterial())
    meshToonMaterialFolder.add(data, 'gradientMap', options.gradientMap).onChange(() => updateMaterial())
    meshToonMaterialFolder.open()

    function updateMaterial() {
        materialManager.loadTone(data.gradientMap)
        material.needsUpdate = true
    }
}