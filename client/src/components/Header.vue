<template>
  <header>
    <nav class="navbar is-primary" role="navigation">
      <div class="navbar-brand">
        <div class="navbar-item">
          {{ time }}
        </div>
        <router-link class="navbar-item is-hidden-desktop" to="/settings">
          <span class="icon">
            <i class="fas fa-cog" />
          </span>
        </router-link>
      </div>
      <div class="navbar-end">
        <router-link class="navbar-item is-hidden-touch" to="/settings">
          <span class="icon">
            <i class="fas fa-cog" />
          </span>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  private time: string = '';
  private mounted(): any {
    setInterval(() => {
      this.clock();
    });
  }
  private clock(): void {
    const date = new Date();
    let hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const ampm: string = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    this.time = hours.toString() + ':' + minutesStr + ' ' + ampm;
  }
}
</script>
