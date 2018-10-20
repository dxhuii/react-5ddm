import React, { Component } from 'react'

import Shell from '../../components/shell'
import Meta from '../../components/meta'

import WeekDay from '../../components/week'
import Top from '../../components/top'
import List from '../../components/list'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

@Shell
export class Week extends Component {

  render() {
    return(
      <>
        <Meta title="星期" keywords="星期, 番表" description="星期" />
        <Row>
          <Col md={12} xl={9}>
            <WeekDay title="番剧" moreLink="/" isJp={['', '月','火','水','木','金','土','日']} />
          </Col>
          <Col md={12} xl={3}>
            <Top order="hits_month" area="JP" />
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col md={12} xl={9}>
            <WeekDay title="国创" moreLink="/" isCN={true} />
          </Col>
          <Col md={12} xl={3}>
            <Top order="hits_month" area="CN" />
          </Col>
        </Row>
        <List key="weekList" scrollLoad={true}/>
      </>
    )
  }
}

export default Week
