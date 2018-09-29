import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav,
  NavItem, NavLink, NavbarToggler, Collapse,
  UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem } from 'reactstrap';
import { Route, NavLink as RouteNavLink } from 'react-router-dom';
import { toggleNavbar } from '../../reducers/navbar/navbar.act';


const mapStateToProps = state => {
  return {...state.navbar, isLoggedIn: state.auth.isLoggedIn};
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

    let componentDependsOnLogin = (<Nav navbar><NavItem>
        <NavLink to="/login" tag={RouteNavLink}>Login</NavLink>
      </NavItem></Nav>);
    if(this.props.isLoggedIn) {
      componentDependsOnLogin = (<Nav navbar>
        <NavItem>
          <NavLink href="/contests">Contests</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/leaderboard">Leaderboard</NavLink>
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
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/"> Ozone<sup>++</sup> </NavbarBrand>
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
 