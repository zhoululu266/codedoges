import React, {Component} from 'react';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card'
// import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import axios from 'axios'
import './style.css'

class MovieDetail extends Component {
	constructor() {
		super(props)
		this.state = {
			movieDetail: ''
		}
	}
	componentDidMount() {
		axios({
			method: 'get',
			url: '/api/doubanDetail',
			params: {
				//TODO 改成react-router提供的参数
				id: this.props.movieId
			}
		}).then(res => {
			let data = res.data
			if (data.status === 1) {
				console.log(data)
				this.setState({movieDetail: data})
			}
		})
	}
	render() {
		return (
			<div className="MovieDetail">
				<Card>
					<CardHeader title={this.state.movieDetail.title} avatar={this.state.movieDetail.avatar} subtitle={this.state.movieDetail.subtitle}/>
					<CardMedia overlay={< CardTitle title = {
						this.state.movieDetail.title
					}
					subtitle = {
						this.state.movieDetail.subtitle
					} />}/>
					<CardText>
						简介：{this.state.movieDetail.summary}
					</CardText>
				</Card>
			</div>
		);
	}
}

export default MovieDetail;
