import {
  ImagesApi,
  type ImagesCreateRequest,
  type ImagesRetrieveRequest
} from "../../generated/src/apis/ImagesApi.ts";
import type {
  ImageSchema,
  StandardUploadCreateSchema,
  StandardUploadResponseSchema
} from "../../generated/src/models/index.ts";
import type { Configuration } from "../../generated/src/runtime.ts";
import type {
  UploadTokenProvider,
  XmlHttpRequestFactory
} from "../client/types.ts";
import { extendImage, type ImgwireImage } from "../images/url-builder.ts";
import {
  uploadWithProgress,
  type UploadRequestBody,
  type UploadProgress
} from "../http/upload-with-progress.ts";

export type ImagesCreateOptions = {
  uploadToken?: string | null;
  requestInit?: RequestInit;
};

type ImagesUploadSharedOptions = ImagesCreateOptions & {
  customMetadata?: StandardUploadCreateSchema["custom_metadata"];
  getUploadToken?: UploadTokenProvider;
  hashSha256?: string | null;
  idempotencyKey?: string | null;
  purpose?: string | null;
};

export type ImagesUploadOptions = ImagesUploadSharedOptions & {
  fileName?: string;
  mimeType?: StandardUploadCreateSchema["mime_type"];
  onProgress?: (progress: UploadProgress) => void;
  signal?: AbortSignal;
};

export type ImagesUploadRawInput = ImagesUploadSharedOptions & {
  contentLength: number;
  data: ArrayBuffer | Uint8Array;
  fileName: string;
  mimeType?: StandardUploadCreateSchema["mime_type"];
};

export type ImagesUploadRawWithProgressInput = ImagesUploadRawInput & {
  onProgress?: (progress: UploadProgress) => void;
  signal?: AbortSignal;
};

export type ImagesFetchOptions = {
  requestInit?: RequestInit;
};

export type StandardUploadResponse = Omit<
  StandardUploadResponseSchema,
  "image"
> & {
  image: ImgwireImage;
};

type ImagesResourceOptions = {
  getUploadToken?: UploadTokenProvider;
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
  ): Promise<StandardUploadResponse> {
    const request: ImagesCreateRequest = {
      standardUploadCreateSchema: body,
      uploadToken: options?.uploadToken
    };

    return this.api
      .imagesCreate(request, options?.requestInit)
      .then(extendStandardUploadResponse);
  }

  async upload(
    file: File,
    options?: ImagesUploadOptions
  ): Promise<ImgwireImage> {
    return this.uploadBody(file, {
      contentLength: file.size,
      customMetadata: options?.customMetadata,
      fileName: options?.fileName ?? file.name,
      hashSha256: options?.hashSha256,
      idempotencyKey: options?.idempotencyKey,
      mimeType: options?.mimeType ?? normalizeMimeType(file.type),
      onProgress: options?.onProgress,
      purpose: options?.purpose,
      signal: options?.signal,
      uploadToken: options?.uploadToken,
      getUploadToken: options?.getUploadToken,
      requestInit: options?.requestInit
    });
  }

  async uploadRaw(input: ImagesUploadRawInput): Promise<ImgwireImage> {
    return this.uploadBody(input.data, input);
  }

  async uploadRawWithProgress(
    input: ImagesUploadRawWithProgressInput
  ): Promise<ImgwireImage> {
    return this.uploadBody(input.data, input);
  }

  private async uploadBody(
    body: UploadRequestBody,
    options: {
      contentLength: number;
      customMetadata?: StandardUploadCreateSchema["custom_metadata"];
      fileName: string;
      getUploadToken?: UploadTokenProvider;
      hashSha256?: string | null;
      idempotencyKey?: string | null;
      mimeType?: StandardUploadCreateSchema["mime_type"];
      onProgress?: (progress: UploadProgress) => void;
      purpose?: string | null;
      requestInit?: RequestInit;
      signal?: AbortSignal;
      uploadToken?: string | null;
    }
  ): Promise<ImgwireImage> {
    const uploadToken = await resolveUploadToken(options, this.options);

    const response = await this.create(
      {
        content_length: options.contentLength,
        custom_metadata: options.customMetadata,
        file_name: options.fileName,
        hash_sha256: options.hashSha256,
        idempotency_key: options.idempotencyKey,
        mime_type: options.mimeType,
        purpose: options.purpose
      },
      {
        requestInit: options.requestInit,
        uploadToken
      }
    );

    await uploadWithProgress(response.upload_url, body, {
      contentType: options.mimeType,
      onProgress: options.onProgress,
      signal: options.signal,
      timeoutMs: this.options.timeoutMs,
      xhrFactory: this.options.xhrFactory
    });

    return response.image;
  }

  fetch(imageId: string, options?: ImagesFetchOptions): Promise<ImgwireImage> {
    const request: ImagesRetrieveRequest = {
      imageId
    };

    return this.api
      .imagesRetrieve(request, options?.requestInit)
      .then(extendImage);
  }
}

function resolveUploadToken(
  localOptions: Pick<
    ImagesUploadSharedOptions,
    "getUploadToken" | "uploadToken"
  >,
  globalOptions: Pick<ImagesResourceOptions, "getUploadToken">
): Promise<string | undefined> {
  if (localOptions.uploadToken != null) {
    return Promise.resolve(localOptions.uploadToken);
  }

  if (localOptions.getUploadToken) {
    return localOptions.getUploadToken();
  }

  if (globalOptions.getUploadToken) {
    return globalOptions.getUploadToken();
  }

  return Promise.resolve(undefined);
}

function normalizeMimeType(
  mimeType: string
): StandardUploadCreateSchema["mime_type"] | undefined {
  return mimeType
    ? (mimeType as StandardUploadCreateSchema["mime_type"])
    : undefined;
}

function extendStandardUploadResponse(
  response: StandardUploadResponseSchema
): StandardUploadResponse {
  return {
    ...response,
    image: extendImage(response.image)
  };
}
