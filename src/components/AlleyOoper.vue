<template>
  <div class="AlleyOoper">
    <svg v-if="mounted" class="svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <path tab-index="0" class="track" :d="trackCurve.getSvgPathData()" ref="track" />
      <path class="track-progress" :d="trackCurve.getSvgPathData()" stroke-dasharray="99999" :stroke-dashoffset="progressDashOffset" />
      <circle class="thumb" :cx="thumbPosition[0]" :cy="thumbPosition[1]" r="10" @pointerdown.stop.prevent="handleThumbDown" />
    </svg>
  </div>
</template>

<script>
import { BezierCurve } from '../bezier.js';
import * as V from '../v.js';

export default {
  props: {
    min: { type: [Number, String], default: 0 },
    max: { type: [Number, String], default: 1 },
    step: { type: [Number, String], default: 0.0001 },
    value: { type: Number, default: 0 },
    curvePoints: { type: Array, required: true }
  },

  data() {
    return {
      mounted: false,
      progressDashOffset: 0
    };
  },

  //non-reactive
  trackCurve: null,

  computed: {
    currentT() {
      if (this.trackCurve === null) return 0;
      const min = Number(this.min);
      const max = Number(this.max);
      const range = max - min;
      const nLength = range === 0 ? 0 : (this.value - min) / range;
      const t = this.trackCurve.getTAtNormalizedLength(nLength);
      return t;
    },
    thumbPosition() {
      const point = this.trackCurve.getPointAt(this.currentT);
      return point;
    },
    trackCurve() {
      return this.$options.trackCurve;
    }
  },

  mounted() {
    this.mounted = true;
    this.updateCurve();
    window.addEventListener('resize', e => {
      this.updateCurve();
    });
  },

  watch: {
    curvePoints: {
      deep: true,
      handler(nv, ov) {
        if (nv.some((v, i) => v !== ov[i])) {
          this.updateCurve();
        }
      }
    }
  },

  updated() {
    this.updateOffset();
  },

  methods: {
    updateOffset() {
      const totalLengthSvgUnits = this.$refs.track?.getTotalLength();
      const length = this.trackCurve.getNormalizedLengthAt(this.currentT) * totalLengthSvgUnits;
      const offset = 99999 - length;
      this.progressDashOffset = offset;
    },
    updateCurve() {
      const { width, height } = this.$el.getBoundingClientRect();
      const [p0x, p0y, c0x, c0y, c1x, c1y, p1x, p1y] = this.curvePoints;
      this.$options.trackCurve = new BezierCurve(
        p0x * width, p0y * height,
        c0x * width, c0y * height,
        c1x * width, c1y * height,
        p1x * width, p1y * height,
      );
      this.updateOffset();
    },
    emitInput(pt) {
      const min = Number(this.min);
      const max = Number(this.max);
      const newT = this.trackCurve.getNearestTInWindingOrder(this.currentT, pt);
      const newNormalizedLength = this.trackCurve.getNormalizedLengthAt(newT);
      const newVal = newNormalizedLength * max - min;
      this.$emit('input', newVal);
    },
    handleThumbDown(ev) {
      const bb = this.$el.getBoundingClientRect();
      const downPt = [ev.clientX - bb.left, ev.clientY - bb.top];
      const downThumbPt = [...this.thumbPosition];

      const move = ev => {
        const bb = this.$el.getBoundingClientRect();
        const movePt = [ev.clientX - bb.left, ev.clientY - bb.top];
        const diff = V.sub(movePt, downPt);
        const newPos = V.add(downThumbPt, diff);
        this.emitInput(newPos);
      };

      const up = ev => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };

      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    },
  }
}
</script>

<style scoped>
.svg {
  overflow: visible;
  width: 100%;
}
.track {
  fill: none;
  stroke: white;
  vector-effect: non-scaling-stroke;
  stroke-width: 6px;
  stroke-linecap: round;
}
.track-progress {
  fill: none;
  stroke: var(--blue);
  vector-effect: non-scaling-stroke;
  stroke-width: 6px;
  stroke-linecap: round;
}
.thumb {
  fill: white;
  stroke-width: 2px;
  vector-effect: non-scaling-stroke;
}
.thumb:active {
  stroke: var(--blue);
}
.thumb:focus {
}
</style>