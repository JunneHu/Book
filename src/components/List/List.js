import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast, Carousel, Tabs, Button } from 'antd-mobile';
import Header from '../Header';
import './less/list.less';
import parse from 'url-parse';


class List extends React.Component {

    constructor(props) {
        super(props);
        const url = parse(props.location.search, true);
        const { id, pid } = url.query;
        this.state = {
            firstMenu: [],
            secondMenu: [],
            id,
            pid
        }
    }
    componentWillMount() {
        this.init()
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { home: { banner }, category: { getCategory1, getCategory2 }, book: { book }, video: { getVideo }, article: { getArticle }, music: { getMusic } } = nextProps;
        if (banner !== props.home.banner) {
            const { code, data } = banner;
            if (code === '0') {
                this.setState({
                    bannerList: data.list
                })
            }
        }
        if (getCategory1 !== props.category.getCategory1) {
            const { code, data } = getCategory1;
            if (code === '0') {
                data.list[0] && data.list.map((v, i) => {
                    v.title = v.name;
                })
                this.setState({
                    firstMenu: data.list
                }, () => {
                    if (data.list[0] && data.list[0].id) {
                        this.getChild(data.list[0].id)
                    }
                })
            }
        }
        if (getCategory2 !== props.category.getCategory2) {
            const { code, data } = getCategory2;
            if (code === '0') {
                this.setState({
                    secondMenu: data.list
                })
            }
        }
        if (book !== props.book.book) {
            const { code, data } = book;
            if (code === '0') {
                this.setState({
                    bookList: data.list
                })
            }
        }
        if (getVideo !== props.video.getVideo) {
            const { code, data } = getVideo;
            if (code === '0') {
                this.setState({
                    videoList: data.list
                })
            }
        }
        if (getArticle !== props.article.getArticle) {
            const { code, data } = getArticle;
            if (code === '0') {
                this.setState({
                    articleList: data.list
                })
            }
        }
        if (getMusic !== props.music.getMusic) {
            const { code, data } = getMusic;
            if (code === '0') {
                this.setState({
                    musicList: data.list
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
    // 获取二级分类
    getSecond = (id) => {
        this.props.dispatch({
            type: 'category/category2',
            payload: {
                parentId: id
            }
        })
    }
    getBook = (id) => {
        this.props.dispatch({
            type: 'book/book',
            payload: {
                parentId: id
            }
        })
    }
    getVideo = (id) => {
        this.props.dispatch({
            type: 'video/video',
            payload: {
                parentId: id
            }
        })
    }
    getArticle = (id) => {
        this.props.dispatch({
            type: 'article/article',
            payload: {
                parentId: id
            }
        })
    }
    getMusic = (id) => {
        this.props.dispatch({
            type: 'music/music',
            payload: {
                parentId: id
            }
        })
    }
    getChild = (id, index) => {
        const { pid } = this.state;
        if (pid == '1') {
            // 书单
            this.getBook(id);
        } else if (pid == '2') {
            // 视频
            this.getVideo(id);
        } else if (pid == '3') {
            // 新闻
            this.getArticle(id);
        } else if (pid == '4') {
            // 商城二级分类
            this.getSecond(id);
        } else if (pid == '5') {
            // 音乐
            this.getMusic(id);
        }
    }
    toShop = (id) => {
        this.props.history.push(`/shop?cid=${id}`);
    }
    render() {
        const { props } = this;
        const { bannerList, MenuCarousel, firstMenu, secondMenu, pid, bookList, videoList, articleList, musicList } = this.state;
        let title = ''
        switch (pid) {
            case '1':
                title = '书城'
                break;
            case '2':
                title = '视频'
                break;
            case '3':
                title = '新闻'
                break;
            case '4':
                title = '商城'
                break;
            case '5':
                title = '音乐'
                break;
        }
        return (
            <div>
                <Header {...props} title={title} />
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
                        {
                            firstMenu[0] &&
                            <Tabs tabs={firstMenu} onChange={(tab, index) => { this.getChild(tab.id, index) }} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}></Tabs>
                        }
                    </div>
                    <div className="goods-main">
                        <div className="g-con">
                            <ul>
                                {
                                    bookList && bookList[0] ? bookList.map((v, i) => (
                                        <li key={i} onClick={() => { this.props.history.push(`/detail?bid=${v.id}`); }}>
                                            <div className="left">
                                                <img src={v.img} />
                                            </div>
                                            <div className="center">
                                                <div className="name">{v.title}</div>
                                                <div className="desc" dangerouslySetInnerHTML={{
                                                    __html: v.content
                                                }} />
                                            </div>
                                            <Button className="right">查看</Button>
                                        </li>
                                    )) : ''
                                }
                                {
                                    videoList && videoList[0] ? videoList.map((v, i) => (
                                        <li key={i} onClick={() => { this.toBook(v.id) }}>
                                            <div className="left">
                                                <img src={v.img} />
                                            </div>
                                            <div className="center">
                                                <div className="name">{v.name}</div>
                                                <div className="desc" dangerouslySetInnerHTML={{
                                                    __html: v.content
                                                }} />
                                            </div>
                                            <Button className="right">查看</Button>
                                        </li>
                                    )) : ''
                                }
                                {
                                    articleList && articleList[0] ? articleList.map((v, i) => (
                                        <li key={i} onClick={() => { this.toBook(v.id) }}>
                                            <div className="left">
                                                <img src={v.img} />
                                            </div>
                                            <div className="center">
                                                <div className="name">{v.title}</div>
                                                <div className="desc" dangerouslySetInnerHTML={{
                                                    __html: v.content
                                                }} />
                                            </div>
                                            <Button className="right">查看</Button>
                                        </li>
                                    )) : ''
                                }
                                {
                                    musicList && musicList[0] ? musicList.map((v, i) => (
                                        <li key={i} onClick={() => { this.props.history.push(`/musicInfo?mid=${v.id}`); }}>
                                            <div className="left">
                                                <img src={v.img} />
                                            </div>
                                            <div className="center">
                                                <div className="name">{v.name}</div>
                                                <div className="desc">歌手--{v.musicist}</div>
                                            </div>
                                            <Button className="right">查看</Button>
                                        </li>
                                    )) : ''
                                }
                                {
                                    secondMenu && secondMenu[0] ? secondMenu.map((v, i) => (
                                        <li key={i} onClick={() => { this.toShop(v.id) }} className="second-menu">
                                            <img src={v.img} className="second-img" />
                                            <div className="name">{v.name}</div>
                                        </li>
                                    )) : ''
                                }
                            </ul>
                        </div>
                    </div>
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
export default connect(mapStateToProps)(List);