<template>
  <div id="app" class="site">
    <Crow class="interactive"/>
    <div class="typography content">
      <h1>Eli Crow</h1>
      <p class="large">
        <span class="line">is a designer and developer</span>
        <span class="line">making tools for business folk</span>
        <span class="line">
          with
          <a class="link" href="https://www.sep.com/" target="_blank">sep.com</a>.
        </span>
      </p>
    </div>
  </div>
</template>



<script>
import Crow from "./components/Crow.vue";

export default {
  components: {
    Crow
  }
};
</script>



<style>
@import url("https://use.typekit.net/vmj3bdo.css");
:root {
  --surface-0: #161616;
  --surface-1: #262626;
  --text: #9a9a9a;
  --heading: #f4f4f4;
  --blue: #1ed3c6;

  --alverata: "Alverata", "Times New Roman", sans-serif;
  --proxima-nova: "Proxima Nova", "Open Sans", "Gill Sans MT", "Gill Sans",
    Corbel, Helvetica, Arial, sans-serif;
}

html {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: var(--proxima-nova);
  line-height: 1.3;
  color: var(--text);
  background-color: var(--surface-0);
}

.typography {
}

.typography h1 {
  font-family: var(--alverata);
  font-size: 56px;
  font-weight: 700;
  color: var(--heading);
  margin-top: 120px;
  margin-bottom: 12px;
}

.typography .large {
  font-size: 24px;
  margin-top: 12px;
  margin-bottom: 12px;
}

.typography .line {
  display: block;
}

.typography .link {
  color: var(--blue);
}

.typography *:first-child {
  margin-top: 0;   
}

.typography *:last-child {
  margin-bottom: 0;   
}
</style>

<style scoped>
.site {
  height: 100%;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid:
    "interactive ."       1fr
    "interactive content" 1fr
    "interactive ."       1fr
  /  1fr         1fr;
}

.interactive {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  min-width: 0;
}

.content {
  grid-area: content;
  position: relative;
  align-self: center;
  z-index: 1;
  min-width: 0;
}
</style>
