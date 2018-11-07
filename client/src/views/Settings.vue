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
                  <th v-if="selected !== index">{{ token.api }}</th>
                  <th v-else><input class="input" type="text" v-model="token.api"></th>
                  <td v-if="selected !== index">{{ token.token }}</td>
                  <td v-else><input class="input" type="text" v-model="token.token"></td>
                  <td v-if="selected !== index">{{ token.options }}</td>
                  <td v-else><input class="input" type="text" v-model="token.options"></td>
                  <td v-if="selected === index"><button class="button is-danger"><span class="icon"><i class="fas fa-trash" /></span></button></td>
                </tr>
              </tbody>
            </table>
            <form v-if="selected !== -1">
              <div class="columns">
                <div class="column is-2">
                  <strong>API</strong>
                </div>
                <div class="column is-9">
                  <input type="text" class="input" placeholder="API" v-model="userTokens[selected].api"/>
                </div>
                <div class="column is-1">
                  <button class="button is-danger" v-on:click="deleteToken()">
                    <span class="icon">
                      <i class="fas fa-trash" />
                    </span>
                  </button>
                </div>
              </div>
              <div class="columns">
                <div class="column is-2">
                  <strong>Token</strong>
                </div>
                <div class="column is-9">
                  <input type="text" class="input" placeholder="Token" v-model="userTokens[selected].token" />
                </div>
              </div>
              <div class="columns">
                <div class="column is-2">
                  <strong>Options</strong>
                </div>
                <div class="column is-9">
                  <input type="text" class="input" placeholder="Options" v-model="userTokens[selected].options" />
                </div>
              </div>
              <div class="columns">
                <div class="column">
                </div>
                <div class="column is-2">
                  <button class="button is-fullwidth is-success">Save</button> 
                </div>
                <div class="column is-1">
                </div>
              </div>
            </form>
            <button class="button is-success is-outlined" v-on:click="addToken()">Add Token</button>
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
  private addToken() {
    this.userTokens.push({api: '', token: '', options: ''});
    this.selected = this.userTokens.length - 1;
  }
  private deleteToken() {
    this.userTokens.splice(this.selected, 1);
    this.selected = -1;
  }
}
</script>
