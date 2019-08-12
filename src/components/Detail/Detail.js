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
		this.state = {
			bid,
			detail: {}
		}
	}
	componentWillMount() {
		scrollTo(0, 0);

	}
	componentWillReceiveProps(nextProps) {
		const { props } = this;
		const { detail: { getGoodsLis } } = nextProps;
		if (sendOrder !== props.detail.sendOrder) {
			const { code, data } = sendOrder;
			if (code === '0') {
				// 成功跳转
			} else {
				Toast.info(sendOrder.message);
			}
		}
	}
	init = (parentId) => {
		this.props.dispatch({
			type: 'book/book',
			payload: {
				parentId
			}
		})
	}
	render() {
		const { detail } = this.state;
		const { props } = this;
		return (
			<div className="book-bg">
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
							<div className="name">{detail.name}</div>
						</div>
					</div>
					<div className="b-center">
						<div className="h3">简介</div>
						<article>
							{
								detail.content
							}
						</article>
					</div>
					<div className="b-bottom">
						<button className="btn">加入书单</button>
						<button className="btn">阅读</button>
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