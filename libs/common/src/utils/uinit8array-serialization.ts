export function serializeUint8Array(uinit8Array: Uint8Array): string {
  return Buffer.from(uinit8Array).toString('base64');
}

export function deserializeUint8Array(base64String: string) {
  return new Uint8Array(Buffer.from(base64String, 'base64'));
}
