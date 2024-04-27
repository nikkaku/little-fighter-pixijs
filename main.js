import '@/assets/index.css'
import { Application, Assets, Sprite, Texture, AnimatedSprite, Text } from 'pixi.js'
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

// TODO: 後續改用 sprite sheets (https://pixijs.com/8.x/guides/components/sprite-sheets)
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
    attack: [10, 11],
    attack2: [12, 13],
    jump_attack: [14, 15, 16],
    attack3: [17, 18, 19],
    run: [20, 21, 22],
    things_walk: [23, 24, 25, 26],
    things_attack: [27, 28],
    things_defense: [29],
    knock_down: [30, 31, 32, 33, 34],
    knock_up: [35, 36],
    fire: [37, 38],
    defense: [57],
    // jump: [],
  },
  key: {
    left: keyboard(74),
    up: keyboard(73),
    right: keyboard(76),
    down: keyboard(188),
    defense: keyboard(190),
    attack: keyboard(75),
    jump: keyboard(32),
  },
  rememberKeyList: []
}
for (const [key, arr] of Object.entries(character.action)) {
  character.action[key] = arr.map(item => Texture.from(`rollSequence${item.toString().padStart(4, '0')}.png`))
}
const freezeAnimate = new AnimatedSprite(character.action.defense)
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

character.key.attack.press = () => {
  freezeAnimate._textures = character.action.attack
}

character.key.attack.release = () => {
  if (!character.key.attack.operate) {
    freezeAnimate._textures = character.action.stand
  }
}

character.key.defense.press = () => {
  freezeAnimate._textures = character.action.defense
}

character.key.defense.release = () => {
  if (!character.key.defense.operate) {
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
    textDemo.text = `${env.key}${env.key.charCodeAt()}`
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

const textDemo = new Text({ text: '', style: { fontSize: 16 } })
textDemo.pivot.set(textDemo.height / 2, textDemo.width / 2)
textDemo.x = app.renderer.width / 2
textDemo.y = app.renderer.height - 50
app.stage.addChild(textDemo)

// const buttonDemo = new Button(new Text({ text: 'button' }))
// buttonDemo.onPress.connect(() => {
//   console.log('buttonDemo.onPress')
// })
// app.stage.addChild(buttonDemo)
