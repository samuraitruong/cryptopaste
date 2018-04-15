import React from 'react'
import logo from './logo.svg'
import {Link} from 'react-router-dom'
import { Navbar, Nav , NavItem} from 'react-bootstrap'

export const AppHeader = (props) => (
    <Navbar inverse collapseOnSelect className="navbar-expand-lg navbar-light bg-orange">
        <Navbar.Header>
            <Navbar.Brand>
            <Link className="navbar-brand" to="/">
                 <img src={logo} className="app-header-logo app-logo-spin" alt="logo" />
                 <span>CryptoBin.me</span>
             </Link>
            </Navbar.Brand>
        </Navbar.Header>
        {/* <Navbar.Toggle className="navbar-toggler" /> */}
        
        <Navbar.Collapse >
            <Nav className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                <NavItem componentClass={Link} href="/faq" to="/faq"  className="nav-link">FAQ</NavItem>

            </Nav>
        </Navbar.Collapse>
    </Navbar>
    // <nav className="navbar navbar-expand-lg navbar-light bg-orange">
    //     <div className="container">
    //         <Link className="navbar-brand" to="/">
    //             <img src={logo} className="app-header-logo app-logo-spin" alt="logo" />
    //             <span>CryptoBin.me</span>
    //         </Link>
    //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //             <span className="navbar-toggler-icon"></span>
    //         </button>

    //         <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
    //             <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
    //                 <li className="nav-item active">
    //                     <a className="nav-link" href="#">AFQ <span className="sr-only">(current)</span></a>
    //                 </li>
    //             </ul>
                
    //         </div>
    //     </div>
    // </nav>
)

export default AppHeader