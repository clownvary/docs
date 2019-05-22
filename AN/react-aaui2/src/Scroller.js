import { PureComponent } from 'react'
import { func, number } from 'prop-types'

export default class Scroller extends PureComponent {
  static propTypes = {
    children: func,
    threshold: number,
  }

  static defaultProps = {
    threshold: 50,
  }

  constructor() {
    super()

    this.boundOnScroll = this.onScroll.bind(this)
  }

  state = {
    scrolled: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.boundOnScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.boundOnScroll)
  }

  onScroll = () => {
    const { threshold } = this.props
    const scrollHeight = Math.max(
      document.documentElement.scrollTop,
      window.pageYOffset,
      document.body.scrollTop,
    )

    this.setState(() => ({
      scrolled: scrollHeight > threshold,
    }))
  }

  render() {
    const { scrolled } = this.state
    const { children } = this.props

    return children(scrolled)
  }
}
