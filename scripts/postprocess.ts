import { copyFile, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

import { GENERATED_DIR, REPO_ROOT } from "./_lib/paths.ts";

const GENERATED_ROOT_FILES_TO_REMOVE = new Set([
  ".gitignore",
  ".npmignore",
  ".openapi-generator-ignore",
  "git_push.sh",
  "package.json",
  "README.md",
  "tsconfig.esm.json",
  "tsconfig.json"
]);

export async function runPostprocess(options?: {
  generatedDir?: string;
}): Promise<void> {
  const generatedDir = options?.generatedDir ?? GENERATED_DIR;

  for (const name of GENERATED_ROOT_FILES_TO_REMOVE) {
    await rm(resolve(generatedDir, name), { force: true, recursive: true });
  }

  await rm(resolve(generatedDir, ".openapi-generator"), {
    force: true,
    recursive: true
  });

  const runtimePath = resolve(generatedDir, "src", "runtime.ts");
  const runtimeSource = await readFile(runtimePath, "utf8");
  if (!runtimeSource.includes("/* eslint-disable */")) {
    await writeFile(
      runtimePath,
      `/* eslint-disable */\n${runtimeSource}`,
      "utf8"
    );
  }

  const supportDir = resolve(REPO_ROOT, "src/transforms");
  const supportFiles = await readdir(supportDir);
  for (const fileName of supportFiles) {
    if (!fileName.endsWith(".ts")) {
      continue;
    }

    await copyFile(
      resolve(supportDir, fileName),
      resolve(generatedDir, "src", basename(fileName))
    );
  }

  await writeFile(
    resolve(generatedDir, "index.ts"),
    `export * from "./src/index";\n`,
    "utf8"
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await runPostprocess();
}
