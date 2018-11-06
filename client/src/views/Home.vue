<template>
  <div class="home">
    <Header />
    <main>
      <div v-if="$store.state.userName === ''">
        <section class="hero is-fullheight is-primary is-bold has-text-left">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Login With Google
              </h1>
              <h2 class="subtitle">
                <a class="button is-medium is-info" v-on:click="$store.dispatch('login')">Login</a>
              </h2>
            </div>
          </div>
        </section>
      </div>
      <div class="container" v-else>
        <Row />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Row from '@/components/Row.vue';

@Component({
  components: {
    Header,
    Row,
  },
})
export default class Home extends Vue {}
</script>
