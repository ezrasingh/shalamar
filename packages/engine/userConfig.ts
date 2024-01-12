import type { CanvasProps } from "@react-three/fiber";

type KeyValue<K extends string | number | symbol, V> = {
  [key in K]: V;
};

export interface ObjectConfig {
  children: Array<ObjectConfig>;
}

export interface SceneConfig {
  viewport: Pick<
    CanvasProps,
    "dpr" | "frameloop" | "shadows" | "flat" | "orthographic"
  > & {
    camera?: {
      fov?: number;
      near?: number;
      far?: number;
      position?: [number, number, number];
    };
  };
  data: string; // ? base 64 encoded Object3D.toJSON()
}

export interface ProjectConfig {
  name: string;
  models: KeyValue<string, string>;
  animations: KeyValue<string, string>;
  scenes: KeyValue<string, SceneConfig>;
  scripts: KeyValue<string, string>; // ? base 64 encoded Javascript source or url
}

export const DEFAULT_USER_CONFIG: ProjectConfig = {
  name: "Default Project",
  models: {},
  animations: {},
  scenes: {
    default: {
      viewport: {
        dpr: [1, 2],
        frameloop: "always",
        shadows: false,
        flat: false,
        orthographic: false,
        camera: { fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] },
      },
      data: "eyJtZXRhZGF0YSI6eyJ2ZXJzaW9uIjo0LjYsInR5cGUiOiJPYmplY3QiLCJnZW5lcmF0b3IiOiJPYmplY3QzRC50b0pTT04ifSwiZ2VvbWV0cmllcyI6W3sidXVpZCI6IjFjNTk4M2Q3LWE3NTctNDU2My1hY2MxLWJlNjI0NmYzMzBhMiIsInR5cGUiOiJCb3hHZW9tZXRyeSIsIndpZHRoIjoxLCJoZWlnaHQiOjEsImRlcHRoIjoxLCJ3aWR0aFNlZ21lbnRzIjoxLCJoZWlnaHRTZWdtZW50cyI6MSwiZGVwdGhTZWdtZW50cyI6MX0seyJ1dWlkIjoiY2RlYzY5Y2YtODk0NS00ODgwLWE1ZWYtYzk4ZDkwOWIwOWM1IiwidHlwZSI6IkJveEdlb21ldHJ5Iiwid2lkdGgiOjEsImhlaWdodCI6MSwiZGVwdGgiOjEsIndpZHRoU2VnbWVudHMiOjEsImhlaWdodFNlZ21lbnRzIjoxLCJkZXB0aFNlZ21lbnRzIjoxfV0sIm1hdGVyaWFscyI6W3sidXVpZCI6IjE5OWQzYjRjLWNlMTItNDE4OS1iMDgzLTI1NWQ4NTAyNjg5NiIsInR5cGUiOiJNZXNoQmFzaWNNYXRlcmlhbCIsImNvbG9yIjo2NTI4MCwicmVmbGVjdGl2aXR5IjoxLCJyZWZyYWN0aW9uUmF0aW8iOjAuOTgsImRlcHRoRnVuYyI6MywiZGVwdGhUZXN0Ijp0cnVlLCJkZXB0aFdyaXRlIjp0cnVlLCJjb2xvcldyaXRlIjp0cnVlLCJzdGVuY2lsV3JpdGUiOmZhbHNlLCJzdGVuY2lsV3JpdGVNYXNrIjoyNTUsInN0ZW5jaWxGdW5jIjo1MTksInN0ZW5jaWxSZWYiOjAsInN0ZW5jaWxGdW5jTWFzayI6MjU1LCJzdGVuY2lsRmFpbCI6NzY4MCwic3RlbmNpbFpGYWlsIjo3NjgwLCJzdGVuY2lsWlBhc3MiOjc2ODB9LHsidXVpZCI6Ijk4NTJlMDA0LTIwYTktNDI1MS1iZTAzLTAwY2EwZGNjNGM5ZCIsInR5cGUiOiJNZXNoQmFzaWNNYXRlcmlhbCIsImNvbG9yIjo2NTI4MCwicmVmbGVjdGl2aXR5IjoxLCJyZWZyYWN0aW9uUmF0aW8iOjAuOTgsImRlcHRoRnVuYyI6MywiZGVwdGhUZXN0Ijp0cnVlLCJkZXB0aFdyaXRlIjp0cnVlLCJjb2xvcldyaXRlIjp0cnVlLCJzdGVuY2lsV3JpdGUiOmZhbHNlLCJzdGVuY2lsV3JpdGVNYXNrIjoyNTUsInN0ZW5jaWxGdW5jIjo1MTksInN0ZW5jaWxSZWYiOjAsInN0ZW5jaWxGdW5jTWFzayI6MjU1LCJzdGVuY2lsRmFpbCI6NzY4MCwic3RlbmNpbFpGYWlsIjo3NjgwLCJzdGVuY2lsWlBhc3MiOjc2ODB9XSwib2JqZWN0Ijp7InV1aWQiOiIxNmZkMGE2NS1lZmFkLTQyMWQtOGFkMS1hN2RkMGYyMmI2YzgiLCJ0eXBlIjoiR3JvdXAiLCJsYXllcnMiOjEsIm1hdHJpeCI6WzEsMCwwLDAsMCwxLDAsMCwwLDAsMSwwLDAsMCwwLDFdLCJ1cCI6WzAsMSwwXSwiY2hpbGRyZW4iOlt7InV1aWQiOiJiMTdlNmQ5Mi0wM2Y2LTQ5MDUtODc3Ny02MDU0MzQwYTI0NGIiLCJ0eXBlIjoiTWVzaCIsImxheWVycyI6MSwibWF0cml4IjpbMSwwLDAsMCwwLDEsMCwwLDAsMCwxLDAsMCwwLDAsMV0sInVwIjpbMCwxLDBdLCJnZW9tZXRyeSI6IjFjNTk4M2Q3LWE3NTctNDU2My1hY2MxLWJlNjI0NmYzMzBhMiIsIm1hdGVyaWFsIjoiMTk5ZDNiNGMtY2UxMi00MTg5LWIwODMtMjU1ZDg1MDI2ODk2In0seyJ1dWlkIjoiNmVhODM5NjAtOGNmOC00ZWJiLThkNGQtMmM1ZDg5ZTg5NGEzIiwidHlwZSI6Ik1lc2giLCJsYXllcnMiOjEsIm1hdHJpeCI6WzEsMCwwLDAsMCwxLDAsMCwwLDAsMSwwLDAsMCwwLDFdLCJ1cCI6WzAsMSwwXSwiZ2VvbWV0cnkiOiJjZGVjNjljZi04OTQ1LTQ4ODAtYTVlZi1jOThkOTA5YjA5YzUiLCJtYXRlcmlhbCI6Ijk4NTJlMDA0LTIwYTktNDI1MS1iZTAzLTAwY2EwZGNjNGM5ZCJ9XX19",
    },
  },
  scripts: {},
};

export function createUserConfig(
  name: string,
  viewport: Partial<SceneConfig["viewport"]>
): ProjectConfig {
  return {
    name: name,
    models: {},
    animations: {},
    scripts: {},
    scenes: {
      default: {
        viewport: {
          ...DEFAULT_USER_CONFIG.scenes.default.viewport,
          ...viewport,
        },
        data: "",
      },
    },
  };
}
