# @iov/lisk

[![npm version](https://img.shields.io/npm/v/@iov/lisk.svg)](https://www.npmjs.com/package/@iov/lisk)

## Getting started

This is how you use `liskCodec` and `LiskKeyringEntry` to generate send transactions
for Lisk manually, i.e. without the help of @iov/core.

The following example is made for use in @iov/cli and you may need to include some
missing symbols if used in a different environment.

```ts
import { liskCodec, LiskKeyringEntry } from "@iov/lisk";

const liskTestnet = "da3ed6a45429278bac2666961289ca17ad86595d33b31037615d4b8e8f158bba" as ChainId;

const entry = new LiskKeyringEntry();
const mainIdentity = await entry.createIdentity("oxygen fall sure lava energy veteran enroll frown question detail include maximum");

const recipientAddress = Encoding.toAscii("6076671634347365051L") as Address;

const sendTx: SendTx = {
  kind: TransactionKind.Send,
  chainId: liskTestnet,
  signer: mainIdentity.pubkey,
  recipient: recipientAddress,
  memo: "We ❤️ developers – iov.one",
  amount: {
    whole: 2,
    fractional: 44550000,
    tokenTicker: "LSK" as TokenTicker,
  }
};

// Encode creation timestamp into nonce
const nonce = Long.fromNumber(Math.floor(Date.now() / 1000)) as Nonce;
const signingJob = liskCodec.bytesToSign(sendTx, nonce);
const signature = await entry.createTransactionSignature(mainIdentity, signingJob.bytes, signingJob.prehashType, liskTestnet);

const signedTransaction = {
  transaction: sendTx,
  primarySignature: {
    nonce: nonce,
    publicKey: mainIdentity.pubkey,
    signature: signature,
  },
  otherSignatures: [],
};

// Signed transacion you can POST to
// https://testnet.lisk.io/api/transactions
const bytesToPost = Encoding.fromUtf8(liskCodec.bytesToPost(signedTransaction));
console.log(bytesToPost);
```

## License

This package is part of the IOV-Core repository, licensed under the Apache License 2.0
(see [NOTICE](https://github.com/iov-one/iov-core/blob/master/NOTICE) and [LICENSE](https://github.com/iov-one/iov-core/blob/master/LICENSE)).
