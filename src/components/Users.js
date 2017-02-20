import React, {Component} from 'react';
import {Link} from 'react-router';
import {Avatar} from 'material-ui';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as Icons from './Icons';

const style = {
	marginBottom: '0.5em',
};

class User extends Component {
	render() {
		return (
			<Link to={`/users/${this.props.id}`}>
				<Card style={style}>
				<CardHeader
					title={`${this.props.name}`}
					subtitle={this.props.email}
					avatar={<Avatar icon={<Icons.Avatar/>}/>}
				/>
				</Card>
			</Link>
		);
	}
}

User.propTypes = {
	id: React.PropTypes.string,
	name: React.PropTypes.string,
	email: React.PropTypes.string
};

class Users extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: {}
		};
	}

	componentWillMount() {
		fetch('https://react-pwa-hello-world.firebaseio.com/users.json').then(res => {
			if (res.status !== 200) {
				throw new Error(res.toString());
			}

			res.json().then(data => {
				this.setState({
					users: data
				});
			});
		})
		.catch(function(err) {  
    	console.log('Fetch Error :-S', err);  
  	});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state !== nextState || nextProps.params.id !== this.props.params.id;
	}

	render() {
		const users = () => {
			if (this.state.users) {
				const user = (id, i) => (
					<User key={`${id}-${i}`} id={id} {...this.state.users[id]}/>
				);

				if (this.props.params.id) {
					return user(this.props.params.id, 0);
				} else {
					return Object.keys(this.state.users).map((id, i) => {
						return user(id, i);
					});
				}
			}
		}

		return (
			<div>
				{users()}
			</div>
		);
	}
}

Users.propTypes = {
	params: React.PropTypes.object
};

export default Users;