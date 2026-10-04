// Type declarations for the workerd-provided "cloudflare:email" module
// (send_email binding). Not a real npm package — resolved natively inside
// the worker runtime; this only satisfies TypeScript.
declare module 'cloudflare:email' {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string);
    readonly from: string;
    readonly to: string;
    readonly raw: string;
    setReject(reason: string): void;
    forward(destination: string, headers?: Headers): Promise<void>;
  }
}
