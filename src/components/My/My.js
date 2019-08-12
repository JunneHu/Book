import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast, Icon } from 'antd-mobile';
import Header from '../Header';
import Footer from '../Footer';
import './less/my.less';

class My extends React.Component {

    constructor(props) {
        super(props);
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
        this.state = {
            userInfo
        }
    }
    toLogin=()=>{
        this.props.history.push(`/login?uri=${encodeURI(window.location.href)}`)
    }
    logOut = () => {
        localStorage.clear();
       this.toLogin();
    }
    render() {
        const { props } = this;
        const { userInfo } = this.state;
        return (
            <div className="my-bg">
                <Header {...props} title="我的" />
                <div className="main-page">
                    <div className="user-info">
                        <div className="user-img">
                            <div className="img"></div>
                        </div>
                        <div className="user-desc">
                            {
                                userInfo && userInfo.token ?
                                    <div className="name">{userInfo.userName || userInfo.mobileNo}<button className="btn gost" onClick={this.logOut}>退出登录</button></div>
                                    :
                                    <div className="btn-bg">
                                        <button className="btn theme" onClick={this.toLogin}>登录</button>
                                        <button className="btn gost">注册</button>
                                    </div>
                            }
                        </div>
                    </div>
                    <ul className="set-list">
                        <li>
                            <div className="left">我的订单</div>
                            <div className="right"><Icon type="right" /></div>
                        </li>
                    </ul>
                </div>
                <Footer {...props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}
export default connect(mapStateToProps)(My);