import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const propTypes = {
  show: PropTypes.bool,
  skin: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.number,
  okBtn: PropTypes.bool,
  okBtnText: PropTypes.string,
  cancelBtn: PropTypes.bool,
  cancelBtnText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onCreated: PropTypes.func, 
  onDestroy: PropTypes.func,
  autoTime: PropTypes.number,
}

export const defaultProps = {
  skin: 'block',
  show: false,
  width: 250,
  okBtn: false,
  cancelBtn: false,
  okBtnText: '确定',
  cancelBtnText: '取消',
  onOk: function(){},
  onCancel: function(){},
  onCreated: function(){},
  onDestroy: function(){},
  autoTime: 2000,
}

class Dialog extends Component {
  constructor(props) {
    super(props)
    this.onOk = this.onOk.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  componentDidMount() {
    const {
      show,
      okBtn,
      cancelBtn,
      autoTime,
      onCreated,
      onDestroy
    } = this.props;
    if (show) {
      this.open()
      if(!okBtn || !cancelBtn){
        setTimeout(()=> {
          this.destroy()
          onDestroy && onDestroy()
        }, autoTime)
      } else {
        onCreated && onCreated()
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      show,
      okBtn,
      cancelBtn,
      autoTime,
      onDestroy,
      onCreated
    } = this.props;
    if (show !== prevProps.show && show) {
      this.open()
      if(!okBtn && !cancelBtn){
        setTimeout(()=> {
          this.destroy()
          onDestroy && onDestroy()
        }, autoTime)
      } else {
        onCreated && onCreated()
      }
    }
  }

  componentWillUnmount() {
    this.destroy()
    this.props.onDestroy && this.props.onDestroy()
  }

  onOk() {
    this.props.onOk && this.props.onOk()
    this.destroy()
  }

  onCancel() {
    this.props.onCancel && this.props.onCancel()
    this.destroy()
  }

  destroy() {
    if (this._el) {
      this._el.querySelector('.dialog__mask').classList.add('maskFadeOut')
      this._el.querySelector('.dialog__wrapper').classList.add('wrapperFadeOutUp')
      setTimeout(()=>{
        ReactDOM.unmountComponentAtNode(this._el)
        document.body.removeChild(this._el)
        this._el = null
      }, 150)
    }
  }

  open() {
    this._el = document.createElement('div')
    document.body.appendChild(this._el)
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.renderDialog(),
      this._el
    );
  }

  renderDialog() {
    const {
      skin,
      width,
      okBtn,
      okBtnText,
      children,
      cancelBtn,
      cancelBtnText
    } = this.props;

    return (
      <div className="dialog" key="dialog">
        <div className="dialog__mask maskFadeIn dialog_animated" style={{height: (document.body.offsetHeight > window.screen.height ? document.body.offsetHeight : window.screen.height) + 'px'}} />
        <div className={'dialog__wrapper wrapperFadeInDown dialog_animated dialog__wrapper--skin-' + skin} style={{left:'50%', top: (window.screen.height/2 - 100) + 'px', width: width + 'px', marginLeft: (width*(-1)/2) + 'px'}} >
          <div className="dialog__content">
            {children}
          </div>
          {(okBtn || cancelBtn) && (
            <div className="dialog__btns">
              {okBtn && (<button className="dialog__btn dialog__btn--ok" onClick={this.onOk}>{okBtnText}</button>)}
              {cancelBtn && <button className="dialog__btn dialog__btn--cancel" onClick={this.onCancel}>{cancelBtnText}</button>}
            </div>
          )}
        </div>
      </div>
    )

  }

  render() {
    return null
  }
}

Dialog.propTypes = propTypes
Dialog.defaultProps = defaultProps

export default Dialog
