import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav,
  NavItem, NavLink, NavbarToggler, Collapse,
  UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem } from 'reactstrap';
import { Route, NavLink as RouteNavLink } from 'react-router-dom';
import { toggleNavbar } from './navbar.act';


const mapStateToProps = state => {
  return {...state.navbar, isLoggedIn: state.auth.isLoggedIn, username: state.auth.username};
}

const mapDispatchToProps = dispatch => {
  return {
    toggleNavbar: () => dispatch(toggleNavbar())
  };
}

class ConnectedNavBar extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle = (event) => {
    event.preventDefault();
    this.props.toggleNavbar();
  }

  render () {

    let componentDependsOnLogin = (
      <Nav navbar>
        <NavItem>
          <NavLink to="/login" tag={RouteNavLink}>Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/signup" tag={RouteNavLink}>Signup</NavLink>
        </NavItem>
      </Nav>
    );
    
    if(this.props.isLoggedIn) {

      let profileURL = `/profile/${this.props.username}`;

      componentDependsOnLogin = (<Nav navbar>
        <NavItem>
          <b><NavLink to={profileURL} tag={RouteNavLink}>{this.props.username}</NavLink></b>
        </NavItem>
        <NavItem>
          <NavLink to="/contests" tag={RouteNavLink}>Contests</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/leaderboard" tag={RouteNavLink}>Leaderboard</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              Option 1
            </DropdownItem>
            <DropdownItem>
              Option 2
            </DropdownItem>
            <DropdownItem divider />
            <Route render={({history}) => (
              <DropdownItem onClick={e => {e.preventDefault(); history.push('/logout')}}>
                Log Out
              </DropdownItem>
            )} />
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>);
    }

    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand to="/" tag={RouteNavLink}> Ozone<sup>++</sup> </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.props.isOpen} navbar>
            <Nav className="mr-auto" />
            {componentDependsOnLogin}
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(ConnectedNavBar);
 