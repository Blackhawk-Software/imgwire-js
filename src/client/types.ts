export type ImgwireClientOptions = {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetch?: typeof fetch;
};
