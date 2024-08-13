import '@/style/index.css'
import { Application } from 'pixi.js'
import Keyboard  from '@/keyboard.js'
import Player from '@/player.js'

export const app = new Application()

const init = async () => {
  // app
  await app.init({ width: 800, height: 600, backgroundColor: 0xecedf1, antialias: false })
  document.body.appendChild(app.canvas)

  const keyboard = new Keyboard()
  window.addEventListener('keydown', (env) => keyboard.action(env), false)
  window.addEventListener('keyup', (env) => keyboard.action(env), false)
  // window.addEventListener('keypress', keyboard.action.bind(keyboard.action), false)

  const player = new Player(app)
  player.init()

  // app.ticker.add(_delta => {
  app.ticker.add(() => {
    keyboard.update()
    player.update({ obj: keyboard.get })
  })
}

init()
