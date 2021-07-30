import React, { useState } from 'react'
import './NavBar.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PollIcon from '@material-ui/icons/Poll';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GroupIcon from '@material-ui/icons/Group';
import { ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

function NavBar() {
    const options = ['Security Tab', 'User Management', 'Identity Management', 'Hierarchy', 'Commision Transfer'];
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (e) => {
      setAnchorEl(null);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
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
                        <Button
                            aria-haspopup="true"
                            aria-controls="simple-menu" aria-haspopup="true" color="primary"
                            onClick={handleClick}
                        >
                            {options[selectedIndex]}
                        </Button>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {options.map((option, index) => (
                                <StyledMenuItem>                                
                                    <ListItemText
                                        primary={option}                                        
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                    />
                                </StyledMenuItem>))}
                        </StyledMenu>
                    </div>                  
                </div>
            </div>
            <p className="signout">Sign out</p>
        </div>
    )
}

export default NavBar
