<template>
  <div class="Crow">
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>



<script>
import * as PIXI from 'pixi.js'
import SimplexNoise from 'simplex-noise'

import textureSnake from '../assets/snake.png'
import textureWings from '../assets/wings.png'

export default {
  mounted () {
    const JOINT_LENGTH = 14
    const JOINT_MAX_ANGLE_MAGNITUDE = Math.PI * 0.1
    const JOINT_LERP_FACTOR = 0.98
    const JOINT_ANGLE_LERP_FACTOR = 0.5

    const noise = new SimplexNoise()

    const app = new PIXI.Application({
      view: this.$refs.canvas,
      antialias: true,
      autoDensity: true,
      transparent: true,
      resizeTo: this.$el,
    })

    const mouse = app.renderer.plugins.interaction.mouse.global

    const snakePoints = Array.from({length: 100}, (_, i) => new PIXI.Point(i * JOINT_LENGTH, 0))
    const snakePointsIncludingMouse = [...snakePoints, mouse]
    const snake = new PIXI.SimpleRope(PIXI.Texture.from(textureSnake), snakePoints, 0);
    snake.x = 0;
    app.stage.addChild(snake)

    const wings = new PIXI.Sprite(PIXI.Texture.from(textureWings))
    app.stage.addChild(wings)
    wings.anchor.set(0.5)

    app.ticker.add(() => {

      //enforce soft maximum angle magnitude constraints on the joints
      for (let i = snakePointsIncludingMouse.length-2, ii = snakePointsIncludingMouse.length; i>=1; i--) {
        const last = snakePointsIncludingMouse[i+1]
        const curr = snakePointsIncludingMouse[i]
        const next = snakePointsIncludingMouse[i-1]

        const currXDiff = curr.x - last.x
        const currYDiff = curr.y - last.y
        const currLength = Math.sqrt(currXDiff**2 + currYDiff**2)
        const nextXDiff = next.x - curr.x
        const nextYDiff = next.y - curr.y
        const nextLength = Math.sqrt(nextXDiff**2 + nextYDiff**2)
        const currAngle = Math.atan2(currYDiff, currXDiff)
        const nextAngle = Math.atan2(nextYDiff, nextXDiff)

        let angleDifference = nextAngle - currAngle
        angleDifference += (angleDifference>Math.PI) ? -2*Math.PI : (angleDifference<-Math.PI) ? 2*Math.PI : 0

        if (i === 80) {
          wings.position.copyFrom(curr)
          wings.rotation = currAngle + Math.PI
        }

        let newAngle
        if (angleDifference < -JOINT_MAX_ANGLE_MAGNITUDE) {
          newAngle = currAngle - JOINT_MAX_ANGLE_MAGNITUDE
        }
        else if (angleDifference > JOINT_MAX_ANGLE_MAGNITUDE) {
          newAngle = currAngle + JOINT_MAX_ANGLE_MAGNITUDE
        } else {
          continue
        }
        
        const targetX = curr.x + Math.cos(newAngle) * nextLength
        const targetY = curr.y + Math.sin(newAngle) * nextLength

        next.x = next.x * (1-JOINT_ANGLE_LERP_FACTOR) + targetX * JOINT_ANGLE_LERP_FACTOR
        next.y = next.y * (1-JOINT_ANGLE_LERP_FACTOR) + targetY * JOINT_ANGLE_LERP_FACTOR
      } 

      //force joints to be JOINT_LENGTH apart 
      for (let i = snakePointsIncludingMouse.length-2, ii = snakePointsIncludingMouse.length; i>=0; i--) {
        const last = snakePointsIncludingMouse[i+1]
        const curr = snakePointsIncludingMouse[i]

        const xDist = curr.x - last.x
        const yDist = curr.y - last.y

        const len = Math.sqrt(xDist ** 2 + yDist ** 2)

        const xTarget = last.x + (xDist / len) * JOINT_LENGTH
        const yTarget = last.y + (yDist / len) * JOINT_LENGTH

        curr.x = curr.x * (1-JOINT_LERP_FACTOR) + xTarget * JOINT_LERP_FACTOR
        curr.y = curr.y * (1-JOINT_LERP_FACTOR) + yTarget * JOINT_LERP_FACTOR
        // curr.x = xTarget
        // curr.y = yTarget
      }
    })
  }
}
</script>



<style scoped>
.Crow {
  /* background-color: var(--surface-1); */
  border: solid 1px var(--surface-1);
  border-radius: 9px;
}
</style>