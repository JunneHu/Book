import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast, Carousel, Tabs, Button } from 'antd-mobile';
import Header from '../Header';
import Footer from '../Footer';
import './less/list.less';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstMenu: [],
            secondMenu: []
        }
    }
    componentWillMount() {
        this.init()
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { home: { banner, category1, category2 } } = nextProps;
        if (banner !== props.home.banner) {
            const { code, data } = banner;
            if (code === '0') {
                this.setState({
                    bannerList: data.list
                })
            }
        }
        if (category1 !== props.home.category1) {
            const { code, data } = category1;
            if (code === '0') {
                data.list[0] && data.list.map(v => {
                    v.title = v.name;
                })
                this.setState({
                    firstMenu: data.list
                }, () => {
                    this.getSecond(data.list[0].id)
                })
            }
        }
        if (category2 !== props.home.category2) {
            const { code, data } = category2;
            if (code === '0') {
                this.setState({
                    secondMenu: data.list
                })
            }
        }
    }
    init = () => {
        this.props.dispatch({
            type: 'home/banner'
        })
        this.props.dispatch({
            type: 'home/category1'
        })
    }
    getSecond = (pid) => {
        this.props.dispatch({
            type: 'home/category2',
            payload: {
                parentId: pid
            }
        })
    }
    toBook=(id)=>{
        this.props.history.push(`/book?cid=${id}`);
    }
    render() {
        const { props } = this;
        const { bannerList, MenuCarousel, firstMenu, secondMenu } = this.state;
        return (
            <div>
                <Header {...props} title="书城" />
                <div className="main-page">
                    <div className="banner-bg">
                        {
                            bannerList && bannerList[0] ?
                                <Carousel
                                    autoplay={true}
                                    infinite
                                >
                                    {
                                        bannerList.map((v, i) => (
                                            <li style={{ width: '100%', height: '4.26rem' }}>
                                                <a
                                                    key={i}
                                                    // onClick={() => { this.toBanner(v) }}
                                                    style={{ display: 'inline-block', width: '100%', height: '4.26rem' }}
                                                >
                                                    <img
                                                        src={v.img}
                                                        alt=""
                                                        className="banner-img"
                                                        style={{ width: '100%', verticalAlign: 'top' }}
                                                        onLoad={() => {
                                                            window.dispatchEvent(new Event('resize'));
                                                        }}
                                                    />
                                                </a>
                                            </li>
                                        ))
                                    }
                                </Carousel>
                                :
                                <div className="no-banner">暂无广告图片</div>
                        }
                    </div>
                    <div className="home-g-title">
                        <Tabs tabs={firstMenu} onChange={(tab) => { this.getsecondMenu(tab.id) }} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}></Tabs>
                    </div>
                    <div className="goods-main">
                        <div className="g-con">
                            <ul>
                                {
                                    secondMenu && secondMenu[0] ? secondMenu.map((v, i) => (
                                        <li key={i} onClick={() => { this.toBook(v.id) }}>
                                            <div className="left">
                                                <img src={v.img} />
                                            </div>
                                            <div className="center">
                                                <div className="name">{v.name}</div>
                                                <div className="desc">
                                                   这里是描述
                                                </div>
                                            </div>
                                            <Button className="right">查看</Button>
                                        </li>
                                    )) :
                                        <div className="no-data">暂无数据</div>
                                }
                            </ul>
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
export default connect(mapStateToProps)(List);