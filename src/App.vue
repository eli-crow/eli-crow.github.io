<template>
  <div id="app">
    <!-- Filter: https://css-tricks.com/gooey-effect/ -->
    <svg v-once style="visibility: hidden; position: absolute;" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter :id="`filter-goo-${name}`" v-for="([name, color]) in [['blue', '#1ed2c6'], ['black', '#080a0d']]" :key="name">
          <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="dilate" />
          <feGaussianBlur in="dilate" stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feFlood :flood-color="color" result="flood" />
          <feComposite in="flood" in2="goo" operator="in" result="merged" />
          <feComposite in="SourceGraphic" in2="merged" operator="atop" />
        </filter>
      </defs>
    </svg>

    <div id="app" class="site">
      <div class="intro">
        <div class="intro-content">
          <h1 class="title">
            <strong style="display: block;">
              Eli Crow is a
              <span style="display: block; margin: 0.25ch 0">
                <span class="gooey-text">designer and developer</span>
              </span>
            </strong>
            making software products for lasting benefit with
            <a href="https://sep.com" target="_blank" rel="noopener">sep.com</a>
          </h1>
        </div>
      </div>

      <div class="card-group">
        <div class="card">
          <div class="crow-container">
            <Crow class="crow" :scale="0.65" />
          </div>
          <div class="card-corner-decoration">
            <Icon icon="cursor" />
          </div>
        </div>

        <LinkContainer tag="article" class="card is-link is-bones-live">
          <img class="card-image-typography" src="@/assets/typography.svg" />

          <div class="card-padding">
            <h2 class="card-title is-high-leading"><span contenteditable class="gooey-text is-subtle">A call for a typographic box model that actually makes sense</span></h2>
            <p><time>2021</time></p>
          </div>
          <a data-main-link href="#" class="card-corner-decoration is-page" aria-label="Read Article" @click.stop>
            <Icon icon="chevron-right" />
          </a>
        </LinkContainer>

        <div class="card">
          <div class="card-padding">
            <div class="alley-ooper-group">
              <label class="alley-ooper">
                <span class="alley-ooper-label">Slider</span>
                <span class="alley-ooper-value">{{ alleyOopers[0].toFixed(0) }}</span>
                <AlleyOoper class="alley-ooper-input" v-model="alleyOopers[0]" min="0" max="100" :curve-points="[0,0, .33,0, .66,0, 1,0]" style="height: 1rem;" />
              </label>
              <label class="alley-ooper">
                <span class="alley-ooper-label">Swooper</span>
                <span class="alley-ooper-value">{{ alleyOopers[1].toFixed(0) }}</span>
                <AlleyOoper class="alley-ooper-input" v-model="alleyOopers[1]" min="0" max="100" :curve-points="[0,0, .33,1, .66,1, 1,0]" style="height: 1.5rem;" />
              </label>
              <label class="alley-ooper">
                <span class="alley-ooper-label">Swisher</span>
                <span class="alley-ooper-value">{{ alleyOopers[2].toFixed(0) }}</span>
                <AlleyOoper class="alley-ooper-input" v-model="alleyOopers[2]" min="0" max="100" :curve-points="[0,1, 1.75,1.5, -0.2,-0.15, 1,0]" style="height: 3rem;" />
              </label>
              <label class="alley-ooper">
                <span class="alley-ooper-label">Looper</span>
                <span class="alley-ooper-value">{{ alleyOopers[3].toFixed(0) }}</span>
                <AlleyOoper class="alley-ooper-input" v-model="alleyOopers[3]" min="0" max="100" :curve-points="[0,1, 2,-0.85, -0.5,-1.33, 1,1]" style="height: 3rem;" />
              </label>
            </div>
          </div>
          <div class="card-corner-decoration">
            <Icon icon="cursor" />
          </div>
        </div>

        <LinkContainer tag="article" class="card is-link is-bones-live">
          <img class="card-image-bones-live" src="@/assets/bones-live-dice.svg" />

          <div class="card-padding">
            <h2 class="card-title">Bones.live, a multiplayer dice box. Throw the bones. Embrace your destiny.</h2>
          </div>
          <a
            href="https://bones.live"
            target="_blank"
            rel="noopener"
            class="card-corner-decoration is-page"
            aria-label="Visit Site"
            data-main-link
            @click.stop>
            <Icon icon="external-link" />
          </a>
        </LinkContainer>

        <div class="card">
        </div>

        <div class="card">
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import Crow from '@/components/Crow.vue';
import LinkContainer from '@/components/LinkContainer.vue';
import AlleyOoper from "./components/AlleyOoper.vue";
export default {
  components: {
    Crow,
    LinkContainer,
    AlleyOoper,
  },
  data() {
    return {
      alleyOopers: [25, 50, 75, 100]
    };
  }
};
</script>



