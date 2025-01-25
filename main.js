import '@/style/index.css'
import { Application } from 'pixi.js'
import Keyboard from '@/keyboard.js'
import Load from '@/utils/load.js'

const init = async () => {
  try {
    const app = new Application()
    await app.init({ width: 800, height: 600, backgroundColor: 0xecedf1, antialias: false })
    document.body.appendChild(app.canvas)

    // loading character
    const load = new Load()
    await load.init()

    const keyboard = new Keyboard(app)
    keyboard.init()
  } catch (err) {
    console.warn(err)
  }
}

init()

