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

        }
    }
    componentDidMount() {
        // this.autoFocusInst.focus();
    }
    onChange = (value) => {
        this.setState({ value });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    handleClick = () => {
    }
    render() {
        const { props } = this
        return (
            <div>
                <Header {...props} title="发现" />
                <div className="main-page">
                    <div className="search-bg">
                        <SearchBar
                            placeholder="搜索"
                            ref={ref => this.manualFocusInst = ref}
                        />
                    </div>
                    <div className="search-bottom">
                        <h5>热门搜索</h5>
                        <ul className="book-list">
                            <li>这是名称</li>
                            <li>这是名称</li>
                            <li>这是名称</li>
                            <li>这是名称</li>
                            <li>这是名称</li>
                        </ul>
                        <h5>搜索历史</h5>
                        <ul className="search-list">
                            <li>这是名称<Icon type="cross" /></li>
                            <li>这是名称<Icon type="cross" /></li>
                            <li>这是名称<Icon type="cross" /></li>
                            <li>这是名称<Icon type="cross" /></li>
                            <li>这是名称<Icon type="cross" /></li>
                        </ul>
                    </div>
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