/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

const GITHUB_REPO = 'https://github.com/nelsonkuang/redux/tree/master/examples/real-world'

export default class Explore extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value)
    }
  }

  getInputValue = () => {
    return this.input.value
  }

  setInputValue = (val) => {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    this.input.value = val
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleGoClick()
    }
  }

  handleGoClick = () => {
    this.props.onChange(this.getInputValue())
  }

  render() {
    return (
      <div>
        <p>输入 Github用户名 或者 Github项目全名，然后点击 “确定”:</p>
        <input size="45"
               ref={(input) => this.input = input}
               defaultValue={this.props.value}
               placeholder=" 如本人Github用户名 nelsonkuang "
               onKeyUp={this.handleKeyUp} />
        <button onClick={this.handleGoClick}>
          确定
        </button>
        <p>
          代码在 <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">Github</a>.
        </p>
        <p>
          如果要移动开发工具可以按 Ctrl+W 或者 按 Ctrl+H 来隐藏它
        </p>
      </div>
    )
  }
}
