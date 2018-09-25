<template>
  <div>
    <div class="is-size-5">
      <p class="p-transfer">Transfer VTX</p>
    </div>
    <div class="card">
    <div class="card-content has-text-left">
      <form @submit.prevent="transferVTX">
        <b-field label="Enter your Account ID*">
          <b-input v-model="from.account" placeholder="Account ID" required expanded/>
        </b-field>
        <b-field label="Enter your user public key">
          <b-input v-model="from.wallet" placeholder="Enter your user public key" expanded type="text"/>
        </b-field>
        <b-field label="Enter recipient's Account ID*">
          <b-input v-model="to.account" placeholder="Recipient's Account ID " required expanded type="text"/>
        </b-field>
        <b-field label="Enter recipient's user public key">
          <b-input v-model="to.wallet" placeholder="Recipient's user public key" expanded type="text"/>
        </b-field>
        <b-field label="VTX*">
          <b-input v-model="amount" placeholder="VTX number to transfer" required expanded type="text"/>
        </b-field>
        <b-field label="Add Note">
          <b-input v-model="comment" type="textarea" placeholder="Type a message to the recipient"></b-input>
        </b-field>
        <p class="control">
          <button class="button is-success">Send</button>
        </p>
      </form>
    </div>
    <b-modal :active.sync="isModalActive" has-modal-card>
      <div class="card">
        <div class="card-header is-size-5">
          <p>
            Transfer
          </p>
        </div>
        <div class="card-content">
          <p>
            {{ transferMessage }}
          </p>
        </div>
      </div>
    </b-modal>
  </div>
  </div>
</template>

<script>
require("dotenv").config();
import Ledger from '../ledger.js';
const httpEndpoint = process.env.HTTP_ENDPOINT;
const chainId = process.env.CHAIN_ID;
const keyProvider = process.env.KEY_PROVIDER;
//console.log(httpEndpoint, chainId, keyProvider)

const ledger = new Ledger({
  httpEndpoint: httpEndpoint,
  chainId: chainId,
  keyProvider: keyProvider
});
export default {
  data() {
    const data = {
      from: {
        account: "",
        wallet: ""
      },
      to: {
        account: "",
        wallet: ""
      },
      amount: "",
      comment: "",
      transferMessage: "",
      isModalActive: false,
      //balance: 0
    }
    return data;
  },
  methods: {
    async transferVTX() {
      // if (this.balance > this.amount) {
        const result = await ledger.recordTransfer({
          from: this.from,
          to: this.to,
          amount: this.amount,
          comment: this.comment
        });
        this.isModalActive = true;
        this.transferMessage = `You transfered ${result.amount} VTX from account ${result.from.account} to account ${result.to.account}`
      // } else {
      //   this.isModalActive = true;
      //   this.transferMessage = `Balance is not enough to make this transfer`
      // }
    }
  }
}
</script>

<style>
.card {
  width: 30rem;
  margin-top:1rem;
}
.p-transfer {
  margin-top: 1rem;
}
input:focus {
  border-color:aqua;
}
</style>
