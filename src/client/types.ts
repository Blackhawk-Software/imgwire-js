export type XmlHttpRequestFactory = () => XMLHttpRequest;
export type UploadTokenProvider = () => Promise<string>;

export type ImgwireClientOptions = {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetch?: typeof fetch;
  getUploadToken?: UploadTokenProvider;
  xhrFactory?: XmlHttpRequestFactory;
};
