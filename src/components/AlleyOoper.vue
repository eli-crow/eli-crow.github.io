<template>
  <div class="AlleyOoper">
    <svg v-if="mounted" class="svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <path tab-index="0" class="track" :d="pathData" ref="track" />
      <path class="track-progress" :d="pathData" stroke-dasharray="99999" :stroke-dashoffset="progressDashOffset" />
      <circle class="thumb" :cx="thumbPosition[0]" :cy="thumbPosition[1]" r="12" @pointerdown.stop.prevent="handleThumbDown" @touchstart.stop.prevent.capture />
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
    curvePoints: { type: Array, required: true },
  },

  data() {
    return {
      mounted: false,
      progressDashOffset: 0,
      pathData: '',
      thumbPosition: [0, 0],
      currentT: 0,
    };
  },

  //non-reactive
  trackCurve: null,

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
    },
    value(nv) {
      this.updateOffset();
      this.updateThumb();
    }
  },

  methods: {
    getCurrentT() {
      if (this.$options.trackCurve === null) return 0;
      const min = Number(this.min);
      const max = Number(this.max);
      const range = max - min;
      const nLength = range === 0 ? 0 : (this.value - min) / range;
      const t = this.$options.trackCurve.getTAtNormalizedLength(nLength);
      return t;
    },
    updateOffset() {
      //need to allow svg to render before measuring.
      //OPTIMIZE: could remove dependency on svg api by mapping internal representation to expected width and height
      this.$nextTick(() => {
        const totalLengthSvgUnits = this.$refs.track?.getTotalLength();
        const length = this.$options.trackCurve.getNormalizedLengthAt(this.getCurrentT()) * totalLengthSvgUnits;
        const offset = 99999 - length;
        this.progressDashOffset = offset;
      });
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
      this.pathData = this.$options.trackCurve.getSvgPathData();
      this.updateOffset();
      this.updateThumb();
    },
    updateThumb() {
      this.thumbPosition = this.$options.trackCurve.getPointAt(this.getCurrentT());
    },
    emitInput(pt) {
      const min = Number(this.min);
      const max = Number(this.max);
      const newT = this.$options.trackCurve.getNearestTInWindingOrder(this.getCurrentT(), pt);
      const newNormalizedLength = this.$options.trackCurve.getNormalizedLengthAt(newT);
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
        window.removeEventListener('pointercancel', up);
        window.removeEventListener('pointerup', up);
      };

      window.addEventListener('pointermove', move);
      window.addEventListener('pointercancel', up);
      window.addEventListener('pointerup', up);
    },
  }
}
</script>

<style scoped>
.AlleyOoper {
}
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