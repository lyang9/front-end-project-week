import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Auth0Lock } from 'auth0-lock';
import auth0 from 'auth0-js';

const NavbarContainer = styled.div`
  border: 1px solid gray;
  width: 300px;
  height: 610px;
  background: #D3D2D3;
`;

const NavButton = styled.button`
  width: 180px;
  height: 40px;
  margin-bottom: 25px;
  border: 1px solid gray;
  background: #24b8bd;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

var lock = new Auth0Lock(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_DOMAIN_URL
);

var webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_DOMAIN_URL,
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: 'http://localhost:3000/callback'
});
webAuth.parseHash((err, authResult) => {
  if (authResult) {
    // save the tokens from authResult in local storage or a cookie
    console.log('Auth Result:', authResult);
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
  } else if (err) {
    // handle errors
    console.log(err);
  }
});

class NavBar extends Component {
  render() {
    if (this.isAuthenticated()) {
      return (
        <NavbarContainer>
          <h1>Lambda Notes</h1>

          <Link to='/'>
            <NavButton>View Your Notes</NavButton>
          </Link>

          <Link to='/new'>
            <NavButton>+ Create New Note</NavButton>
          </Link>

          <div onClick={this.logout}>Log out</div>
        </NavbarContainer>
      );
    } else {
      return (
        <div>
          <h3>Please click login to use Note App</h3>
          <div 
            id='btn-login'
            onClick={function() {
              lock.show();
            }}
          >
            LOG IN
          </div>
        </div>
      );
    }
  }
  isAuthenticated() {
    // check whether the current time is past the access Token's expire time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

export default NavBar;

// const NavBar = props => {
//   return (
//     <NavbarContainer>
//       <h1>Lambda Notes</h1>

//       <Link to='/'>
//         <NavButton>View Your Notes</NavButton>
//       </Link>

//       <Link to='/new'>
//         <NavButton>+ Create New Note</NavButton>
//       </Link>

//       <div 
//         onClick={function() {
//           lock.show();
//         }}
//       >
//         LOG IN
//       </div>
    
//     </NavbarContainer>
//   );
  
// }