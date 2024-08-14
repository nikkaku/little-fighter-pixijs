import { Graphics, Text, Container, BlurFilter } from 'pixi.js'
import Keyboard  from '@/keyboard.js'

export default class {
  constructor (app) {
    this.app = app
    this.keys = []
    this.id = 0
    this.player = null
    this.character = null
    this.name = null
    this.team = 0
    this.mp = 0
    this.hp = 0
    this.jump = null
    this.jumpY = 0
  }

  init (color = '8e8e8e') {
    if (!this.player) {
      this.player = new Container()
      this.app.stage.addChild(this.player)
      this.player.x = 300
      this.player.y = 300

      this.character = new Graphics()
      this.character.rect(0, 0, 50, 50)
      this.character.fill(`0x${color}`)
      this.character.x = (this.player.width - this.character.width) / 2
      this.character.y = (this.player.height - this.character.height) / 2
      this.player.addChild(this.character)

      const userName = 'username'
      const style = { fontSize: 14, fontWeight: '200', align: 'center', fill: 0x000000, letterSpacing: 1 }
      this.name = new Container()
      const shadow = new Text({ text: userName, style, resolution: window.devicePixelRatio })
      shadow.filters = [new BlurFilter({ kernelSize: 5, quality: 6, strength: 1 })]
      const label = new Text({ text: userName, style: { ...style, fill: 0xffffff }, resolution: window.devicePixelRatio })
      this.name.addChild(shadow)
      this.name.addChild(label)
      this.name.y = (this.character.height - this.name.height) / 2 + 20
      this.name.pivot.set(this.name.width / 2, this.name.height / 2)
      this.player.addChild(this.name)
    } else {
      this.character.clear()
      this.character.rect(0, 0, 50, 50)
      this.character.fill(`0x${color}`)
    }
  }

  add (env) {
    this.keys.push({ keyCode: env.keyCode, type: env.type, timestamp: new Date().getTime() })
  }

  update ({ obj }) {
    const speed = 2.8
    const active = Keyboard.format(Object.values(obj.active)).filter(item => [75, 190, 32, 73, 74, 76, 188].includes(item))
    const history = Keyboard.format(Object.values(obj.history))

    if (this.jump !== null) {
      if (this.jump) {
        this.player.vy = -speed * 2.8
        if (this.jumpY - 210 > this.player.y) this.jump = false
      } else if (!this.jump) {
        if (this.jumpY <= this.player.y) {
          this.player.vy = this.jumpY - this.player.y
          this.jump = null
        } else this.player.vy = speed * 3
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
}
