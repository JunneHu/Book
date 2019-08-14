import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast, Icon, Button } from 'antd-mobile';
import Header from '../Header';
import parse from 'url-parse';
import './less/chapter.less';

class Chapter extends React.Component {

    constructor(props) {
        super(props);
        const url = parse(props.location.search, true);
        const { cid } = url.query;
        this.state = {
            cid,
            chapterList: []
        }
    }
    componentWillMount() {
        this.init()
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { book: { getChapterByBookId }, home: { toModalMid } } = nextProps;
        if (getChapterByBookId !== props.book.getChapterByBookId) {
            const { code, data } = getChapterByBookId;
            if (code === '0') {
                this.setState({
                    chapterList: data.list
                })
            }
        }
        if (toModalMid !== props.home.toModalMid) {
            this.setState({
                showMenu: !this.state.showMenu
            })
        }
    }
    init = () => {
        const { cid } = this.state;
        this.props.dispatch({
            type: 'book/getChapterByBookId',
            payload: {
                cid
            }
        })
    }
    showMenu = () => {
        this.setState({
            showMenu: true
        })
    }
    hideMenu = () => {
        this.setState({
            showMenu: false
        })
    }
    render() {
        const { props } = this;
        const { chapterList, showMenu } = this.state;
        return (
            <div className="chapter-bg">
                <Header {...props} title="章节" />
                <div className="main-page">
                    {
                        chapterList[0] && chapterList.map((v, i) => (
                            <div className="chapter-con">
                                <div className="c-title">
                                    {v.title}
                                </div>
                                <div className="c-con" key={i} dangerouslySetInnerHTML={{
                                    __html: v.content
                                }} />
                            </div>
                        ))
                    }
                </div>
                {
                    showMenu &&
                    <div className="c-menu">
                        <div className="left" onClick={this.hideMenu}></div>
                        <div className="right">
                            <ul>
                                {
                                    chapterList[0] && chapterList.map((v, i) => (
                                        <li>{v.title}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}
export default connect(mapStateToProps)(Chapter);