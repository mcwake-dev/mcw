const Forge = require("node-forge");

function createKeys() {
  const bits = process.env.BITS;
  Forge.pki.rsa.generateKeyPair(bits, (error, keys) => {
    console.log({
      privateKey: Forge.pki.privateKeyToPem(keys.privateKey),
      publicKey: Forge.pki.publicKeyToPem(keys.publicKey),
    });
  });
}

createKeys();
