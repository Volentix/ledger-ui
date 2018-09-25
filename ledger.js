const Eos = require("eosjs");

const moment = require("moment");
const uuid = require("uuid");

const BOILERPLATE_ASSERTION_TEXT = "assertion failure with message: ";

export default class Ledger {
  constructor(config) {
    this.LEDGER_ACCOUNT_NAME = "stdvtxledger";
    this.TREASURY_ACCOUNT_NAME = "vtxtreasury";

    this.eos = Eos(
      Object.assign({}, config, {
        expireInSeconds: 60,
        verbose: false,
        debug: false,
        sign: true,
        authorization: this.LEDGER_ACCOUNT_NAME + "@active"
      })
    );
  }

  async retrieveBalance({ account, wallet }) {
    var output = await this.eos.getTableRows({
      code: 'stdvtxledger',
      scope: 'stdvtxledger',
      table: 'entry',
      json: true,
      limit: 100000
    });
     var amount = 0;
     console.log(Object.keys(output.rows).length)
     for (var i = 0; i < Object.keys(output.rows).length; i++) {
      if (wallet === "") {
        if (output.rows[i].fromAccount.localeCompare(account) == 0) {
          amount += output.rows[i].amount;
        }
        if (output.rows[i].toAccount.localeCompare(account) == 0) {
          amount += output.rows[i].amount;
        }
        console.log("Amount: "+ amount);
      }
      else  {
        if (output.rows[i].sToKey.localeCompare(wallet) == 0) {
          amount += output.rows[i].amount;
        }
        if (output.rows[i].fromKey.localeCompare(wallet) == 0) {
          amount +=  output.rows[i].amount;
        }
      }
     }
    return {
      amount,
      currency: "VTX"
    };
    stdvtxledger, stdvtxledger, entry;
  }



  async recordTransfer({ from, to, amount, comment }) {
    console.log("check: " + this.LEDGER_ACCOUNT_NAME + this.TREASURY_ACCOUNT_NAME);
    const contract = await this.eos.contract(this.LEDGER_ACCOUNT_NAME);

    const submittedAt = new Date();
    try {
      const transfer = await contract.rcrdtfr({
        s: "stdvtxledger",
        fromaccount: from.account,
        toaccount: to.account,
        amount,
        fromkey: from.wallet ? from.wallet : "",
        tokey: to.wallet ? to.wallet : "",
        nonce: uuid(),
        comment: comment ? comment : ""
      });
      console.log("recordTransfer: ", JSON.stringify(transfer, null, 2));
      return {
        from,
        to,
        amount,
        submittedAt: moment(submittedAt).format(),
        id: transfer.processed.id,
        currency: "VTX", // TODO Should be returned from server
        comment
      };
    } catch (eStr) {
      const e = JSON.parse(eStr);
      // { "code": 500, "message": "Internal Service Error", "error": { "code": 3050003, "name": "eosio_assert_message_exception", "what": "eosio_assert_message assertion failure", "details": [{ "message": "assertion failure with message: insufficient_funds", "file": "wasm_interface.cpp", "line_number": 930, "method": "eosio_assert" }, { "message": "pending console output: Wallet to account", "file": "apply_context.cpp", "line_number": 61, "method": "exec_one" }] } }

      if (
        e.error &&
        e.error.details &&
        e.error.details[0] &&
        e.error.details[0].message &&
        e.error.details[0].message.startsWith(BOILERPLATE_ASSERTION_TEXT)
      ) {
        e.name = e.error.details[0].message.slice(
          BOILERPLATE_ASSERTION_TEXT.length
        );
      }

      throw e;
    }

  }
  // Retrieve all transactions performed from / to this account & wallet
  async retrieveTransactions({ account, wallet, limit }) {
    var output = await this.eos.getTableRows({
      code: 'stdvtxledger',
      scope: 'stdvtxledger',
      table: 'entry',
      json: true,
      limit: 100000,
    });
    var output1 = [];
    //console.log("wallet" + wallet);
     for (var i = 0; i < Object.keys(output.rows).length; i++) {
      if (wallet === "") {
        //console.log("test");
        //output1.push(output);
        if (output.rows[i].fromAccount.localeCompare(account) == 0) {
          output1.push(output.rows[i]);
        }
        if (output.rows[i].toAccount.localeCompare(account) == 0) {
          output1.push(output.rows[i]);
        }
      }
      else  {
        if (output.rows[i].sToKey.localeCompare(wallet) == 0) {
          output1.push(output.rows[i]);
        }
        if (output.rows[i].fromKey.localeCompare(wallet) == 0) {
          output1.push(output.rows[i]);
        }
      }
     }
     if (account === "" && wallet === "") {
       output1.push(output.rows)
     }
    output1.splice(0, Object.keys(output1).length - limit);
    //console.log("output: " + output1);
    return {
      output1
    };

    stdvtxledger, stdvtxledger, entry;
  }
}

//module.exports = Ledger;
