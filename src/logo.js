import { Assets, Sprite } from 'pixi.js'

export default class {
  constructor () {
  }

  async init (app) {
    const logoTexture = await Assets.load(new URL('@/assets/images/vite.svg', import.meta.url).href)
    const logoSprite = new Sprite(logoTexture)
    logoSprite.x = app.renderer.width / 2 - logoSprite.width
    logoSprite.y = app.renderer.height - 10
    logoSprite.anchor.y = 1
    app.stage.addChild(logoSprite)
  }
}