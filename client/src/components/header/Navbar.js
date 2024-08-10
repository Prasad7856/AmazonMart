import React, { useContext, useEffect, useState } from 'react'
import "./navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/Contextprovider';
import Rightheader from './Rightheader';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


export default function Navbar() {


    const { account, setAccount } = useContext(LoginContext);
    // console.log(account.carts);
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [dropen, setDropen] = useState(false);

    const getdetailvaliduser = async () => {

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (res.status !== 201) {
            console.log("error in valid user");

        }
        else {
            console.log("valid user");
            setAccount(data);
        }

    }

    const handleopen = () => {
        setDropen(true);
    }

    const handledrclose = () => {
        setDropen(false);
    }

    const [text, setText] = useState("");
    const [liopen, setLiopen] = useState(true);
    console.log("search : " + text);
    const { products } = useSelector(state => state.getproductsdata);

    const logoutuser = async () => {

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data2 = await res.json();
        console.log(data2);

        if (res.status !== 201) {
            console.log("error in valid user");

        }
        else {
            toast.success("user Logout 😃!", {
                position: "top-center"
            });
            setAccount(false);
            history("/");
        }

    }

    const getText = (item) => {
        setText(item);
        setLiopen(false);
    }

    useEffect(() => {
        getdetailvaliduser();
    }, []);


    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className='hamburgur' onClick={handleopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <Drawer open={dropen} onClose={handledrclose}>
                        <Rightheader logclose={handledrclose} logoutuser={logoutuser}/>
                    </Drawer>
                    <div className="navlogo">
                        <NavLink to='/'><img src="./amazon.png" alt="" /></NavLink>
                    </div>

                    <div className='nav_searchbaar'>
                        <input type="text" placeholder='Search your products' onChange={(e) => getText(e.target.value)} />
                        <div className="search_icon">
                            <SearchIcon id='search' />
                        </div>
                        {
                            text &&
                            <List className='extrasearch' hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem key={product.id}>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    </div>


                </div>
                <div className="right">
                    <div className="nav_btn">
                        <NavLink to="/login">signin</NavLink>
                    </div>
                    <div className="cart_btn">
                        {
                            account ? <NavLink to="/buynow">
                                <Badge badgeContent={account.carts.length} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink> :

                                <NavLink to="/login">
                                    <Badge badgeContent={0} color="primary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>
                                </NavLink>
                        }

                        <p>Cart</p>
                    </div>
                    {
                        account ? <Avatar className='avtar2' id="simple-menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
                        >{account.fname[0].toUpperCase()}</Avatar> : <Avatar className='avtar' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}></Avatar>
                    }


                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >

                        <MenuItem onClick={handleClose}>My account</MenuItem>

                        {account ? <MenuItem onClick={() => {
                            handleClose();
                            logoutuser();
                        }} style={{ margin: "10px" }}> <ExitToAppIcon style={{ fontSize: 16, marginRight: 3 }} />  Logout</MenuItem> : ""}

                    </Menu>

                    <ToastContainer />
                </div>
            </nav>

        </header>
    )
}
