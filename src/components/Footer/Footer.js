import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast, Icon } from 'antd-mobile';
import './less/footer.less';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pathname: props.location.pathname
        }
    }
    toUrl = (url) => {
        this.props.history.push(url);
    }
    render() {
        const { pathname } = this.state;
        return (
            <div className="footer-bg">
                <ul>
                    <li className={pathname === '/' ? "active" : ""} onClick={() => { this.toUrl('/') }}><Icon type="ellipsis" />书架</li>
                    <li className={pathname === '/list' ? "active" : ""} onClick={() => { this.toUrl('/list') }}><Icon type="ellipsis" />书城</li>
                    <li className={pathname === '/search' ? "active" : ""} onClick={() => { this.toUrl('/search') }}><Icon type="search" />发现</li>
                    <li className={pathname === '/my' ? "active" : ""} onClick={() => { this.toUrl('/my') }}><Icon type="ellipsis" />我的</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}
export default connect(mapStateToProps)(Footer);