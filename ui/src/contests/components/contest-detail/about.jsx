import React from 'react'
import { Container } from 'reactstrap'
import ReactMarkdown from 'react-markdown'

export default class ContestAbout extends React.Component {
  render () {
    return (
      <Container>
        <ReactMarkdown source={this.props.description} />
      </Container>
    )
  }
}
