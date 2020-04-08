<template>
  <div id="app" class="site">
    <Crow class="interactive" />
    <div class="content">
      <h1 class="title">
        <em>Eli Crow</em>
        is a designer and developer making tools for business folk with
        <a
          class="link"
          href="https://www.sep.com/"
          target="_blank"
        >sep.com</a>.
      </h1>
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
  --text: #525252;
  --heading: #f4f4f4;
  --blue: #1ed3c6;
  --yellow: hsl(43, 100%, 50%);

  --proxima-nova: "Proxima Nova", "Open Sans", "Gill Sans MT", "Gill Sans",
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
</style>

<style scoped>
.site {
  height: 100%;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid:
    "interactive interactive interactive" 750px
    ". content    . " auto
    / 1fr minmax(40px, 900px) 1fr;
}

.interactive {
  grid-area: interactive;
  min-width: 0;
}

.content {
  grid-area: content;
  min-width: 0;
}

.title {
  text-align: center;
}

a {
  color: rgb(33, 101, 168);
}
</style>
