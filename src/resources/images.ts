import {
  ImagesApi,
  type ImagesCreateRequest
} from "../../generated/src/apis/ImagesApi.ts";
import type {
  ImageSchema,
  StandardUploadCreateSchema,
  StandardUploadResponseSchema
} from "../../generated/src/models/index.ts";
import type { Configuration } from "../../generated/src/runtime.ts";
import type { XmlHttpRequestFactory } from "../client/types.ts";
import {
  uploadWithProgress,
  type UploadProgress
} from "../http/upload-with-progress.ts";

export type ImagesCreateOptions = {
  environmentId?: string | null;
  uploadToken?: string | null;
  requestInit?: RequestInit;
};

export type ImagesUploadOptions = ImagesCreateOptions & {
  customMetadata?: StandardUploadCreateSchema["custom_metadata"];
  fileName?: string;
  hashSha256?: string | null;
  idempotencyKey?: string | null;
  mimeType?: StandardUploadCreateSchema["mime_type"];
  onProgress?: (progress: UploadProgress) => void;
  purpose?: string | null;
  signal?: AbortSignal;
};

type ImagesResourceOptions = {
  timeoutMs?: number;
  xhrFactory?: XmlHttpRequestFactory;
};

export class ImagesResource {
  private readonly api: ImagesApi;
  private readonly options: ImagesResourceOptions;

  constructor(
    configuration: Configuration,
    options: ImagesResourceOptions = {}
  ) {
    this.api = new ImagesApi(configuration);
    this.options = options;
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

  async upload(
    file: File,
    options?: ImagesUploadOptions
  ): Promise<ImageSchema> {
    const response = await this.create(
      {
        content_length: file.size,
        custom_metadata: options?.customMetadata,
        file_name: options?.fileName ?? file.name,
        hash_sha256: options?.hashSha256,
        idempotency_key: options?.idempotencyKey,
        mime_type: options?.mimeType ?? normalizeMimeType(file.type),
        purpose: options?.purpose
      },
      options
    );

    await uploadWithProgress(response.upload_url, file, {
      contentType:
        options?.mimeType ?? normalizeMimeType(file.type) ?? undefined,
      onProgress: options?.onProgress,
      signal: options?.signal,
      timeoutMs: this.options.timeoutMs,
      xhrFactory: this.options.xhrFactory
    });

    return response.image;
  }
}

function normalizeMimeType(
  mimeType: string
): StandardUploadCreateSchema["mime_type"] | undefined {
  return mimeType
    ? (mimeType as StandardUploadCreateSchema["mime_type"])
    : undefined;
}
