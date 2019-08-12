import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Modal, InputItem, Toast, Button, Icon } from 'antd-mobile';
import './less/loginModal.less';
import Header from '../Header';
import parse from 'url-parse';

const RegTel = /^1(3|4|5|6|7|8|9)\d{9}$/;

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    const url = parse(props.location.search, true);
    const { uri } = url.query;
    this.state = {
      mobile: '',
      password: '',
      uri
    }
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { login } = nextProps;
    if (login.loginResult !== props.login.loginResult) {
      const { code, message, data } = login.loginResult;
      if (code === '0') {
        Toast.success('登录成功！');
        localStorage.setItem('userInfo', JSON.stringify(data));
        window.location.href = this.state.uri ? decodeURI(this.state.uri) : '/my';
      } else {
        Toast.fail(message);
      }
    }
  }
  changeInput = (val, type) => {
    this.setState({
      [type]: val
    })
  }
  onLogin = () => {
    const { mobile, password } = this.state;
    if (!RegTel.test(mobile))
      return Toast.info('请输入正确的手机号');
    const postD = {
      mobileNo: mobile.replace(/\s/g, ''),
      password,
    }
    const { props: { dispatch } } = this;
    dispatch({ type: 'login/login', payload: postD });
  }
  render() {
    const { mobile, password } = this.state;
    return (
      <div className="login-modal">
        <Header
          {...this.props}
          jump={() => this.props.history.push('/')}
          title="短信验证"
          myLoading={!!(this.props.loading.effects.login)}  // 判断loading
        />
        <div className="banner">
          <div className="head_img">
          </div>
          <div className="right-txt">
            <div className="h1">登录</div>
            <div className="h5">请输入手机号登录</div>
          </div>
        </div>
        <div className="login-bg">
          <InputItem
            placeholder="输入11位手机号"
            onChange={(val) => { this.changeInput(val, 'mobile') }}
            value={mobile}
            maxLength="11"
          ></InputItem>
          <InputItem
            placeholder="输入密码"
            type="password"
            onChange={(val) => { this.changeInput(val, 'password') }}
            value={password}
          ></InputItem>
          <div className="btn-bg">
            <button className="btn theme" onClick={this.onLogin}>登录</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(LoginModal);
