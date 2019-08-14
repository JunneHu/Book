import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Header from '../Header';
import { Toast } from 'antd-mobile';
import { Link } from "dva/router";
import parse from 'url-parse';
import './less/detail.less'

class Detail extends React.Component {

	constructor(props) {
		super(props);
		const url = parse(props.location.search, true);
		const { bid } = url.query;
		const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
		this.state = {
			bid,
			detail: {},
			userInfo
		}
	}
	componentWillMount() {
		scrollTo(0, 0);
		const { bid } = this.state;
		this.init(bid);
	}
	componentWillReceiveProps(nextProps) {
		const { props } = this;
		const { book: { getBookInfo } } = nextProps;
		if (getBookInfo !== props.book.getBookInfo) {
			const { code, data } = getBookInfo;
			if (code === '0') {
				this.setState({
					detail: data
				})
			} else {
				Toast.info(getBookInfo.message);
			}
		}
	}
	init = (bid) => {
		this.props.dispatch({
			type: 'book/getBookInfo',
			payload: {
				id: bid
			}
		})
	}
	toRead = () => {
		const { detail } = this.state;
		this.props.history.push(`/chapter?cid=${detail.id}`)
	}
	toAdd = () => {
		const { detail, userInfo } = this.state;
		this.props.dispatch({
			type: 'book/userBook',
			payload: {
				bookId: detail.id,
				mobileNo: userInfo.mobileNo
			}
		})
	}
	render() {
		const { detail } = this.state;
		const { props } = this;
		return (
			<div className="detail-bg">
				<Header {...props} title="详情" />
				<div className="main-page">
					<div className="b-top">
						<div className="left">
							<img src={detail.img} />
							{detail.tips ? <div className="sale-tips">
								{detail.tips}
							</div> : ''}
						</div>
						<div className="right">
							<div className="title">{detail.title}</div>
							<div className="name">{detail.author}</div>
						</div>
					</div>
					<div className="b-center">
						<div className="h3">简介</div>
						<article>
							{detail.content}
						</article>
					</div>
					<div className="b-bottom">
						<button className="btn gost" onClick={this.toAdd}>加入书单</button>
						<button className="btn theme" onClick={this.toRead}>阅读</button>
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

export default connect(mapStateToProps)(Detail);