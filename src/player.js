import Load from '@/utils/load.js'
import { Assets, Texture, AnimatedSprite } from 'pixi.js'

// 角色資訊可往外傳
export class Player {
  constructor () {
    this.id = 0
    this.name = 'com'
    this.team = 0
    this.keys = {
      74: 'left',
      73: 'up',
      76: 'right',
      188: 'down',
      190: 'defense',
      75: 'attack',
      32: 'jump'
    }
    this.mp = 0
    this.hp = 0
    this.x = 0
    this.y = 0
    this.isEffect = false
    this.isBreak = false
    this.isJump = false
  }

  init () {
    // this.keys = new Keyboard()
  }

  action () {

  }

  async wait () {
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
    
    const actionPlayer = async () => {
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

    const handler = (env) => character.key.object[character.key.code[env.keyCode]].handler(env)

    // const target = new Player()
    // console.log(target.character)
    await actionPlayer()

    window.addEventListener('keydown', handler.bind(handler), false)
    window.addEventListener('keyup', handler.bind(handler), false)
  }
}
