import React from 'react'
import PropTypes from 'prop-types'

/**
 * 异步组件（异步加载一些小组件）
 *
 * 使用方法:
 *
 * <Bundle load={() => import('../../components/sidebar')}>
 *  {Sidebar => <Sidebar />}
 * </Bundle>
 */
export default class AsyncComponent extends React.Component {
  static propTypes = {
    load: PropTypes.func,
    children: PropTypes.any
  }
  constructor(props) {
    super(props)
    this.state = {
      mod: null
    }
  }

  componentDidMount() {
    this.load(this.props)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState.mod && nextProps.load(nextProps)
  }

  load(props) {
    this.setState({ mod: null })
    // 注意这里，使用Promise对象; mod.default导出默认
    props.load().then(mod => {
      this.setState({
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}
