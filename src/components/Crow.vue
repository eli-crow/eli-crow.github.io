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

const lerp = (a,b,t) => a * (1-t) + b * t
const angleDifference = (a,b,_d=a-b) => _d + ((_d > Math.PI) ? -2*Math.PI : (_d<-Math.PI) ? 2*Math.PI : 0)

export default {
  mounted () {
    const JOINT_LENGTH = 14
    const JOINT_LENGTH_MAX = 14
    const JOINT_MAX_ANGLE_MAGNITUDE = Math.PI * 0.08
    const JOINT_LERP_FACTOR = 0.4
    const JOINT_ANGLE_LERP_FACTOR = 0.75

    const noise = new SimplexNoise(Math.random())

    const app = new PIXI.Application({
      view: this.$refs.canvas,
      antialias: true,
      autoDensity: true,
      transparent: true,
      resizeTo: this.$el,
    })

    const target = new PIXI.Point()
    const mouse = app.renderer.plugins.interaction.mouse.global
    let mouseDown = false
    const onMouseup = () => {
      mouseDown = false
      window.removeEventListener("mouseup", onMouseup)
    }
    const onMousedown = () => {
      mouseDown = true
      window.addEventListener("mouseup", onMouseup)
    }
    this.$el.addEventListener("mousedown", onMousedown)

    const snakePoints = Array.from({length: 100}, (_, i) => new PIXI.Point(i * JOINT_LENGTH, 0))
    const snakePointsIncludingTarget = [...snakePoints, target]
    const snake = new PIXI.SimpleRope(PIXI.Texture.from(textureSnake), snakePoints, 0);
    snake.x = 0;
    app.stage.addChild(snake)

    const wings = new PIXI.Sprite(PIXI.Texture.from(textureWings))
    wings.anchor.set(0.5)
    app.stage.addChild(wings)

    const startTime = Date.now()
    app.ticker.add(() => {
      const time = (Date.now() - startTime) / 1000
      
      if (mouseDown) {
        target.copyFrom(mouse)
      }
      else {
        const xSimp = 0.2 * noise.noise2D(0, time)
        const ySimp = 0.2 * noise.noise2D(100, time)
        const xCirc = 1.0 * Math.cos(time * 0.723)
        const yCirc = 1.0 * Math.cos(time * 0.9568)
        target.x = ((xSimp + xCirc)*0.5+0.5) * app.renderer.width  
        target.y = ((ySimp + yCirc)*0.5+0.5) * app.renderer.height  
      }

      //enforce soft maximum angle magnitude constraints on the joints
      const newAngles = []
      for (let i = snakePointsIncludingTarget.length-3, ii = snakePointsIncludingTarget.length; i>=0; i--) {
        const last2 = snakePointsIncludingTarget[i+2] 
        const last = snakePointsIncludingTarget[i+1]
        const curr = snakePointsIncludingTarget[i]

        const currXDiff = curr.x - last.x
        const currYDiff = curr.y - last.y
        const lastXDiff = last.x - last2.x
        const lastYDiff = last.y - last2.y

        const currLength = Math.sqrt(currXDiff**2 + currYDiff**2)
        const lastLength = Math.sqrt(lastXDiff**2 + lastYDiff**2)
        
        const currAngle = Math.atan2(currYDiff, currXDiff)
        const lastAngle = Math.atan2(lastYDiff, lastXDiff)

        const jointAngleDifference = angleDifference(currAngle, lastAngle)

        if (i === 80) {
          wings.position.x = curr.x
          wings.position.y = curr.y
          wings.rotation = currAngle + Math.PI
        }

        let newAngle
        if (jointAngleDifference < -JOINT_MAX_ANGLE_MAGNITUDE) {
          newAngle = lastAngle - JOINT_MAX_ANGLE_MAGNITUDE
        }
        else if (jointAngleDifference > JOINT_MAX_ANGLE_MAGNITUDE) {
          newAngle = lastAngle + JOINT_MAX_ANGLE_MAGNITUDE
        } 
        else {
          continue
        }
        
        const targetX = last.x + Math.cos(newAngle) * currLength
        const targetY = last.y + Math.sin(newAngle) * currLength

        curr.x = lerp(curr.x, targetX, JOINT_ANGLE_LERP_FACTOR)
        curr.y = lerp(curr.y, targetY, JOINT_ANGLE_LERP_FACTOR)
      } 

      //force joints to be JOINT_LENGTH apart 
      for (let i = snakePointsIncludingTarget.length-2, ii = snakePointsIncludingTarget.length; i>=0; i--) {
        const last = snakePointsIncludingTarget[i+1]
        const curr = snakePointsIncludingTarget[i]

        const xDist = curr.x - last.x
        const yDist = curr.y - last.y

        const len = Math.sqrt(xDist ** 2 + yDist ** 2)

        if (len <= JOINT_LENGTH_MAX) {
          const xTarget = last.x + (xDist / len) * JOINT_LENGTH
          const yTarget = last.y + (yDist / len) * JOINT_LENGTH
  
          curr.x = lerp(curr.x, xTarget, JOINT_LERP_FACTOR)
          curr.y = lerp(curr.y, yTarget, JOINT_LERP_FACTOR)
        }
        else {
          const xNorm = xDist / len
          const yNorm = yDist / len

          curr.x = last.x + xNorm * JOINT_LENGTH_MAX
          curr.y = last.y + yNorm * JOINT_LENGTH_MAX
        }
      }
    })
  }
}
</script>



<style scoped>
.Crow {
  border: solid 1px var(--surface-1);
  border-radius: 9px;
  user-select: none;
}
</style>