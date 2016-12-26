import { Schema, arrayOf } from 'normalizr'

const story = new Schema('story')
const user = new Schema('user')

export default {
  STORY: story,
  STORY_ARRAY: arrayOf(story),
  USER: user,
}
