import React from 'react'
import PropTypes from 'prop-types'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { saveScrollPosition, setScrollPosition } from '@/store/actions/scroll'
import { addVisitHistory } from '@/store/actions/history'

// tools
import parseUrl from '@/common/parse-url'

// 壳组件，用于给页面组件，套一个外壳
// 这样可以通过壳组件，给每个页面，传递参数
export default Component => {
  @connect(
    (state, props) => ({}),
    dispatch => ({
      saveScrollPosition: bindActionCreators(saveScrollPosition, dispatch),
      setScrollPosition: bindActionCreators(setScrollPosition, dispatch),
      addVisitHistory: bindActionCreators(addVisitHistory, dispatch)
    })
  )
  class Shell extends React.Component {
    static propTypes = {
      location: PropTypes.object,
      setScrollPosition: PropTypes.func,
      addVisitHistory: PropTypes.func,
      saveScrollPosition: PropTypes.func
      // componentWillUnmount: PropTypes.func,
      // componentDidMount: PropTypes.func
    }

    constructor(props) {
      super(props)
      const { search } = props.location
      this.props.location.params = search ? parseUrl(search) : {}
      this.state = {
        notFoundPgae: '',
        hasError: ''
      }
    }

    // 组件加载完成
    componentDidMount() {
      const { pathname, search } = this.props.location
      this.props.setScrollPosition(pathname + search)
      this.props.addVisitHistory(pathname + search)
      this.setState({
        location: this.props.location
      })
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //   console.log(nextProps, prevState, 'shell')
    //   if (prevState.location.pathname + prevState.location.search != nextProps.location.pathname + nextProps.location.search) {
    //     nextProps.componentWillUnmount()
    //     prevState.props = nextProps
    //     nextProps.componentDidMount()
    //   }
    //   return prevState
    // }

    // componentWillReceiveProps(props) {
    //   // 组件url发生变化
    //   console.log(this.props, props, 'receive')
    //   if (this.props.location.pathname + this.props.location.search != props.location.pathname + props.location.search) {
    //     this.componentWillUnmount()
    //     this.props = props
    //     this.componentDidMount()
    //   }
    // }

    // 组件被卸载
    componentWillUnmount() {
      const { pathname, search } = this.props.location
      this.props.saveScrollPosition(pathname + search)
    }

    componentDidCatch(error, info) {
      console.log(error)
      console.log(info)

      // Display fallback UI
      this.setState({ hasError: error })
      // You can also log the error to an error reporting service
      // logErrorToMyService(error, info);
    }

    render() {
      const { notFoundPgae, hasError } = this.state

      if (notFoundPgae) {
        return <div>{notFoundPgae}</div>
      } else if (hasError) {
        return (
          <div>
            <div>页面发生错误</div>
            <div>{hasError}</div>
          </div>
        )
      } else {
        return (
          <Component
            {...this.props}
            notFoundPgae={content => {
              this.setState({ notFoundPgae: content || '404 NOT FOUND' })
            }}
          />
        )
      }
    }
  }

  return Shell
}
