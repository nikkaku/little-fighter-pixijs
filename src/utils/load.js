export default class {
  constructor() {
    this.data = {}
  }

  async init() {
    const url = await import.meta.glob('@/assets/data/*.txt', { eager: true, import: 'default' })
    const response = await fetch(url['/src/assets/data/freeze.txt'])
      .then(res => res.text())
      .then(res => res)

    this.formatDatFile(response)
  }

  json() {
    return this.data
  }

  formatDatFile(val) {
    const target = val
      // format picture url
      .replace(/file\((\d*)-(\d*)\)(.*)/g, 'file_$1_$2:\nurl$3\nfile_end:')
      .replace(/<frame> ([0-9].*) (.*)/g, '"$1":{\n   type: $2  ')

      // format add colon
      .replace(/walking_frame_rate/, 'walking_frame_rate:')
      .replace(/walking_speed/, 'walking_speed:')
      .replace(/walking_speedz/, 'walking_speedz:')
      .replace(/running_frame_rate/, 'running_frame_rate:')
      .replace(/running_speed/, 'running_speed:')
      .replace(/running_speedz/, 'running_speedz:')
      .replace(/heavy_walking_speed/, 'heavy_walking_speed:')
      .replace(/heavy_walking_speedz/, 'heavy_walking_speedz:')
      .replace(/heavy_running_speed/, 'heavy_running_speed:')
      .replace(/heavy_running_speedz/, 'heavy_running_speedz:')
      .replace(/jump_height/, 'jump_height:')
      .replace(/jump_distance/, 'jump_distance:')
      .replace(/jump_distancez/, 'jump_distancez:')
      .replace(/dash_height/, 'dash_height:')
      .replace(/dash_distance/, 'dash_distance:')
      .replace(/dash_distancez/, 'dash_distancez:')
      .replace(/rowing_height/, 'rowing_height:')
      .replace(/rowing_distance/, 'rowing_distance:')

      // format label
      .replace(/<frame_end>/g, '},')
      .replace(/<bmp_begin>/, '"bmp":{')
      .replace(/<bmp_end>/, '},')
      .replace(/bdy:/g, '"bdy":{')
      .replace(/bdy_end:/g, '},')
      .replace(/opoint:/g, '"opoint":{')
      .replace(/opoint_end:/g, '},')
      .replace(/bpoint:/g, '"bpoint":{')
      .replace(/bpoint_end:/g, '},')
      .replace(/cpoint:/g, '"cpoint":{')
      .replace(/cpoint_end:/g, '},')
      .replace(/wpoint:/g, '"wpoint":{')
      .replace(/wpoint_end:/g, '},')
      .replace(/itr:/g, '"itr":{')
      .replace(/itr_end:/g, '},')
      .replace(/file_(\d*)_(\d*):/g, '"file_$1_$2":{')
      .replace(/file_end:/g, '},')

      // format array
      .replace(/catchingact: (\d*) (\d*)/g, '"catchingact":[$1,$2],')
      .replace(/caughtact: (\d*) (\d*)/g, '"caughtact":[$1,$2],')

      // format json
      .replace(/([\d\w]*): ([\d\w\\.-]*)/g, '"$1":"$2",')
      .replace(/\s/g, '')
      .replace(/\\/g, '\\\\')
      .replace(/,},/g, '},')
      .replace(/},}/g, '}}')
      .replace(/},$/g, '}')

    // this.data = target
    this.data = JSON.parse(`{${target}}`)
    console.log([...new Set(Object.values(this.data).map(item => Number(item.pic)).sort((a, b) => a > b ? 1 : -1))])
  }
}
