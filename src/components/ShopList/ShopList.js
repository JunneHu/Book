import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast, Carousel, Tabs, Button } from 'antd-mobile';
import Header from '../Header';
import './less/list.less';
import parse from 'url-parse';


class ShopList extends React.Component {

    constructor(props) {
        super(props);
        const url = parse(props.location.search, true);
        const { cid } = url.query;
        this.state = {
            cid
        }
    }
    componentWillMount() {
        this.init()
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { home: { banner } } = nextProps;
        if (banner !== props.home.banner) {
            const { code, data } = banner;
            if (code === '0') {
                this.setState({
                    bannerList: data.list
                })
            }
        }        
    }
    init = () => {
        const { pid } = this.state;
        this.props.dispatch({
            type: 'home/banner'
        })
        this.props.dispatch({
            type: 'category/category1',
            payload: {
                parentId: pid
            }
        })
    }
    render() {
        const { props } = this;
        const { } = this.state;
        return (
            <div>
                <Header {...props} title="商城列表" />
                <div className="main-page">
                22
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
export default connect(mapStateToProps)(ShopList);