import { ImagesApi, type ImagesCreateRequest } from "../../generated/src/apis/ImagesApi.ts";
import type { StandardUploadCreateSchema, StandardUploadResponseSchema } from "../../generated/src/models/index.ts";
import type { Configuration } from "../../generated/src/runtime.ts";

export type ImagesCreateOptions = {
  environmentId?: string | null;
  uploadToken?: string | null;
  requestInit?: RequestInit;
};

export class ImagesResource {
  private readonly api: ImagesApi;

  constructor(configuration: Configuration) {
    this.api = new ImagesApi(configuration);
  }

  create(
    body: StandardUploadCreateSchema,
    options?: ImagesCreateOptions
  ): Promise<StandardUploadResponseSchema> {
    const request: ImagesCreateRequest = {
      standardUploadCreateSchema: body,
      uploadToken: options?.uploadToken,
      xEnvironmentId: options?.environmentId
    };

    return this.api.imagesCreate(request, options?.requestInit);
  }
}
