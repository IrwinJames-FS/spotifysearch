const zip = (a: any[], b:any[]): any[] => a.flatMap((n:any, i:number)=>b.length > i ? [a[i], b[i]]:[a[i]]);

const zst = (a: TemplateStringsArray, b: any[]): string => zip(Array.from(a), b).join('');
export const green = (strings:TemplateStringsArray, ...args: any[]): string => `\x1b[32m${zst(strings, args)}\x1b[0m`;

export const red = (strings:TemplateStringsArray, ...args: any[]): string => `\x1b[31m${zst(strings, args)}\x1b[0m`;

export const blue = (strings:TemplateStringsArray, ...args: any[]): string => `\x1b[34m${zst(strings, args)}\x1b[0m`;

export const yellow = (strings:TemplateStringsArray, ...args: any[]): string => `\x1b[33m${zst(strings, args)}\x1b[0m`;

export const magenta = (strings:TemplateStringsArray, ...args: any[]): string => `\x1b[35m${zst(strings, args)}\x1b[0m`;

export const cyan = (strings:TemplateStringsArray, ...args: any[]): string => `\x1b[36m${zst(strings, args)}\x1b[0m`;

export const greenlg = (strings: TemplateStringsArray, ...args: any[]) => console.log(green(strings, ...args));

export const redlg = (strings: TemplateStringsArray, ...args: any[]) => console.log(red(strings, ...args));

export const b64 = (strings: TemplateStringsArray, ...args: any[]) => btoa(zst(strings, args))