import React, { Component } from 'react';
import axios from 'axios';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser, logout} from '../../redux/reducer'
import './Nav.css';


class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/api/auth/me')
    .then(res => updateUser(res.data))
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(_ => logout())
  }
  
  render() {
    console.log(this.props)
      return this.props.location.pathname !== '/' &&
        <div className='nav'>
          <div className='nav-profile-container'>
            <div className='nav-profile-pic' style={{backgroundImage: `url(${this.props.profilePicture})`}}></div>
            <p>placeholder username</p>
          </div>
          <div className='nav-links'>
            <Link to='/dash'><img className='nav-img' src={homeLogo} alt='home' /></Link>
            <Link to='/form'><img className='nav-img' src={newLogo} alt='new post' /></Link>
          </div>
          <Link to='/' onClick={() => this.logout()}><img className='nav-img logout' src={logoutLogo} alt='logout' /></Link>
        </div>
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
    profilePicture: state.profilePicture
  }
}

export default withRouter(connect(mapStateToProps, {updateUser, logout})(Nav));