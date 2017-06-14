import React, {Component} from 'react';
import MovieList from '../../components/MovieList'
import BottomNav from '../../components/Bottom-Nav'
class Home extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				<MovieList></MovieList>
				<BottomNav></BottomNav>
			</div>
		);
	}
}

export default Home;
