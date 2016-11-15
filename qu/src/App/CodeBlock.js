import React, { Component, PropTypes } from 'react'
import hljs from 'highlight.js'

class CodeBlock extends Component {
  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.refs.code)
  }

  render() {
    return (
      <pre>
        <code ref="code" className={this.props.language}>
          {this.props.literal}
        </code>
      </pre>
    )
  }
}

CodeBlock.propTypes = {
  literal: PropTypes.string,
  language: PropTypes.string,
}

export default CodeBlock
