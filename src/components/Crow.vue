<template>
  <div class="Crow">
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>



<script>
import * as PIXI from "pixi.js";
import SimplexNoise from "simplex-noise";

import textureSnake from "../assets/snake.png";
import textureBlob from "../assets/blob.png";
import textureDing from "../assets/ding.png";
import texturePeepis from "../assets/peepis.png";
import textureStick from "../assets/stick.png";
import textureTilde from "../assets/tilde.png";

import gsap, { MotionPathPlugin, PixiPlugin, Sine, EasePack } from "gsap/all";

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(MotionPathPlugin, PixiPlugin);

const lerp = (a, b, t) => a * (1 - t) + b * t;
const angleDifference = (a, b, _d = a - b) =>
  _d + (_d > Math.PI ? -2 * Math.PI : _d < -Math.PI ? 2 * Math.PI : 0);

export default {
  mounted() {
    const JOINT_LENGTH = 14;
    const JOINT_LENGTH_MAX = 14;
    const JOINT_MAX_ANGLE_MAGNITUDE = Math.PI * 0.08;
    const JOINT_LERP_FACTOR = 0.4;
    const JOINT_ANGLE_LERP_FACTOR = 0.75;
    const TEXTURE_SETTINGS = { resolution: 2 };

    const noise = new SimplexNoise(Math.random());

    const app = new PIXI.Application({
      view: this.$refs.canvas,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      autoResize: true,
      transparent: true,
      resizeTo: this.$el
    });

    const shapes = new PIXI.Container();
    shapes.sortableChildren = true;
    shapes.position.set(
      this.$refs.canvas.clientWidth / 2 + 10,
      this.$refs.canvas.clientHeight / 2 + 10
    );
    app.stage.addChild(shapes);
    window.addEventListener("resize", () => {
      shapes.position.set(
        this.$refs.canvas.clientWidth / 2 + 10,
        this.$refs.canvas.clientHeight / 2 + 10
      );
    });

    const target = new PIXI.Point();
    let pointerDown = false;
    const onPointerUp = () => {
      pointerDown = false;
      window.removeEventListener("pointerup", onPointerUp);
    };
    const onPointerDown = () => {
      pointerDown = true;
      window.addEventListener("pointerup", onPointerUp);
    };
    this.$el.addEventListener("pointerdown", onPointerDown);
    gsap.to(target, {
      motionPath: {
        path: `M211.7,44C82.7,44,0,142,0,254.5S79.6,466,202.7,466S382.3,391.4,524,293.5c133.1-92,132-130.6,132-183.4
	S597.3,0,536.4,0S410.8,47.7,410.8,116.1s52.2,107.6,86.9,123.3c93.1,42.1,190-16.5,278-16.5c108,0,143,91.1,143,128
	c0,49.5-20.4,115-139,115C639.7,466,535,299.7,383,143.5C329.8,88.8,298.5,44,211.7,44z`,
        offsetX: -480,
        offsetY: -230
      },
      duration: 9,
      repeat: -1,
      ease: "none"
    });

    //blob
    const blob = new PIXI.Sprite(
      PIXI.Texture.from(textureBlob, TEXTURE_SETTINGS)
    );
    blob.anchor.set(0.5);
    blob.position.set(-286, 0);
    shapes.addChild(blob);
    gsap.to(blob, {
      pixi: {
        positionY: -35,
        rotation: -10
      },
      duration: 3.15,
      repeat: -1,
      yoyoEase: true,
      ease: "sine.inOut"
    });

    //ding
    const ding = new PIXI.Sprite(
      PIXI.Texture.from(textureDing, TEXTURE_SETTINGS)
    );
    ding.anchor.set(0.5);
    ding.position.set(180, 130);
    shapes.addChild(ding);
    gsap.to(ding, {
      keyframes: [
        {
          pixi: { rotation: 120, positionX: 220, positionY: 80 },
          duration: 2,
          ease: "expo.inOut",
          delay: 8
        },
        {
          pixi: {
            rotation: 240
          },
          duration: 2.8,
          ease: "expo.inOut",
          delay: 8
        },
        {
          pixi: { rotation: 360 },
          duration: 2.2,
          ease: "expo.inOut",
          delay: 8
        }
      ],
      repeat: -1,
      repeatDelay: 2,
      delay: 8
    });

    //peepis
    const peepis = new PIXI.Sprite(
      PIXI.Texture.from(texturePeepis, TEXTURE_SETTINGS)
    );
    peepis.anchor.set(0.5, 0.65);
    peepis.position.set(306, -20);
    shapes.addChild(peepis);
    gsap.to(peepis, {
      pixi: {
        rotation: -20,
        scale: 0.97
      },
      duration: 4.15,
      repeat: -1,
      repeatDelay: 2,
      yoyoEase: true,
      ease: "expo.inOut"
    });

    //stick
    const stick = new PIXI.Sprite(
      PIXI.Texture.from(textureStick, TEXTURE_SETTINGS)
    );
    stick.anchor.set(0.5);
    stick.position.set(-180, 0);
    shapes.addChild(stick);
    gsap.to(stick, {
      pixi: {
        rotation: 2,
        positionX: -205,
        positionY: 15,
        scale: 0.95
      },
      duration: 1.2,
      yoyoEase: true,
      repeat: -1,
      ease: "expo.out",
      delay: 4,
      repeatDelay: 3
    });

    //tilde
    const tilde = new PIXI.Sprite(
      PIXI.Texture.from(textureTilde, TEXTURE_SETTINGS)
    );
    tilde.anchor.set(0.5);
    tilde.position.set(45, 220);
    shapes.addChild(tilde);
    gsap.to(tilde, {
      pixi: {
        rotation: 10,
        positionY: 230,
        scale: 0.9
      },
      duration: 4.15,
      repeat: -1,
      yoyoEase: true,
      ease: "sine.inOut"
    });

    //snake
    const snakePoints = Array.from(
      { length: 100 },
      (_, i) => new PIXI.Point(i * JOINT_LENGTH, 0)
    );
    const snakePointsIncludingTarget = [...snakePoints, target];
    const snake = new PIXI.SimpleRope(
      PIXI.Texture.from(textureSnake, TEXTURE_SETTINGS),
      snakePoints
    );
    snake.x = 0;
    shapes.addChild(snake);

    //positioning
    [stick, tilde, snake, blob, peepis, ding].forEach((sprite, i) => {
      sprite.zIndex = i + 1;
    });

    //loop
    const startTime = Date.now();
    app.ticker.add(() => {
      const time = (Date.now() - startTime) / 1000;

      if (pointerDown) {
        // override the curve
        const data = app.renderer.plugins.interaction.eventData.data.global;
        target.set(data.x - shapes.position.x, data.y - shapes.position.y);
      }

      //enforce soft maximum angle magnitude constraints on the joints
      const newAngles = [];
      for (
        let i = snakePointsIncludingTarget.length - 3,
          ii = snakePointsIncludingTarget.length;
        i >= 0;
        i--
      ) {
        const last2 = snakePointsIncludingTarget[i + 2];
        const last = snakePointsIncludingTarget[i + 1];
        const curr = snakePointsIncludingTarget[i];

        const currXDiff = curr.x - last.x;
        const currYDiff = curr.y - last.y;
        const lastXDiff = last.x - last2.x;
        const lastYDiff = last.y - last2.y;

        const currLength = Math.sqrt(currXDiff ** 2 + currYDiff ** 2);
        const lastLength = Math.sqrt(lastXDiff ** 2 + lastYDiff ** 2);

        const currAngle = Math.atan2(currYDiff, currXDiff);
        const lastAngle = Math.atan2(lastYDiff, lastXDiff);

        const jointAngleDifference = angleDifference(currAngle, lastAngle);

        let newAngle;
        if (jointAngleDifference < -JOINT_MAX_ANGLE_MAGNITUDE) {
          newAngle = lastAngle - JOINT_MAX_ANGLE_MAGNITUDE;
        } else if (jointAngleDifference > JOINT_MAX_ANGLE_MAGNITUDE) {
          newAngle = lastAngle + JOINT_MAX_ANGLE_MAGNITUDE;
        } else {
          continue;
        }

        const targetX = last.x + Math.cos(newAngle) * currLength;
        const targetY = last.y + Math.sin(newAngle) * currLength;

        curr.x = lerp(curr.x, targetX, JOINT_ANGLE_LERP_FACTOR);
        curr.y = lerp(curr.y, targetY, JOINT_ANGLE_LERP_FACTOR);
      }

      //force joints to be JOINT_LENGTH apart
      for (
        let i = snakePointsIncludingTarget.length - 2,
          ii = snakePointsIncludingTarget.length;
        i >= 0;
        i--
      ) {
        const last = snakePointsIncludingTarget[i + 1];
        const curr = snakePointsIncludingTarget[i];

        const xDist = curr.x - last.x;
        const yDist = curr.y - last.y;

        const len = Math.sqrt(xDist ** 2 + yDist ** 2);

        if (len <= JOINT_LENGTH_MAX) {
          const xTarget = last.x + (xDist / len) * JOINT_LENGTH;
          const yTarget = last.y + (yDist / len) * JOINT_LENGTH;

          curr.x = lerp(curr.x, xTarget, JOINT_LERP_FACTOR);
          curr.y = lerp(curr.y, yTarget, JOINT_LERP_FACTOR);
        } else {
          const xNorm = xDist / len;
          const yNorm = yDist / len;

          curr.x = last.x + xNorm * JOINT_LENGTH_MAX;
          curr.y = last.y + yNorm * JOINT_LENGTH_MAX;
        }
      }
    });
  }
};
</script>



<style scoped>
.Crow {
  /* border: solid 1px var(--surface-1); */
  border-radius: 9px;
  user-select: none;
}
</style>