import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast } from 'antd-mobile';
import Header from '../Header';
import Footer from '../Footer';
import './less/home.less';

class Home extends React.Component {

    constructor(props) {
        super(props);
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
        this.state = {
            userInfo
        }
    }
    toLogin = () => {
        this.props.history.push(`/login?uri=${encodeURI(window.location.href)}`)
    }
    render() {
        const { props } = this;
        const { userInfo } = this.state;
        return (
            <div>
                <Header {...props} title="首页" />
                <div className="main-page">
                    {
                        userInfo && userInfo.token ?
                            <ul className="my-book">
                                <li>
                                    <img src="" className="book-img" />
                                    <div className="name">这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题</div>
                                </li>
                                <li>
                                    <img src="" className="book-img" />
                                    <div className="name">这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题</div>
                                </li>
                                <li>
                                    <img src="" className="book-img" />
                                    <div className="name">这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题</div>
                                </li>
                                <li>
                                    <img src="" className="book-img" />
                                    <div className="name">这里是标题这里是标题这里</div>
                                </li>
                                <li>
                                    <img src="" className="book-img" />
                                    <div className="name">这里是标题这里是标题这里</div>
                                </li>
                            </ul>
                            :
                            <div className="login-info">
                                <div className="box">
                                    <button className="btn theme" onClick={this.toLogin}>查看书架</button>
                                    <p>登录即可获取个人书架</p>
                                </div>
                            </div>
                    }
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
export default connect(mapStateToProps)(Home);