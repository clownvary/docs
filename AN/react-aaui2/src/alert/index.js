import Alert from './Alert'

import { alert, clear } from './util'

const wrapProps = props => {
  let finalProps = props

  if (typeof props !== 'object') {
    finalProps = {
      message: props,
    }
  }

  return {
    ...finalProps,
  }
}

Alert.success = props =>
  alert({
    type: 'success',
    ...wrapProps(props),
  })

Alert.warning = props =>
  alert({
    type: 'warning',
    ...wrapProps(props),
  })

Alert.error = props =>
  alert({
    type: 'danger',
    ...wrapProps(props),
  })

Alert.info = props =>
  alert({
    type: 'info',
    ...wrapProps(props),
  })

Alert.clear = () => clear()

export default Alert
