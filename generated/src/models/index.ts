/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface CustomMetadataValue
 */
export interface CustomMetadataValue {
}
/**
 * 
 * @export
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
    /**
     * 
     * @type {Array<ValidationError>}
     * @memberof HTTPValidationError
     */
    detail?: Array<ValidationError>;
}
/**
 * 
 * @export
 * @interface ImageSchema
 */
export interface ImageSchema {
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    cdn_url: string;
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    created_at: string;
    /**
     * 
     * @type {{ [key: string]: CustomMetadataValue; }}
     * @memberof ImageSchema
     */
    custom_metadata: { [key: string]: CustomMetadataValue; };
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    deleted_at: string | null;
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    environment_id: string | null;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ImageSchema
     */
    exif_data: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    extension: string;
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    hash_sha256: string | null;
    /**
     * 
     * @type {number}
     * @memberof ImageSchema
     */
    height: number;
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    idempotency_key: string | null;
    /**
     * 
     * @type {SupportedMimeType}
     * @memberof ImageSchema
     */
    mime_type: SupportedMimeType;
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    original_filename: string;
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    processed_metadata_at: string | null;
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    purpose: string | null;
    /**
     * 
     * @type {number}
     * @memberof ImageSchema
     */
    size_bytes: number;
    /**
     * 
     * @type {ImageStatus}
     * @memberof ImageSchema
     */
    status: ImageStatus;
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    updated_at: string;
    /**
     * 
     * @type {string}
     * @memberof ImageSchema
     */
    upload_token_id: string | null;
    /**
     * 
     * @type {number}
     * @memberof ImageSchema
     */
    width: number;
}



/**
 * Represents the processing state for an image.
 * @export
 */
export const ImageStatus = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    READY: 'READY',
    QUARANTINE: 'QUARANTINE'
} as const;
export type ImageStatus = typeof ImageStatus[keyof typeof ImageStatus];

/**
 * 
 * @export
 * @interface LocationInner
 */
export interface LocationInner {
}
/**
 * 
 * @export
 * @interface StandardUploadCreateSchema
 */
export interface StandardUploadCreateSchema {
    /**
     * 
     * @type {number}
     * @memberof StandardUploadCreateSchema
     */
    content_length?: number | null;
    /**
     * 
     * @type {{ [key: string]: CustomMetadataValue; }}
     * @memberof StandardUploadCreateSchema
     */
    custom_metadata?: { [key: string]: CustomMetadataValue; };
    /**
     * 
     * @type {string}
     * @memberof StandardUploadCreateSchema
     */
    file_name: string;
    /**
     * 
     * @type {string}
     * @memberof StandardUploadCreateSchema
     */
    hash_sha256?: string | null;
    /**
     * 
     * @type {string}
     * @memberof StandardUploadCreateSchema
     */
    idempotency_key?: string | null;
    /**
     * 
     * @type {SupportedMimeType}
     * @memberof StandardUploadCreateSchema
     */
    mime_type?: SupportedMimeType;
    /**
     * 
     * @type {string}
     * @memberof StandardUploadCreateSchema
     */
    purpose?: string | null;
}


/**
 * 
 * @export
 * @interface StandardUploadResponseSchema
 */
export interface StandardUploadResponseSchema {
    /**
     * 
     * @type {ImageSchema}
     * @memberof StandardUploadResponseSchema
     */
    image: ImageSchema;
    /**
     * 
     * @type {string}
     * @memberof StandardUploadResponseSchema
     */
    upload_url: string;
}

/**
 * Represents supported image MIME types.
 * @export
 */
export const SupportedMimeType = {
    image_jpeg: 'image/jpeg',
    image_png: 'image/png',
    image_webp: 'image/webp',
    image_avif: 'image/avif',
    image_gif: 'image/gif'
} as const;
export type SupportedMimeType = typeof SupportedMimeType[keyof typeof SupportedMimeType];

/**
 * 
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     * 
     * @type {Array<LocationInner>}
     * @memberof ValidationError
     */
    loc: Array<LocationInner>;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    msg: string;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    type: string;
}
