import { mkdtemp, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { runGenerate } from "../scripts/_lib/generate.ts";
import { RAW_OPENAPI_PATH } from "../scripts/_lib/paths.ts";

describe("runGenerate", () => {
  it("generates the SDK from checked-in raw OpenAPI input", async () => {
    process.env.JAVA_HOME =
      "/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home";
    process.env.PATH = `/opt/homebrew/opt/openjdk@11/bin:${process.env.PATH}`;

    const tempRoot = await mkdtemp(resolve(tmpdir(), "imgwire-js-test-"));

    await runGenerate({
      source: RAW_OPENAPI_PATH,
      outputDir: resolve(tempRoot, "generated"),
      rawOutputPath: resolve(tempRoot, "openapi", "raw.openapi.json"),
      sdkOutputPath: resolve(tempRoot, "openapi", "sdk.openapi.json"),
      codegenVersionPath: resolve(tempRoot, "CODEGEN_VERSION")
    });

    await expect(
      stat(resolve(tempRoot, "generated", "src", "apis", "ImagesApi.ts"))
    ).resolves.toBeDefined();
    await expect(
      stat(resolve(tempRoot, "openapi", "sdk.openapi.json"))
    ).resolves.toBeDefined();
    await expect(
      stat(resolve(tempRoot, "CODEGEN_VERSION"))
    ).resolves.toBeDefined();
  }, 120000);
});
