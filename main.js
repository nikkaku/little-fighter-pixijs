import '@/assets/index.css'
import { Application, Assets, Sprite, Texture, AnimatedSprite } from 'pixi.js'
import { framesTemplate } from '@/utils/index.js'

const app = new Application()
await app.init({ width: 460, height: 320, backgroundColor: 0xecedf1, antialias: false })
document.body.appendChild(app.canvas)

const logoTexture = await Assets.load(new URL('@/assets/images/vite.svg', import.meta.url).href)
const logoSprite = new Sprite(logoTexture)
logoSprite.x = app.renderer.width / 2
logoSprite.y = app.renderer.height / 2
logoSprite.anchor.x = .5
logoSprite.anchor.y = .5
app.stage.addChild(logoSprite)

await Assets.load(new URL('@/assets/freeze.json', import.meta.url).href)

// all images
// const freezeList = []
// for (let i = 0; i < 170; i++) {
//   freezeList.push(Texture.from(`rollSequence${i.toString().padStart(4, '0')}.png`))
// }
// const freezeAnimate = new AnimatedSprite(freezeList)

const character = {
  speed: 2,
  action: {
    stand: [0, 1, 2, 3],
    walk: [4, 5, 6, 7],
    freeze: [8, 9],
    attack1: [10, 11],
    attack2: [12, 13],
    jumb_attack: [14, 15, 16],
    attack3: [17, 18, 19],
    run: [20, 21, 22],
    things_walk: [23, 24, 25, 26],
    things_attack: [27, 28],
    things_defense: [29],
    knock_down: [30, 31, 32, 33, 34],
    knock_up: [35, 36],
    fire: [37, 38],
    // defense: [],
    // jump: [],
  },
  key: {
    left: keyboard(37),
    up: keyboard(38),
    right: keyboard(39),
    down: keyboard(40),
    defense: undefined,
    attack: undefined,
    jump: undefined,
  },
  rememberKeyList: []
}
for (const [key, arr] of Object.entries(character.action)) {
  character.action[key] = arr.map(item => Texture.from(`rollSequence${item.toString().padStart(4, '0')}.png`))
}
const freezeAnimate = new AnimatedSprite(character.action.stand)
freezeAnimate.animationSpeed = .1
freezeAnimate.pivot.set(freezeAnimate._texture.frame.height / 2, freezeAnimate._texture.frame.width / 2)
freezeAnimate.vx = 0
freezeAnimate.vy = 0
freezeAnimate.x = app.renderer.width / 2
freezeAnimate.y = app.renderer.height / 2
freezeAnimate.play()
app.stage.addChild(freezeAnimate)

character.key.left.press = () => {
  freezeAnimate.vx = -character.speed
  freezeAnimate.scale.x = -1
  freezeAnimate._textures = character.action.walk
}

character.key.left.release = () => {
  if (!character.key.right.operate) {
    freezeAnimate.vx = 0
    freezeAnimate._textures = character.action.stand
  }
}

character.key.up.press = () => {
  freezeAnimate.vy = -character.speed
  freezeAnimate._textures = character.action.walk
}

character.key.up.release = () => {
  if (!character.key.down.operate) {
    freezeAnimate.vy = 0
    freezeAnimate._textures = character.action.stand
  }
}

character.key.right.press = () => {
  freezeAnimate.vx = character.speed
  freezeAnimate.scale.x = 1
  freezeAnimate._textures = character.action.walk
}

character.key.right.release = () => {
  if (!character.key.left.operate) {
    freezeAnimate.vx = 0
    freezeAnimate._textures = character.action.stand
  }
}

character.key.down.press = () => {
  freezeAnimate.vy = character.speed
  freezeAnimate._textures = character.action.walk
}

character.key.down.release = () => {
  if (!character.key.up.operate) {
    freezeAnimate.vy = 0
    freezeAnimate._textures = character.action.stand
  }
}

function play (delta) {
  freezeAnimate.x += freezeAnimate.vx
  freezeAnimate.y += freezeAnimate.vy
}

function keyboard (code) {
  const key = { code, press: undefined, release: undefined, operate: false }

  key.handler = (env) => {
    if (env.keyCode === key.code) {
      switch (env.type) {
        case 'keydown':
          if (!key.operate && key.press) key.press()
          key.operate = true
          break
        case 'keyup':
          if (key.operate && key.release) key.release()
          key.operate = false
          key.unsubscribe
          break
      }
      env.preventDefault()
    }
  }

  const handlerElement = key.handler.bind(key)
  key.unsubscribe = () => {
    window.removeEventListener('keydown', handlerElement)
    window.removeEventListener('keyup', handlerElement)
  }


  window.addEventListener('keydown', handlerElement, false)
  window.addEventListener('keyup', handlerElement, false)
  return key
}

app.ticker.add(delta => {
  play(delta)
})

// 生成角色 JSON
// framesTemplate()

