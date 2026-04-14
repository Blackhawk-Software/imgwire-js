export type XmlHttpRequestFactory = () => XMLHttpRequest;

export type ImgwireClientOptions = {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetch?: typeof fetch;
  xhrFactory?: XmlHttpRequestFactory;
};
