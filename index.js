import '@/assets/index.css'
import { Application, Assets, Sprite, Texture, AnimatedSprite, Text } from 'pixi.js'
// import Character from '@/utils/character.js'
import Load from '@/utils/load.js'

const app = new Application()
await app.init({ width: 460, height: 320, backgroundColor: 0xecedf1, antialias: false })
document.body.appendChild(app.canvas)

const f = new Load()
await f.init()
console.log(f.json())

const character = {
  speed: 2,
  jump: {
    value: -30,
    height: 0,
    y: 0
  },
  vx: 0,
  vy: 0,
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
    defense: [56, 57],
    jump: [37, 38]
  },
  key : {
    code: {
      74: 'left',
      73: 'up',
      76: 'right',
      188: 'down',
      190: 'defense',
      75: 'attack',
      32: 'jump'
    },
    object: {},
    history: []
  },
  animation: undefined
}

const actionLogoImage = async () => {
  const logoTexture = await Assets.load(new URL('@/assets/images/vite.svg', import.meta.url).href)
  const logoSprite = new Sprite(logoTexture)
  logoSprite.x = 10
  logoSprite.y = app.renderer.height - 10
  logoSprite.anchor.y = 1
  app.stage.addChild(logoSprite)
}

const actionCharacter = async () => {
  await Assets.load(new URL('@/assets/freeze.json', import.meta.url).href)
  for (const [key, arr] of Object.entries(character.action)) {
    character.action[key] = arr.map(item => Texture.from(`rollSequence${item.toString().padStart(4, '0')}.png`))
  }
  character.animation = new AnimatedSprite(character.action.stand)
  character.animation.animationSpeed = .1
  character.animation.pivot.set(character.animation._texture.frame.height / 2, character.animation._texture.frame.width / 2)
  character.animation.x = app.renderer.width / 2
  character.animation.y = app.renderer.height / 2
  character.animation.play()
  app.stage.addChild(character.animation)

  character.key.object = Object.entries(character.key.code).reduce((acc, cur) => {
    const target = { code: Number(cur[0]), press: undefined, operate: false }
  
    target.handler = (env) => {
      switch (env.type) {
        case 'keydown':
          if (target.press) target.press(true)
          target.operate = true
          break
        case 'keyup':
          if (target.press) target.press(false)
          target.operate = false
          break
      }
      env.preventDefault()
    }
  
    acc[cur[1]] = target
    return acc
  }, {})


  character.key.object.left.press = (bol) => {
    if (bol) {
      character.vx = -character.speed
      character.animation.scale.x = -1
      character.animation._textures = character.action.walk
    } else {
      character.vx = 0
      character.animation._textures = character.action.stand
    }
  }
  
  character.key.object.up.press = (bol) => {
    if (bol) {
      character.vy = -character.speed
      character.animation._textures = character.action.walk
    } else {
      character.vy = 0
      character.animation._textures = character.action.stand
    }
  }
  
  character.key.object.right.press = (bol) => {
    if (bol) {
      character.vx = character.speed
      character.animation.scale.x = 1
      character.animation._textures = character.action.walk
    } else {
      character.vx = 0
      character.animation._textures = character.action.stand
    }
  }
  
  character.key.object.down.press = (bol) => {
    if (bol) {
      character.vy = character.speed
      character.animation._textures = character.action.walk
    } else {
      character.vy = 0
      character.animation._textures = character.action.stand
    }
  }
  
  character.key.object.attack.press = (bol) => {
    if (bol) {
      character.animation._textures = character.action.attack
    } else {
      character.animation._textures = character.action.stand
    }
  }
  
  character.key.object.defense.press = (bol) => {
    if (bol) {
      character.animation._textures = character.action.defense
    } else {
      character.animation._textures = character.action.stand
    }
  }
  
  character.key.object.jump.press = (bol) => {
    if (bol) {
      if (!character.key.object.jump.operate) character.jump.y = character.animation.y
      character.animation.y = character.jump.y + character.jump.value
      character.animation._textures = character.action.jump
    } else {
      if (character.key.object.jump.operate) character.animation.y = character.jump.y
      character.animation._textures = character.action.stand
    }
  }

  app.ticker.add(delta => {
    character.animation.x += character.vx
    character.animation.y += character.vy
  })
}

let textDemo = undefined
const actionText = () => {
  textDemo = new Text({ text: '', style: { fontSize: 16 } })
  textDemo.pivot.set(textDemo.height / 2, textDemo.width / 2)
  textDemo.x = app.renderer.width / 2
  textDemo.y = app.renderer.height - 50
  app.stage.addChild(textDemo)
  textDemo.text += '但艾米表情冷漠'
}

const handler = (env) => character.key.object[character.key.code[env.keyCode]].handler(env)

const init = async () => {
  // const target = new Character()
  // console.log(target.character)
  await actionLogoImage()
  await actionCharacter()
  await actionText()

  window.addEventListener('keydown', handler.bind(handler), false)
  window.addEventListener('keyup', handler.bind(handler), false)
}

init()
