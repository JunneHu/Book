import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Carousel, Toast, SearchBar } from 'antd-mobile';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from "dva/router";
import './less/home.less';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstMenu: [],
            secondMenu: [],
            activeId: ''
        }
    }
    componentWillMount() {
        this.init()
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { category: { getCategory, getCategory1 } } = nextProps;
        if (getCategory !== props.category.getCategory) {
            const { code, data } = getCategory;
            if (code === '0') {
                this.setState({
                    firstMenu: data.list
                })
                this.checkMenu(data.list[0].id)
            }
        }
        if (getCategory1 !== props.category.getCategory1) {
            const { code, data } = getCategory1;
            if (code === '0') {
                this.setState({
                    secondMenu: data.list
                })
            }
        }
    }
    init = () => {
        this.props.dispatch({
            type: 'category/category',
            payload: {}
        })
    }
    checkMenu = (id) => {
        this.setState({
            activeId: id
        })
        this.props.dispatch({
            type: 'category/category1',
            payload: {
                parentId: id
            }
        })
    }
    toDetail = (id) => {
        const { activeId } = this.state;
        this.props.history.push(`/list?id=${id}&pid=${activeId}`)
    }
    render() {
        const { props } = this;
        const { firstMenu, secondMenu, activeId } = this.state;
        return (
            <div>
                <Header {...props} title="首页" />
                <div className="main-page">
                    <div className="home-page">
                        <div className="menu-bg">
                            <div className="menu-left">
                                <ul>
                                    {
                                        firstMenu && firstMenu[0] && firstMenu.map((v, i) => (
                                            <li key={i} className={activeId === v.id ? "active" : ''} onClick={() => { this.checkMenu(v.id) }}>
                                                <span>{v.name}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="menu-right">
                                <div className="second-menu">
                                    <ul>
                                        {
                                            secondMenu && secondMenu[0] && secondMenu.map((v, i) => (
                                                <li key={i} onClick={() => { this.toDetail(v.id) }}>
                                                    <img className="menu-img" src={v.img} />
                                                    <div className="menu-t">{v.name}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
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
export default connect(mapStateToProps)(Home);