<template>
  <div class="home">
    <Header />
    <main>
      <Login v-if="$store.state.userName === ''" />
      <div class="column is-8 is-offset-2" v-else>
        <div class="box">
          <h3 class="title has-text-grey">Settings</h3>
          <div class="tabs">
            <ul>
              <li :class="{ 'is-active': $route.path === '/settings/general' }"><router-link to="/settings/general">General</router-link></li>
              <li :class="{ 'is-active': $route.path === '/settings/layout' }"><router-link to="/settings/layout">Layout</router-link></li>
              <li :class="{ 'is-active': $route.path === '/settings/tokens' }"><router-link to="/settings/tokens">Tokens</router-link></li>
            </ul>
          </div>
          <div v-if="$route.path === '/settings/general'">
            <h4 class="subtitle has-text-grey">General</h4>
            <div class="columns">
              <div class="column is-5">
                <strong>User Name</strong>
              </div>
              <div class="column">
                {{ $store.state.userName }}
              </div>
            </div>
            <div class="columns">
              <div class="column is-5">
                <strong>Show Header</strong>
                <p class="has-text-grey is-size-7">The only way to settings will be to know the url</p>
              </div>
              <div class="column">
                <label class="checkbox">
                  <input type="checkbox" />
                </label>
              </div>
            </div>
            <div class="columns">
              <div class="column is-8">
              </div>
              <div class="column is-2">
                <button class="button is-fullwidth is-warning">Discard</button>
              </div>
              <div class="column is-2">
                <button class="button is-fullwidth is-success">Save</button>
              </div>
            </div>
          </div>
          <div v-else-if="$route.path === '/settings/layout'">
            <h4 class="subtitle has-text-grey">Layout</h4>
          </div>
          <div v-else-if="$route.path === '/settings/tokens'">
            <h4 class="subtitle has-text-grey">Tokens</h4>
            <table class="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>API</th>
                  <th>Token</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr :class="{ 'is-selected': selected === index }" v-for="(token, index) in userTokens" v-on:click="selected=index">
                  <th>{{ token.api }}</th>
                  <td>{{ token.token }}</td>
                  <td>{{ token.options }}</td>
                </tr>
              </tbody>
            </table>
            <form v-if="selected !== -1">
              {{ userTokens[selected] }}
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Login from '@/components/Login.vue';

@Component({
  components: {
    Header,
    Login,
  },
})
export default class Settings extends Vue {
  private userTokens: any = this.$store.state.tokens;
  private selected: number = -1;
}
</script>
