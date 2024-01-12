import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export const parseFileExtension = (filename?: string) =>
  filename?.split(".").pop()?.toLocaleLowerCase() ?? "";

export async function loadModel(model: File): Promise<THREE.Object3D> {
  const modelFileType = parseFileExtension(model.name);
  if (modelFileType === "fbx") {
    const loader = new FBXLoader();
    const buffer = await model.arrayBuffer();
    const obj = loader.parse(buffer, "");
    if (obj instanceof THREE.Object3D) return obj;
  }
  if (modelFileType === "gltf") {
    const loader = new GLTFLoader();
    const buffer = await model.arrayBuffer();
    const obj = await loader.parseAsync(buffer, "");
    if (obj instanceof THREE.Object3D) return obj;
  }
  if (modelFileType === "obj") {
    const blob = new Blob([model]);
    const loader = new OBJLoader();
    const obj = loader.parse(URL.createObjectURL(blob));
    if (obj instanceof THREE.Object3D) return obj;
  }
  return new THREE.Group();
}
