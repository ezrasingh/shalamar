import { useEffect } from "react";
//import { useFrame } from "@react-three/fiber";
import { Group, Intersection, Object3D } from "three";
import { useEngine } from "../services/store";

export interface SystemOptions {
  hooks: {
    onObjectClick?: (object: Object3D) => void;
    onObjectHover?: (objects: Intersection<Object3D>[], cycle: number) => void;
    onPointerMissed?: () => void;
  };
}

export function useSystem(
  sceneRef?: React.MutableRefObject<Group>,
  options?: SystemOptions
) {
  const engine = useEngine();
  useEffect(() => {
    if (sceneRef?.current) engine.bindScene(sceneRef.current);
  }, [sceneRef, engine]);

  // useFrame(({ clock, scene: globalScene }) => {
  //   // const timeDelta = clock.getDelta();
  //   // ? for(const [objectId, updateHandler] of state.systems.update.entries()){
  //   // ?  const object = scene.getObjectById(objectId);
  //   // ?  if(object) updateHandler(object, timeDelta, { clock, scene });
  //   // ? }
  // });

  return {
    onClick(object: Object3D) {
      if (options?.hooks.onObjectClick) options.hooks.onObjectClick(object);
      // ? state.systems.onClick.get(object.uuid)?(object)
      return null;
    },
    onHover(objects: Intersection<Object3D>[], cycle: number) {
      if (options?.hooks.onObjectHover)
        options.hooks.onObjectHover(objects, cycle);
      // ? state.systems.onHover.get(object.uuid)?(object)
      return null;
    },
    onPointerMissed() {
      if (options?.hooks.onPointerMissed) options.hooks.onPointerMissed();
    },
  };
}
