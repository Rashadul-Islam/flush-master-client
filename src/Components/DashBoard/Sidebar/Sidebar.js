import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import './Sidebar.css'
import ViewListIcon from '@mui/icons-material/ViewList';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { UserContext, UserContext2 } from '../../../App';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ReviewsIcon from '@mui/icons-material/Reviews';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [isAdmin, setIsAdmin] = useContext(UserContext2);

    const handleSignOut = () => {
        setLoggedInUser({});
        sessionStorage.clear();
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {isAdmin ?
                    <>
                        <ListItem button component={Link} to="/home">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText className='item_hover' primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/dashboard">
                            <ListItemIcon>
                                <ViewListIcon />
                            </ListItemIcon>
                            <ListItemText className='item_hover' primary="Order List" />
                        </ListItem>
                        <ListItem button component={Link} to="/addService">
                            <ListItemIcon>
                                <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText className='item_hover' primary="Add Service" />
                        </ListItem>
                        <ListItem button component={Link} to="/makeAdmin">
                            <ListItemIcon>
                                <PersonAddAltIcon />
                            </ListItemIcon>
                            <ListItemText className='item_hover' primary="Make Admin" />
                        </ListItem>
                        <ListItem button component={Link} to="/manageServices">
                            <ListItemIcon>
                                <ManageAccountsIcon />
                            </ListItemIcon>
                            <ListItemText className='item_hover' primary="Manage Service" />
                        </ListItem>
                        <ListItem button onClick={handleSignOut}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                    :
                    <>
                        <ListItem button component={Link} to="/home">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText className='item_hover' primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/book">
                            <ListItemIcon>
                                <AddShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText className='item_hover' primary="Book" />
                        </ListItem>
                        <ListItem button component={Link} to="/bookList">
                            <ListItemIcon>
                                <LocalGroceryStoreIcon />
                            </ListItemIcon>
                            <ListItemText className='item_hover' primary="Bookings" />
                        </ListItem>
                        <ListItem button component={Link} to="/review">
                            <ListItemIcon>
                                <ReviewsIcon />
                            </ListItemIcon>
                            <ListItemText className='item_hover' primary="Review" />
                        </ListItem>
                        <ListItem button onClick={handleSignOut}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
