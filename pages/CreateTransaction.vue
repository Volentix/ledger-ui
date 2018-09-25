<template>
    <section>
      <CreateTransaction/>
    </section>
</template>

<script>
// @ is an alias to /src
require("dotenv").config();
import CreateTransaction from '@/components/CreateTransaction.vue'

export default {
  name: 'home',
  components: {
    CreateTransaction
  }
}
</script>
