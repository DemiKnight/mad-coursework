export const APIURL = 'http://localhost:8080/';

export abstract class APIService {
  URLBuilder(followingSegment: string): string {
    return followingSegment;
  }
  // RequestBuilder(url: String): Fetch;
}

export interface APICaller {
  baseURL: string;
}
