import { Text } from 'pixi.js'

export default class {
  constructor () {
  }

  async init (app) {
    let textDemo = undefined
    textDemo = new Text({ text: 'Freeze', style: { fontSize: 16 } })
    textDemo.pivot.set(textDemo.height / 2, textDemo.width / 2)
    textDemo.x = app.renderer.width / 2 - textDemo.width / 2
    textDemo.y = app.renderer.height
    app.stage.addChild(textDemo)
  }
}