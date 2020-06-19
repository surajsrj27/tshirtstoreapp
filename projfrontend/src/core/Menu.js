import React, { useState, Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';

import { signout, isAuthenticated } from '../auth/helper/index';

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#2ecc72'}
    } else{
        return {color:'#FFFFFF'}
    }
}

const Menu = ({history}) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return(
        <div>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/" style={currentTab(history, "/")}>Home</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        {localStorage.getItem("cart") && (
                            <NavItem>
                                <NavLink style={currentTab(history, "/cart")} href="/cart">
                                    Cart
                                </NavLink>  
                            </NavItem>     
                        )}
                    </NavItem>
                    <NavItem>
                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <NavItem>
                                <NavLink style={currentTab(history, "/user/Dashboard")} href="/user/Dashboard">
                                    Dashboard
                                </NavLink>
                            </NavItem>    
                        )}
                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <NavItem>
                                <NavLink style={currentTab(history, "/admin/Dashboard")} href="/admin/Dashboard">
                                    Dashboard
                                </NavLink>
                            </NavItem>    
                        )}
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    {!isAuthenticated() && (
                        <Fragment>
                            <NavItem>
                                <NavLink style={currentTab(history, "/signin")} href="/signin" className="text-primary">
                                    Signin
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={currentTab(history, "/signup")} href="/signup" className="text-primary">
                                    Signup
                                </NavLink>
                            </NavItem>
                        </Fragment>
                    )}
                    { isAuthenticated() && (
                        <NavItem>
                            <NavLink
                                className="nav-link text-warning"
                                onClick={() => {
                                    signout(() => {
                                        history.push("/");
                                    });
                                }}
                                href="/"
                            >
                                Signout
                            </NavLink>
                        </NavItem>
                    )}
                </Nav>
            </Collapse>
        </Navbar>
        <hr  style={{
            backgroundColor: '#DAE0E2'
        }}
        className="mt-1"
        />
    </div>        
    )
};

export default withRouter(Menu);