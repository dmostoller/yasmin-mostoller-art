import { NavLink, Link } from "react-router-dom";
import { useUser } from "../context/user";
import { DropdownMenu, Dropdown, Menu, MenuItem } from 'semantic-ui-react'
import { useDevice } from "../context/device";
// import { useAdmin } from "../context/admin";
import Logo from "../assets/logo.jpeg"


function Header({ onLogout}) {
    const { user } = useUser();
    // const { isAdmin } = useAdmin();
    const {deviceSize} = useDevice();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

// console.log(deviceSize)
   return ( 
    <Menu className='ui top fixed borderless menu huge'>
     {/* <Link to="/" className="header item" >YASMIN MOSTOLLER</Link> */}
     <Link to="/">
        <MenuItem header style={{padding: "3px"}}>
        {/* <img alt="logo" src={oldLogo} style={{width: "110px", margin: "0px"}}></img> */}
        <img alt="logo" src={Logo} style={{width: "70px", margin: "5px"}}></img>
            
        </MenuItem>
        </Link>
   
    {(deviceSize <= 768) && 
            <>
            <Dropdown     
            icon='large hamburger'
            style={{paddingLeft: "1em", paddingRight: "1em", paddingTop: "2em"}}
            floating
            className='dropdown icon'>
                <DropdownMenu>
                    <NavLink to="/gallery" className="item" style={{width: "250px"}}><h3>Gallery</h3></NavLink>
                    <NavLink to="/paintings" className="item" ><h3>Paintings</h3></NavLink>
                    <NavLink to="/events" className="item" ><h3>Exhibitions</h3></NavLink>
                    <NavLink to="/blog" className="item"><h3>News</h3></NavLink>
                    <NavLink to="/about" className="item" ><h3>Bio</h3></NavLink>
                    <NavLink to="/contact" className="item" ><h3>Contact</h3></NavLink>
                </DropdownMenu>
            </Dropdown>
            </>
        }
            
      
        
        {(deviceSize > 768) &&
        <>
        <NavLink to="/gallery" className="item" >Gallery</NavLink>
        <NavLink to="/paintings" className="item" >Paintings</NavLink>
        <NavLink to="/events" className="item" >Exhibitions</NavLink>
        <NavLink to="/blog" className="item">News</NavLink>
        <NavLink to="/about" className="item" >Bio</NavLink>
        <NavLink to="/contact" className="item" >Contact</NavLink>
        </> 
        }
        <div className='right menu'>
            <div className="item">
                { !user ? (
                    <>
                    <Link to='/login' style={{marginRight: '3px'}} data-tooltip="Login" data-position="bottom center" className="ui circular teal icon basic button huge">
                        <i className="sign in alternate icon"></i>
                    </Link>
                    <Link to='/signup' style={{marginRight: '3px'}} data-tooltip="Sign Up" data-position="bottom right" className="ui circular teal icon basic button huge">
                        <i className="user plus icon"></i>
                    </Link>
                    </>
                ) : (
                    <>
                    <button onClick={handleLogout} style={{marginRight: '3px'}} data-inverted="" data-tooltip="Logout" data-position="bottom center" className="ui circular teal basic icon button huge">
                        <i className="sign out alternate icon"></i>
                    </button>
                    <Link to='/user' style={{marginRight: '3px'}} data-inverted="" data-tooltip="User Profile" data-position="bottom right" className="ui circular teal icon basic button huge">
                        <i className="user icon"></i>
                    </Link>
                    </>
                )
                }
            </div>
        </div>
    </Menu>
    
    )
}

export default Header