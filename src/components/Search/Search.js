import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast, SearchBar, Icon } from 'antd-mobile';
import Header from '../Header';
import Footer from '../Footer';
import './less/search.less';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchList: []
        }
    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { book: { getListByName } } = nextProps;
        if (getListByName !== props.book.getListByName) {
            const { code, data } = getListByName;
            if (code === '0') {
                this.setState({
                    searchList: data.list
                })
            }
        }
    }
    init = () => {
        const { value } = this.state;
        if (!value) {
            this.setState({
                searchList:[]
            })
            return;
        }
        this.props.dispatch({
            type: 'book/getListByName',
            payload: {
                title: value
            }
        })
    }
    onChange = (value) => {
        this.setState({ value }, () => {
            console.log(value)
            this.init()
        });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    toDetail=(v)=>{
        this.props.history.push(`/detail?bid=${v.id}`)
    }
    render() {
        const { props } = this;
        const { searchList, value } = this.state;
        return (
            <div>
                <Header {...props} title="发现" />
                <div className="main-page">
                    <div className="search-bg">
                        <SearchBar
                            placeholder="搜索"
                            value={value}
                            onChange={this.onChange}
                            onClear={this.clear}
                        />
                    </div>
                    {
                        searchList.length ?
                            <div className="search-bottom">
                                <h5>搜索结果</h5>
                                <ul className="search-list">
                                    {
                                        searchList.map((v, i) => (
                                            <li onClick={()=>{this.toDetail(v)}} key={i}>{v.title}<span className="author">{v.author}</span></li>
                                        ))
                                    }
                                </ul>
                            </div>
                            :
                            <div className="search-bottom">
                                <h5>热门搜索</h5>
                                <ul className="book-list">
                                    <li>这是名称</li>
                                    <li>这是名称</li>
                                    <li>这是名称</li>
                                    <li>这是名称</li>
                                    <li>这是名称</li>
                                </ul>
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
export default connect(mapStateToProps)(Search);