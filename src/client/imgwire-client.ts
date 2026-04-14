import type { ImgwireClientOptions } from "./types.ts";
import { Configuration } from "../../generated/src/runtime.ts";
import { withTimeout } from "../http/with-timeout.ts";
import { ImagesResource } from "../resources/images.ts";

export class ImgwireClient {
  readonly options: ImgwireClientOptions;
  readonly images: ImagesResource;

  constructor(options: ImgwireClientOptions) {
    this.options = options;

    const fetchApi = options.fetch ?? globalThis.fetch;
    if (!fetchApi) {
      throw new Error(
        "ImgwireClient requires a fetch implementation. Pass options.fetch in non-browser environments."
      );
    }

    const configuration = new Configuration({
      apiKey: options.apiKey,
      basePath: options.baseUrl ?? "https://api.imgwire.dev",
      fetchApi: withTimeout(fetchApi, options.timeoutMs),
      headers: {
        Authorization: `Bearer ${options.apiKey}`
      }
    });

    this.images = new ImagesResource(configuration);
  }
}
