<template>
    <section>
        <ViewBalance/>
        <CreateTransaction/>
    </section>
</template>

<script>
// @ is an alias to /src
require("dotenv").config();
import CreateTransaction from '@/components/CreateTransaction.vue'
import ViewBalance from '@/components/ViewBalance.vue'

export default {
  name: 'home',
  components: {
    CreateTransaction,
    ViewBalance
  }
}
</script>
