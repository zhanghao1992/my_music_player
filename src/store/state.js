const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  palyList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  rank: {}
}
export default state