<style>
@import url("https://use.typekit.net/gwp5zpe.css");

:root {
  --surface-0: hsl(216, 24%, 4%);
  --surface-1: hsl(216, 11%, 10%);
  --surface-2: hsl(216, 8%, 14%);
  --text-weak: hsl(220, 8%, 28%);
  --text: hsl(216, 11%, 60%);
  --text-strong: hsl(216, 31%, 93%);
  --blue: hsl(209, 90%, 56%);
  --teal: hsl(176, 75%, 47%);
  --yellow: hsl(43, 100%, 50%);
  --purple: hsl(269, 54%, 49%);

  /* --surface-0: hsl(220, 16%, 93%);
  --surface-1: hsl(0, 0%, 100%);
  --surface-2: hsl(0, 0%, 81%);
  --text: hsl(217, 7%, 44%);
  --text-strong: hsl(0, 0%, 0%);
  --teal: hsl(176, 75%, 47%);
  --yellow: hsl(43, 100%, 50%); */

  --proxima-nova: "proxima-nova", "Open Sans", "Gill Sans MT", "Gill Sans",
    Corbel, Helvetica, Arial, sans-serif;
}

html {
  height: 100%;
}

::selection {
  background-color: var(--teal);
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
  color: var(--teal);
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
  --site-padding-top: 72px;
  --site-columns: repeat(auto-fit, minmax(300px, 1fr));
  display: grid;
  grid-template-columns: var(--site-columns);
  gap: 20px;
  padding-top: var(--site-padding-top);
}

.intro {
  padding: var(--padding);
  padding-left: 32px;
  padding-right: 32px;
}
.intro-content {
  position: sticky;
  top: var(--site-padding-top);
}
.title {
  font-size: 32px;
  font-weight: 300;
  line-height: 1.4;
  position: relative;
  top: -0.1em;
}

.card-group {
  grid-column: 2 / -1;
  display: grid;
  grid-template-columns: var(--site-columns);
  gap: inherit;
}
.card {
  --content-padding: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--surface-1);
  height: 520px;
}
.card.is-link {
}
.card.is-link:hover {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}
.card.is-bones-live {
  background-image: linear-gradient(
    220deg,
    var(--purple) 0%,
    var(--surface-1) 30%
  );
}
.card-padding {
  padding: var(--content-padding);
}
.card-title {
  font-size: 28px;
  font-weight: 300;
  color: var(--text-strong);
  margin-bottom: 1rem;
}
.is-high-leading {
  line-height: 1.8;
}
.card-corner-decoration {
  position: absolute;
  bottom: 0;
  right: 0;
  text-decoration: none;
  font-size: 1.25rem;
  color: var(--text-weak);
  cursor: default;
  pointer-events: none;
  padding: var(--content-padding);
}
.card-corner-decoration.is-link {
  pointer-events: all;
}
.card:hover .card-corner-decoration {
  color: var(--text-strong);
}
.card-image-typography {
  padding-top: var(--content-padding);
  padding-left: var(--content-padding);
  height: 164px;
  object-fit: cover;
  object-position: left;
}
.card-image-bones-live {
  padding-right: var(--content-padding);
  object-fit: cover;
  object-position: left;
}

.space {
  flex: 1 0 0;
}

.gooey-text {
  background-color: var(--teal);
  color: var(--surface-0);
  filter: url(#filter-goo-blue);
  box-decoration-break: clone;
  padding: 0 0.16em;
  margin: 0 0.16em;
}
.gooey-text.is-subtle {
  background-color: var(--surface-0);
  color: var(--text-strong);
  filter: url(#filter-goo-black);
  margin: 0 -0.16em;
}
.gooey-text::selection {
  background-color: var(--yellow);
}

.crow-container {
  position: relative;
  flex: 1 0 0;
}
.crow {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.alley-ooper-group {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.alley-ooper {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  gap: 10px;
}
.alley-ooper-label {
  grid-column: 1;
  grid-row: 1;
}
.alley-ooper-value {
  color: var(--text-weak);
  grid-column: 2;
  grid-row: 1;
}
.alley-ooper-input {
  grid-column: 1 / span 2;
  grid-row: 2;
  margin: 4px;
  /* height: in html */
}
</style>
