import { GUI } from "three/examples/jsm/libs/dat.gui.module"

export function createCubeFolders(cube: THREE.Mesh, gui: GUI): void {
    const cubeFolder = gui.addFolder("Cube")

    const cubeRotationFolder = cubeFolder.addFolder("Rotation");
    cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01)
    cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01)
    cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01)
    cubeRotationFolder.open()

    const cubePositionFolder = cubeFolder.addFolder("Position");
    cubePositionFolder.add(cube.position, "x", 0, 10, 0.01);
    cubePositionFolder.add(cube.position, "y", 0, 10, 0.01);
    cubePositionFolder.add(cube.position, "z", 0, 10, 0.01);
    cubePositionFolder.open()

    const cubeScaleFolder = cubeFolder.addFolder("Scale");
    cubeScaleFolder.add(cube.scale, "x", 0, 2, 0.01);
    cubeScaleFolder.add(cube.scale, "y", 0, 2, 0.01);
    cubeScaleFolder.add(cube.scale, "z", 0, 2, 0.01);
    cubeScaleFolder.open()


    cubeFolder.open()
}