import React, { useState } from 'react'
import './NavBar.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PollIcon from '@material-ui/icons/Poll';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GroupIcon from '@material-ui/icons/Group';

function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuItem, setMenuItem] = useState('Security Tab');

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (e) => {
      setAnchorEl(null);
      console.log(e);
    };

    return (
        <div className="navbar-container">
            <div className="left-container">
                <img src="logo.png" alt="logo" className="logo"></img>
                <div className="menu-bar">
                    <DashboardIcon /><span>Dashboard</span>
                    <PollIcon /><span>New Queries</span>
                    <div className="dropdown-menu">
                        <GroupIcon />
                        <Button aria-haspopup="true" onClick={handleClick}>
                            Security Tab
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu> 
                    </div>                  
                </div>
            </div>
            <p className="signout">Sign out</p>
        </div>
    )
}

export default NavBar
