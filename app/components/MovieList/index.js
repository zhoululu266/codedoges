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
		fetch('/api/movielist').then(res => {
			return res.json()
		}).then(data => {
			if (data.status === 1) {
				console.log(data.data)
				this.setState({movies: data.data})
			} else {
				alert(data.msg)
			}
		}).catch(err => {
			console.log(err)
		});
	}
	render() {
		return (
			<div className='movie-wrapper'>
				{this.state.movies
					? this.state.movies.map(movie => {
						return <Card style={{
							width: '250px'
						}}>
							<CardMedia overlay={< CardTitle title = {
								movie.moviename
							} />}>
								<img src={movie.poster}/>
							</CardMedia>
							<CardActions className='clearfixed'>
								<RaisedButton label="评分" style={{
									float: 'left'
								}}/>
								<RaisedButton label="点赞" secondary={true} style={{
									float: 'right',
									marginRight: 0
								}}/>
							</CardActions>
						</Card>
					})
					: <CircularProgress className='loading-progress'></CircularProgress>}
			</div>
		);
	}

}

export default MovieList;
