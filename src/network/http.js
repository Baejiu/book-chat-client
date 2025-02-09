import axios from 'axios';
import axiosRetry from 'axios-retry';

const defaultRetryConfig = {
  retries: 5,
  initialDelayMs: 100,
};
export default class HttpClient {
  constructor(
    baseURL,
    authErrorEventBus,
    getCsrfToken,
    config = defaultRetryConfig
  ) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;
    this.client = axios.create({
      baseURL: baseURL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    axiosRetry(this.client, {
      retries: config.retries,
      retryDelay: (retry) => {
        const delay = Math.pow(2, retry) * config.initialDelayMs;
        const jitter = delay * 0.1 * Math.random();
        return delay + jitter;
      },
      retryCondition: (err) =>
        axiosRetry.isNetworkOrIdempotentRequestError(err) ||
        err.response.status === 429,
    });
  }
  async fetch(url, options) {
    const { body, method, headers } = options;
    const request = {
      url,
      method,
      headers: {
        ...headers,
        '_csrf-token': this.getCsrfToken(),
      },
      data: body,
    };
    try {
      const res = await this.client(request);
      return res.data;
    } catch (err) {
      if (err.res) {
        const data = err.res.data;
        const message =
          data && data.message ? data.message : 'Someting went wrong!';

        if (err.res.status === 401) {
          this.authErrorEventBus.notify(err);
          return;
        }
        throw new Error(message);
      }
      throw new Error('connection error');
    }
  }
}
