const HEADER = { 'X-ACCESS-KEY': '$2b$10$IrGxRMO0Y/IWdGtpEZ4LpebHb7y6klBFUUM5u9GlPgGzvpTdGqj3S' };
export const CONFIG = {
  headers: HEADER,
};

export const POSTS_URL = 'https://api.jsonbin.io/v3/b/63d98a20c0e7653a056af25e';

// use 2 urls, because jsonbin.io service doesn't allow json file more than 100kb
export const DETAILS_URL = 'https://api.jsonbin.io/v3/b/63d98c1aebd26539d071b550';
