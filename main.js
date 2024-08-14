import '@/style/index.css'
import { Application } from 'pixi.js'
import Keyboard  from '@/keyboard.js'

const init = async () => {
  const app = new Application()
  await app.init({ width: 800, height: 600, backgroundColor: 0xecedf1, antialias: false })
  document.body.appendChild(app.canvas)

  const keyboard = new Keyboard(app)
  keyboard.init()
}

init()
