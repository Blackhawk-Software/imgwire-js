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
  type UploadProgress
} from "../http/upload-with-progress.ts";

export type ImagesCreateOptions = {
  uploadToken?: string | null;
  requestInit?: RequestInit;
};

export type ImagesUploadOptions = ImagesCreateOptions & {
  customMetadata?: StandardUploadCreateSchema["custom_metadata"];
  fileName?: string;
  getUploadToken?: UploadTokenProvider;
  hashSha256?: string | null;
  idempotencyKey?: string | null;
  mimeType?: StandardUploadCreateSchema["mime_type"];
  onProgress?: (progress: UploadProgress) => void;
  purpose?: string | null;
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
    const uploadToken =
      options?.uploadToken ??
      (options?.getUploadToken
        ? await options.getUploadToken()
        : this.options.getUploadToken
          ? await this.options.getUploadToken()
          : undefined);

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
      {
        ...options,
        uploadToken
      }
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

  fetch(
    imageId: string,
    options?: ImagesFetchOptions
  ): Promise<ImgwireImage> {
    const request: ImagesRetrieveRequest = {
      imageId
    };

    return this.api
      .imagesRetrieve(request, options?.requestInit)
      .then(extendImage);
  }
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
