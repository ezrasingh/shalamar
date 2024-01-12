import { ObjectLoader, Object3D } from "three";

export function serializeScene(sceneRoot: Object3D) {
  const jsonData = sceneRoot.toJSON();
  const json = JSON.stringify(jsonData);
  return btoa(json);
}

export function deserializeScene(sceneEncodedJson: string) {
  const sceneData = JSON.parse(atob(sceneEncodedJson));
  const loader = new ObjectLoader();
  return loader.parse(sceneData);
}