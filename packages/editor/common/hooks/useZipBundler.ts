import type { ProjectConfig } from "@engine/userConfig";
import { useCallback, useEffect, useState } from "react";
import Zip from "jszip";

async function buildArchive(
  project: ProjectConfig,
  callback: (blob: Blob) => void
): Promise<void> {
  const zip = new Zip();

  async function storeResource(path: string, resource: object) {
    for (const [name, resourceUrl] of Object.entries(resource)) {
      fetch(resourceUrl);
      zip.file(`${path}/${name}`, new Blob());
    }
  }

  await storeResource("assets/models", project.models);
  await storeResource("assets/animations", project.animations);
  await storeResource("scripts", project.scripts);
  await storeResource("scenes", project.scenes);

  zip.file("project.json", JSON.stringify(project, null, 2));
  const blob = await zip.generateAsync<"blob">();
  callback(blob);
}

export function useZipBundler(project: ProjectConfig) {
  const [blob, setBlob] = useState<Blob>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    buildArchive(project, setBlob);
  }, [project]);

  // ? remove old URL from memory
  useEffect(() => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [blob]);

  // ? return callback to download bundle
  return useCallback(() => {
    const bundleName = project.name.toLocaleLowerCase().replace(/\s+/g, "-");
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = `${bundleName}.zip`;
    link.click();
  }, [url, project]);
}
