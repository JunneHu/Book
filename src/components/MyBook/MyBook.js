import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast } from 'antd-mobile';
import Header from '../Header';
import Footer from '../Footer';
import './less/myBook.less';

class MyBook extends React.Component {

    constructor(props) {
        super(props);
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
        this.state = {
            userInfo,
            bookList: []
        }
    }
    componentWillMount() {
        const { userInfo } = this.state;
        if (userInfo.token) {
            this.init()
        }
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { book: { userBookList } } = nextProps;
        if (userBookList !== props.book.userBookList) {
            const { code, data } = userBookList;
            if (code === '0') {
                this.setState({
                    bookList: data.list 
                })
            }
        }
    }
    init = () => {
        const { userInfo } = this.state;
        this.props.dispatch({
            type: 'book/userBookList',
            payload: {
                mobileNo: userInfo.mobileNo
            }
        })
    }
    toLogin = () => {
        this.props.history.push(`/login?uri=${encodeURI(window.location.href)}`)
    }
    render() {
        const { props } = this;
        const { userInfo, bookList } = this.state;
        return (
            <div>
                <Header {...props} title="首页" />
                <div className="main-page">
                    {
                        userInfo && userInfo.token ?
                            <ul className="my-book">
                                {
                                    bookList.length ? bookList.map((v, i) => (
                                        <li key={i}>
                                            <img src={v.img} className="book-img" />
                                            <div className="name">{v.title}</div>
                                        </li>
                                    ))
                                    :''
                                }
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
export default connect(mapStateToProps)(MyBook);