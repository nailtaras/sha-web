// https://cdn.jsdelivr.net/npm/hash-wasm@4.12.0/dist/index.umd.min.js
importScripts('index.umd.min.js');

self.onmessage = async function (e) {
  const { algorithm, text, iterations } = e.data;
  let input = text;

  for (let i = 0; i < iterations; i++) {
    if (algorithm === 'SHA-256') {
      input = await hashwasm.sha256(input);
    } else if (algorithm === 'SHA-512') {
      input = await hashwasm.sha512(input);
    } else {
      self.postMessage({ error: 'Unsupported algorithm' });
      return;
    }

    // Allow the flow to "breathe"
    //if (i % 500 === 0) await new Promise(r => setTimeout(r, 0));
  }

  self.postMessage({ hash: input });
};