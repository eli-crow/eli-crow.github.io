<template>
  <div id="app" class="site">
    <Crow class="interactive"/>
    <div class="typography content">
      <h1>Eli Crow</h1>
      <p class="large">
        <span class="line">is a designer and developer</span>
        <span class="line">making software for business folk</span>
        <span class="line">
          at
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
:root {
  --surface-0: #161616;
  --surface-1: #262626;
  --text: #afafaf;
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
  max-width: 600px;
  max-height: 600px;
  display: grid;
  grid:
    "top    top     top"     1fr
    "left   content content" 1fr
    "bottom bottom  bottom"  1fr
  /  1fr    1fr     1fr;
}

.interactive {
  grid-column: 1 / span 2;
  grid-row: 1 / -1;
}

.content {
  grid-area: content;
  position: relative;
  z-index: 1;
}
</style>
