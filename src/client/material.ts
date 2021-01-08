import * as e from 'express';
import { type } from 'os';
import * as THREE from '/build/three.module.js'

const threeTone = new THREE.TextureLoader().load("img/threeTone.jpg")
threeTone.minFilter = THREE.NearestFilter;
threeTone.magFilter = THREE.NearestFilter;

const fourTone = new THREE.TextureLoader().load("img/fourTone.jpg")
fourTone.minFilter = THREE.NearestFilter;
fourTone.magFilter = THREE.NearestFilter;

const fiveTone = new THREE.TextureLoader().load("img/fiveTone.jpg")
fiveTone.minFilter = THREE.NearestFilter;
fiveTone.magFilter = THREE.NearestFilter;

export class MaterialManager {
    private material: THREE.Material;
    private isMatCap: boolean;
    private isPhong: boolean;

    constructor() {
        this.material = null;
        this.isMatCap = false;
        this.isPhong = false;
    }

    public createMatCapMaterial() {
        this.material = new THREE.MeshMatcapMaterial();
        this.isMatCap = true;
    }

    public createBasicMaterial() {
        this.material = new THREE.MeshBasicMaterial();
    }

    public createNormalMaterial() {
        this.material = new THREE.MeshNormalMaterial();
    }

    public createLambertMaterial() {
        this.material = new THREE.MeshLambertMaterial();
    }

    public createPhongMaterial() {
        this.material = new THREE.MeshPhongMaterial();
        this.isPhong = true;
    }

    public createStandardMaterial() {
        this.material = new THREE.MeshStandardMaterial();
    }

    public createToonMaterial() {
        this.material = new THREE.MeshToonMaterial();
    }

    public getMaterial(): THREE.Material {
        return this.material;
    }

    public loadGridTexture(): void {
        const texture = new THREE.TextureLoader().load("img/grid.png")
        if (this.isMatCap) {
            (<THREE.MeshMatcapMaterial>(this.material)).map = texture
        } else if (this.isPhong) {
            (<THREE.MeshPhongMaterial>(this.material)).map = texture
        }
    }

    public loadMatCapTexture(option: number) {
        const options: string[] = [
            "img/matcap-opal.png",
            "img/matcap-crystal.png",
            "img/matcap-gold.png",
            "img/matcap-red-light.png",
            "img/matcap-green-yellow-pink.png"]
        const matcapTexture = new THREE.TextureLoader().load(options[option])
        if (this.isMatCap) {
            (<THREE.MeshMatcapMaterial>(this.material)).matcap = matcapTexture
        } else {
            console.log("This material is not a matcap material")
        }

    }

    public loadEnvironmentTexture() {
        const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/ny_50.png", "img/pz_50.png", "img/nz_50.png"])
        envTexture.mapping = THREE.CubeReflectionMapping
        envTexture.mapping = THREE.CubeRefractionMapping
        if (this.isPhong) {
            (<THREE.MeshPhongMaterial>(this.material)).envMap = envTexture
        }
    }

    public loadTone(gradientMap: string) {
        (<THREE.MeshToonMaterial>(this.material)).gradientMap = eval(gradientMap as any)
    }
}