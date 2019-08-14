import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast, Icon } from 'antd-mobile';
import './less/header.less';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pathname: props.location.pathname
        }
    }
    showModal=()=>{
        this.props.dispatch({
            type: 'home/toMid',
            payload: { toModalMid: Math.random() }
        })
    }
    render() {
        const { pathname } = this.state;
        const { title } = this.props;
        return (
            <div className="header-bg">
                <div className="left" onClick={()=>{this.props.history.goBack()}}>{
                    (pathname !== '/' && pathname !== '/search' && pathname !== '/list' && pathname !== '/my') ? <Icon type="left" /> : ''
                }
                </div>
                <div className="center">{title}</div>
                <div className="right" onClick={this.showModal}><Icon type="ellipsis" /></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}
export default connect(mapStateToProps)(Header);