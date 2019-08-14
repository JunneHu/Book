import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast, Icon, Button } from 'antd-mobile';
import Header from '../Header';
import parse from 'url-parse';
import './less/book.less';

class Book extends React.Component {

    constructor(props) {
        super(props);
        const url = parse(props.location.search, true);
        const { cid } = url.query;
        this.state = {
            bookList: [],
            postData: {
                pageIndex: 1,
                pageSize: 10,
                parentId: cid
            }
        }
    }
    componentWillMount() {
        this.init()
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { book: { book } } = nextProps;
        if (book !== props.book.book) {
            const { code, data } = book;
            if (code === '0') {
                this.setState({
                    bookList: data.list,
                    total: data.total
                })
            }
        }
    }
    init = () => {
        const { postData } = this.state;
        this.props.dispatch({
            type: 'book/book',
            payload: {
                ...postData
            }
        })
    }
    toDetail = (bid) => {
        this.props.history.push(`/detail?bid=${bid}`)
    }
    render() {
        const { props } = this;
        const { bookList } = this.state;
        return (
            <div className="book-bg">
                <Header {...props} title="结果" />
                <div className="main-page">
                    <ul>
                        {
                            bookList && bookList[0] ? bookList.map((v, i) => (
                                <li key={i} onClick={() => { this.toDetail(v.id) }}>
                                    <div className="left">
                                        <img src={v.img} />
                                        {v.tips ? <div className="sale-tips">
                                            {v.tips}
                                        </div> : ''}
                                    </div>
                                    <div className="center">
                                        <div className="name">{v.title}</div>
                                        <div className="price">
                                            <span className="del-price">{v.author}</span>
                                        </div>
                                    </div>
                                    <Button className="right">阅读</Button>
                                </li>
                            )) : ''
                        }
                    </ul>
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
export default connect(mapStateToProps)(Book);