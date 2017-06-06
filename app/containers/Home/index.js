import React, {Component} from 'react';
import MovieList from '../../components/MovieList'

class Home extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				<MovieList></MovieList>
			</div>
		);
	}
}

export default Home;
