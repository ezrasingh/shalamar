import * as THREE from "three";
import { hexColorToInt } from "@editor/common/helpers";

export const geometryBuilders = {
  "2D": {
    Plane: THREE.PlaneGeometry,
    Circle: THREE.CircleGeometry,
    Ring: THREE.RingGeometry,
  },
  "3D": {
    Box: THREE.BoxGeometry,
    Sphere: THREE.SphereGeometry,
    Cylinder: THREE.CylinderGeometry,
    Cone: THREE.ConeGeometry,
    Torus: THREE.TorusGeometry,
    "Torus Knot": THREE.TorusKnotGeometry,
    // Polyhedron: THREE.PolyhedronGeometry, // how do we configure vertices?
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

export const DEFAULT_GEOMETRY = new THREE.SphereGeometry();
export const DEFAULT_MATERIAL = new THREE.MeshPhongMaterial({
  color: 0xff0000,
});
export const DEFAULT_MESH = new THREE.Mesh(DEFAULT_GEOMETRY, DEFAULT_MATERIAL);

export function objectFactory(
  color: string,
  geometry: THREE.BufferGeometry,
  material: THREE.Material
): THREE.Mesh {
  // @ts-ignore
  if (material?.color) material.color.setHex(hexColorToInt(color));
  return new THREE.Mesh(geometry, material);
}
