import { Injectable, OnInit } from '@angular/core';

import * as Web3 from 'web3';
import { resolve } from 'url';

declare let require: any;
declare let window: any;

let tokenAbi = require('./tokenContract.json');

@Injectable()
export class ContractsService {
  private _account: string = null;
  private _web3: any;

  private _tokenContract: any;
  private _tokenContractAddress: string = "0x625Affe5F8a745880033607011AF89d14DEaB1fD";

  constructor() {
    this._web3 = new Web3(new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io"))
    this._tokenContract = new this._web3.eth.Contract(tokenAbi,this._tokenContractAddress)    
  }


  public async getRound(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._tokenContract.methods.round().call(function (err, result) {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async getAmountAccepted(): Promise<number> {
    return new Promise((resolve, reject) => {
      
      this._tokenContract.methods.amountAccepted().call(function (err, result) {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async getEvents(): Promise<string> {
    return new Promise((resolve, reject) => {

      this._tokenContract.getPastEvents('allEvents', {
        fromBlock: 0,
        toBlock: 'latest'
      }, function (error, events) { console.log(events); })
        .then(function (events) {
          console.log(events) // same results as the optional callback above
        });
      resolve("");
    }) as Promise<string>;
  }
}
