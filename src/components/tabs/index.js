import React, { Component } from "react"
import { Link } from 'react-router-dom'

import CSSModules from 'react-css-modules'
import styles from './index.scss'

@CSSModules(styles)
class Tabs extends Component {
	constructor(props){
		super(props)
		this.state = {
			currentIndex: 0
		}
  }

	tabLi( index ){
		return index === this.state.currentIndex ? 'active' : ''
	}

	tabCon( index ){
		return index === this.state.currentIndex ? 'show' : 'hide'
	}

	render(){
    const { icon, title, link, linkText, isJp } = this.props
		return(
			<>
        { /* 动态生成Tab导航 */ }
        <div styleName='title'>
          <Link to={link}>{linkText}<i className="iconfont icon-right"></i></Link>
          <h2>{icon} {title}</h2>
          <ul styleName='tab'>
            {
              React.Children.map(this.props.children, (element, index) => {
                return(
                  <li onClick={() => {this.setState({currentIndex: index})}} styleName={this.tabLi(index)}>{`${ index !== 0 ? '周' : ''}${element.props.name}`}{isJp && index !== 0 ? <em>{isJp[index]}</em> : ''}</li>
                )
              })
            }
          </ul>
        </div>
				{ /* Tab内容区域 */ }
				{
					React.Children.map(this.props.children, (element, index) => {
						return(
							<div styleName={ this.tabCon(index) }>{ element }</div>
						)
					})
				}
			</>
		)
	}
}

export default Tabs
