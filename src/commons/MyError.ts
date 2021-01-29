export default class MyError extends Error {
  constructor(message?: string, private module: string = 'UNKNOWNERROR') {
    super(message);
  }

  toString():string {
    return `${this.module}::${this.message}`;
  }
}
