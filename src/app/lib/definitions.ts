export type apodDef = {
    imagemLink?: string;
    imagemText? : string;
    imagemTitle?: string;

  };

export type epicDef = {
  imagemLink?: string;
}


declare function RateLimitMiddleware(req: any, res: any, next: any): Promise<void>;


export { RateLimitMiddleware };