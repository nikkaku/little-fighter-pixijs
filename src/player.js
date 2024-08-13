import { Graphics } from 'pixi.js'
import Keyboard  from '@/keyboard.js'

export default class {
  constructor (app) {
    this.app = app
    this.id = 0
    this.player = null
    this.name = 'com'
    this.team = 0
    this.mp = 0
    this.hp = 0
    this.isEffect = false
    this.isBreak = false
    this.jump = null
    this.jumpY = 0
  }

  init (color = '8e8e8e') {
    if (this.player) this.player.clear()
    else this.player = new Graphics()
    this.player.rect(300, 300, 50, 50)
    this.player.fill(`0x${color}`)
    this.app.stage.addChild(this.player)
  }

  update ({ obj }) {
    const speed = 3
    const active = Keyboard.format(Object.values(obj.active))
    const history = Keyboard.format(Object.values(obj.history))

    if (this.jump !== null) {
      if (this.jump) {
        this.player.vy = -speed * 2
        if (this.jumpY - 160 > this.player.y) this.jump = false
      } else if (!this.jump) {
        if (this.jumpY <= this.player.y) {
          this.player.vy = this.jumpY - this.player.y
          this.jump = null
        } else this.player.vy = speed * 2.1
      }
    } else if (active.includes(75)) {
      this.init('d65959')
    } else if (active.includes(190)) {
      this.init('65d3ff')
    } else if (active.includes(32)) {
      this.init('14ac16')
      this.jump = true
      this.jumpY = structuredClone(this.player.y)
    } else if (active.includes(73)) {
      this.player.vx = 0
      this.player.vy = history[history.length - 1] === 73 ? -speed * 2 : -speed
      this.init('3c3c3c')
    } else if (active.includes(74)) {
      this.player.vx = history[history.length - 1] === 74 ? -speed * 2 : -speed
      this.player.vy = 0
      this.init('3c3c3c')
    } else if (active.includes(76)) {
      this.player.vx = history[history.length - 1] === 76 ? speed * 2 : speed
      this.player.vy = 0
      this.init('3c3c3c')
    } else if (active.includes(188)) {
      this.player.vx = 0
      this.player.vy = history[history.length - 1] === 188 ? speed * 2 : speed
      this.init('3c3c3c')
    } else {
      this.player.vx = 0
      this.player.vy = 0
      this.init()
    }

    this.player.x += this.player.vx
    this.player.y += this.player.vy
  }

  // async wait () {
  //   const actionPlayer = async () => {
  //     await Assets.load(new URL('@/assets/freeze.json', import.meta.url).href)
  //     for (const [key, arr] of Object.entries(character.action)) {
  //       character.action[key] = arr.map(item => Texture.from(`rollSequence${item.toString().padStart(4, '0')}.png`))
  //     }
  //     character.animation = new AnimatedSprite(character.action.stand)
  //     character.animation.animationSpeed = .1
  //     character.animation.pivot.set(character.animation._texture.frame.height / 2, character.animation._texture.frame.width / 2)
  //     character.animation.x = app.renderer.width / 2
  //     character.animation.y = app.renderer.height / 2
  //     character.animation.play()
  //     app.stage.addChild(character.animation)
    
  //     character.key.object = Object.entries(character.key.code).reduce((acc, cur) => {
  //       const target = { code: Number(cur[0]), press: undefined, operate: false }
      
  //       target.handler = (env) => {
  //         switch (env.type) {
  //           case 'keydown':
  //             if (target.press) target.press(true)
  //             target.operate = true
  //             break
  //           case 'keyup':
  //             if (target.press) target.press(false)
  //             target.operate = false
  //             break
  //         }
  //         env.preventDefault()
  //       }
      
  //       acc[cur[1]] = target
  //       return acc
  //     }, {})
    
    
  //     character.key.object.left.press = (bol) => {
  //       if (bol) {
  //         character.vx = -character.speed
  //         character.animation.scale.x = -1
  //         character.animation._textures = character.action.walk
  //       } else {
  //         character.vx = 0
  //         character.animation._textures = character.action.stand
  //       }
  //     }
      
  //     character.key.object.up.press = (bol) => {
  //       if (bol) {
  //         character.vy = -character.speed
  //         character.animation._textures = character.action.walk
  //       } else {
  //         character.vy = 0
  //         character.animation._textures = character.action.stand
  //       }
  //     }
      
  //     character.key.object.right.press = (bol) => {
  //       if (bol) {
  //         character.vx = character.speed
  //         character.animation.scale.x = 1
  //         character.animation._textures = character.action.walk
  //       } else {
  //         character.vx = 0
  //         character.animation._textures = character.action.stand
  //       }
  //     }
      
  //     character.key.object.down.press = (bol) => {
  //       if (bol) {
  //         character.vy = character.speed
  //         character.animation._textures = character.action.walk
  //       } else {
  //         character.vy = 0
  //         character.animation._textures = character.action.stand
  //       }
  //     }
      
  //     character.key.object.attack.press = (bol) => {
  //       if (bol) {
  //         character.animation._textures = character.action.attack
  //       } else {
  //         character.animation._textures = character.action.stand
  //       }
  //     }
      
  //     character.key.object.defense.press = (bol) => {
  //       if (bol) {
  //         character.animation._textures = character.action.defense
  //       } else {
  //         character.animation._textures = character.action.stand
  //       }
  //     }
      
  //     character.key.object.jump.press = (bol) => {
  //       if (bol) {
  //         if (!character.key.object.jump.operate) character.jump.y = character.animation.y
  //         character.animation.y = character.jump.y + character.jump.value
  //         character.animation._textures = character.action.jump
  //       } else {
  //         if (character.key.object.jump.operate) character.animation.y = character.jump.y
  //         character.animation._textures = character.action.stand
  //       }
  //     }
    
  //     // app.ticker.add(delta => {
  //     //   character.animation.x += character.vx
  //     //   character.animation.y += character.vy
  //     // })
  //   }

  //   // const handler = (env) => character.key.object[character.key.code[env.keyCode]].handler(env)

  //   // const target = new Player()
  //   // console.log(target.character)
  //   // await actionPlayer()

  //   // window.addEventListener('keydown', handler.bind(handler), false)
  //   // window.addEventListener('keyup', handler.bind(handler), false)
  // }
}
