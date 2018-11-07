<template>
  <div class="home">
    <Header />
    <main>
      <Login v-if="$store.state.userName === ''" />
      <div class="container" v-else>
        <Row />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Login from '@/components/Login.vue';
import Row from '@/components/Row.vue';

@Component({
  components: {
    Header,
    Login,
    Row,
  },
})
export default class Home extends Vue {}
</script>
