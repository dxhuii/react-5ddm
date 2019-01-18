import React, { PureComponent, Fragment } from 'react'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

@Shell
class Topics extends PureComponent {
  state = {
    width1: 0,
    width2: 0,
    width3: 0,
    width4: 0,
    width5: 0
  }
  componentDidMount() {
    this.engine(90.1, 1)
    this.engine(20, 2)
    this.engine(9, 3)
    this.engine(8, 4)
    this.engine(70, 5)
  }
  engine = (number, type) => {
    let timer
    let that = this
    const step = 2
    cancelAnimationFrame(timer)
    timer = requestAnimationFrame(function fn() {
      const w = that.state[`width${type}`]
      if (w < number) {
        that.setState({
          [`width${type}`]: w + step > number ? number : w + step
        })
        timer = requestAnimationFrame(fn)
      } else {
        cancelAnimationFrame(timer)
      }
    })
  }
  render() {
    const { width1, width2, width3, width4, width5 } = this.state
    return (
      <Fragment>
        <Meta title="话题" />
        <h2>Topics</h2>
        <div style={{ backgroundColor: 'lightblue', width: width1, height: 20, lineHeight: '20px' }}>{width1}%</div>
        <div style={{ backgroundColor: 'lightblue', width: width2, height: 20, lineHeight: '20px' }}>{width2}%</div>
        <div style={{ backgroundColor: 'lightblue', width: width3, height: 20, lineHeight: '20px' }}>{width3}%</div>
        <div style={{ backgroundColor: 'lightblue', width: width4, height: 20, lineHeight: '20px' }}>{width4}%</div>
        <div style={{ backgroundColor: 'lightblue', width: width5, height: 20, lineHeight: '20px' }}>{width5}%</div>
        <button onClick={() => this.engine(50, 2)}>run</button>
      </Fragment>
    )
  }
}

export default Topics
