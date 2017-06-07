import React, {Component} from 'react';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import axios from 'axios'
import './style.css'
import '../main.css'

class MovieList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			movies: ''
		}
	}
	componentDidMount() {
		// 获取豆瓣电影top250
		axios({
			// url: '/api/movielist',
			url: '/api/doubantop250',
			method: 'get'
		}).then(res => {
			let data = res.data
			if (data.status === 1) {
				console.log(data.data)
				this.setState({movies: data.data.subjects})
			} else {
				alert(data.msg)
			}
		}).catch(err => {
			alert(err)
		});
	}
	render() {
		return (
			<div className='movie-wrapper clearfixed'>
				{this.state.movies
					? this.state.movies.map(movie => {
						return <Card key={movie.id} className='movie-container'>
							<CardMedia overlay={< CardTitle title = {
								movie.title
							}
							subtitle = {
								`${movie.rating.average} 分`
							} />}>
								<img src={movie.images.large} style={{
									height: '320px'
								}}/>
							</CardMedia>
							<CardTitle title={movie.casts[0].name.replace(/\·/g, '').length > 8
								? movie.casts[0].name.substring(0, 8) + '...'
								: movie.casts[0].name} subtitle={`${movie.year} 年`} className='movie-title'/>
							<CardText>
								导演：{movie.directors[0].name}
							</CardText>
							<CardActions className='clearfixed'>
								<RaisedButton label="评分" style={{
									float: 'left'
								}}/>
								<RaisedButton label="点赞" secondary={true} className='movie-likebtn'/>
							</CardActions>
						</Card>
					})
					: <CircularProgress className='loading-progress'></CircularProgress>}
			</div>
		);
	}

}

export default MovieList;
