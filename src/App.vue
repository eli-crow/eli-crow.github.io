<template>
  <div id="app" class="site">
    <div class="intro">
      <div class="intro-content">
        <h1 class="title">
          <strong>Eli Crow</strong> is a designer and developer making software products for lasting benefit at
          <a href="https://sep.com" target="_blank" rel="noopener">sep.com</a>
        </h1>
      </div>
    </div>
    <div class="card-group">
      <div class="card">
        <Crow class="crow"/>
      </div>
      <div class="card">
      </div>
      <div class="card is-link">
        <div class="card-padding">
          <div class="card-title">A Call for a Typographic Box Model that Actually Makes Sense</div>
          <p>Updated <time>2021</time></p>
        </div>
      </div>
      <div class="card">

      </div>
    </div>
  </div>
</template>



<script>
import Crow from '@/components/Crow.vue';
export default {
  components: {
    Crow
  }
};
</script>



<style>
@import url("https://use.typekit.net/gwp5zpe.css");

:root {
  --surface-0: #0e1115;
  --surface-1: #1a1c1f;
  --text: #a3a9b2;
  --text-strong: #ffffff;
  --blue: #1ed3c6;
  --yellow: hsl(43, 100%, 50%);

  --proxima-nova: "proxima-nova", "Open Sans", "Gill Sans MT", "Gill Sans",
    Corbel, Helvetica, Arial, sans-serif;
}

html {
  height: 100%;
}

::selection {
  background-color: var(--yellow);
  opacity: 1 !important;
  color: var(--surface-0);
  padding-left: 4px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  display: flex;
  flex-direction: column;
  height: 100%;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: var(--proxima-nova);
  line-height: 1.3;
  color: var(--text);
  background-color: var(--surface-0);
}
body > * {
  flex: 1 0 0;
}
em {
  font-weight: 700;
}

a {
  color: var(--blue);
}
a:not(:hover) {
  text-decoration: none;
}

strong {
  color: var(--text-strong);
}
</style>

<style scoped>
.site {
  --site-padding-top: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding-top: var(--site-padding-top);
}

.intro {
  padding: var(--padding);
  padding-left: 32px;
  padding-right: 64px;
}
.intro-content {
  position: sticky;
  top: var(--site-padding-top);
}
.title {
  font-size: 32px;
  font-weight: 300;
  position: relative;
  top: -0.1em;
}

.card-group {
  grid-column: 2 / -1;
  display: grid;
  grid-template-columns: inherit;
  gap: inherit;
}
.card {
  --content-padding: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--surface-1);
  height: 500px;
}
.card.is-link {
}
.card.is-link:hover {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}
.card-padding {
  padding: var(--content-padding);
}
.card-title {
  font-size: 32px;
  font-weight: 300;
  color: var(--text-strong);
  margin-bottom: 1rem;
}

.crow {
  height: 100%;
}
</style>
