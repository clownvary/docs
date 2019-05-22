import Loading from './Loading'
import { show, hide, reset } from './util'

Loading.show = (...props) => show(...props)

Loading.hide = () => hide()

Loading.reset = () => reset()

export default Loading
