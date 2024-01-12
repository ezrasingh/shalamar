import * as THREE from "three";

export const lightingBuilders = {
  default: {
    Ambient: THREE.AmbientLight,
    Directional: THREE.DirectionalLight,
  },
};

export const materialBuilders = {
  default: {
    Basic: THREE.MeshBasicMaterial,
    Standard: THREE.MeshStandardMaterial,
    Lambert: THREE.MeshLambertMaterial,
    Phong: THREE.MeshPhongMaterial,
  },
};

export const DEFAULT_MATERIAL_COLOR = 0x0000fa;

export const DEFAULT_MATERIAL = new THREE.MeshPhongMaterial({
  color: DEFAULT_MATERIAL_COLOR,
});
export const DEFAULT_LIGHT = new THREE.AmbientLight(0xffffff, 0.5);
