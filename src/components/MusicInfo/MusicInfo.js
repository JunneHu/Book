import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast, Icon } from 'antd-mobile';
import Header from '../Header';
import mathManage from '../../utils/mathManage';
import parse from 'url-parse';
import './less/musicInfo.less';

class MusicInfo extends React.Component {

    constructor(props) {
        super(props);
        const url = parse(props.location.search, true);
        const { mid } = url.query;
        this.state = {
            mid,
            detail: {},
            showLyrics: false,
        }
    }
    componentWillMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { music: { getMusicInfo } } = nextProps;
        if (getMusicInfo !== props.music.getMusicInfo) {
            const { code, data } = getMusicInfo;
            if (code === '0') {
                this.setState({
                    detail: data
                })
            } else {
                Toast.info(getMusicInfo.message);
            }
        }
    }
    init = () => {
        const { mid } = this.state;
        this.props.dispatch({
            type: 'music/getMusicInfo',
            payload: {
                id: mid
            }
        })
    }
    componentDidMount() {
        let audio = this.refs.audio;
        audio.addEventListener('canplay', () => {
            //获取总时间
            let totalTime = parseInt(audio.duration);
            const time = mathManage.getTime(totalTime)
            this.setState({
                totalTime: time
            })
        })
    }

    render() {
        const { detail, showLyrics } = this.state;
        const { props } = this;
        return (
            <div className="music-info">
                <div className="music-header">
                    <div className="left" onClick={()=>{this.props.history.goBack()}}>
                        <Icon type="left" />
                    </div>
                    <div className="center">{detail.name}---{detail.musicist}</div>
                </div>
                <audio
                    className="audio"
                    src={detail.url}
                    autoPlay
                    controls
                    loop
                    ref="audio"
                >
                </audio>
                <div className="music-top">
                    
                </div>
                <div className="music-center">
                    {
                        showLyrics ?
                            <div className="lyrics" dangerouslySetInnerHTML={{
                                __html: detail.content
                            }} />
                            :
                            <div className="music-img">
                                <img src={detail.img} />
                            </div>
                    }
                </div>
                <div className="music-bottom">

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
export default connect(mapStateToProps)(MusicInfo);