// This module exposes translators for multiple tendermint versions
// Pick a version that matches the server to properly encode the data types

import { JsonRpcRequest } from "./common";
import * as requests from "./requests";
import { v0_20 as v0_20_ } from "./v0-20";

// tslint:disable-next-line:variable-name
export const v0_20: Adaptor = v0_20_;

export interface Adaptor {
  readonly params: Params;
  // readonly response: Response;
}

export interface Params {
  readonly encodeAbciInfo: (req: requests.AbciInfoRequest) => JsonRpcRequest;
  readonly encodeAbciQuery: (req: requests.AbciQueryRequest) => JsonRpcRequest;
  readonly encodeBlock: (req: requests.BlockRequest) => JsonRpcRequest;
  readonly encodeBlockchain: (req: requests.BlockchainRequest) => JsonRpcRequest;
  readonly encodeBlockResults: (req: requests.BlockResultsRequest) => JsonRpcRequest;
  readonly encodeBroadcastTx: (req: requests.BroadcastTxRequest) => JsonRpcRequest;
  readonly encodeCommit: (req: requests.CommitRequest) => JsonRpcRequest;
  readonly encodeGenesis: (req: requests.GenesisRequest) => JsonRpcRequest;
  readonly encodeHealth: (req: requests.HealthRequest) => JsonRpcRequest;
  readonly encodeStatus: (req: requests.StatusRequest) => JsonRpcRequest;
  readonly encodeTx: (req: requests.TxRequest) => JsonRpcRequest;
  readonly encodeTxSearch: (req: requests.TxSearchRequest) => JsonRpcRequest;
  readonly encodeValidators: (req: requests.ValidatorsRequest) => JsonRpcRequest;
}
