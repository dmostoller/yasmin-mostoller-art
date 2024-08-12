import { NavLink, Link } from "react-router-dom";
import { useUser } from "../context/user";
import { DropdownMenu, Dropdown, Menu, MenuItem } from 'semantic-ui-react'
import { useDevice } from "../context/device";
import Logo from "../assets/yasi-logo-1.png"


function Header({ onLogout}) {
    const { user } = useUser();
    const {deviceSize} = useDevice();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

// console.log(deviceSize)
   return ( 
    <Menu className='ui top fixed borderless menu large'>
    {(deviceSize <= 768) && 
            <>
            <Dropdown     
            icon='large hamburger'
            style={{padding: "1.3em"}}
            floating
            className='dropdown icon'>
                <DropdownMenu>
                    <NavLink to="/" className="item" style={{width: "200px"}}><h3>Home</h3></NavLink>
                    <NavLink to="/blog" className="item"><h3>Blog</h3></NavLink>
                    <NavLink to="/about" className="item" ><h3>About Me</h3></NavLink>
                    <NavLink to="/paintings" className="item" ><h3>Paintings</h3></NavLink>
                    <NavLink to="/events" className="item" ><h3>Exhibitions</h3></NavLink>
                    <NavLink to="/contact" className="item" ><h3>Contact</h3></NavLink>
                </DropdownMenu>
            </Dropdown>
            </>
        }
            
        {/* <Link to="/" className="header item" >YASMIN MOSTOLLER</Link> */}
        <Link to="/">
        <MenuItem header style={{padding: "1px"}}>
            <img alt="logo" src={Logo} style={{width: "110px", margin: "0px"}}></img>
        </MenuItem>
        </Link>
        
        {(deviceSize > 768) &&
        <>
        <NavLink to="/" className="item" >Home</NavLink>
        <NavLink to="/blog" className="item">Blog</NavLink>
        <NavLink to="/about" className="item" >About Me</NavLink>
        <NavLink to="/paintings" className="item" >Paintings</NavLink>
        <NavLink to="/events" className="item" >Exhibitions</NavLink>
        <NavLink to="/contact" className="item" >Contact</NavLink>
        </> 
        }
        <div className='right menu'>
            <div className="item">
                { !user ? (
                    <>
                    <Link to='/login' style={{marginRight: '3px'}} data-tooltip="Login" data-position="bottom center" className="ui circular teal icon button large">
                        <i className="sign in alternate icon"></i>
                    </Link>
                    <Link to='/signup' style={{marginRight: '3px'}} data-tooltip="Sign Up" data-position="bottom right" className="ui circular teal icon button large">
                        <i className="plus icon"></i>
                    </Link>
                    </>
                ) : (
                    <>
                    <button onClick={handleLogout} style={{marginRight: '3px'}} data-inverted="" data-tooltip="Logout" data-position="bottom center" className="ui circular teal icon button large">
                        <i className="sign out alternate icon"></i>
                    </button>
                    <Link to='/user' style={{marginRight: '3px'}} data-inverted="" data-tooltip="User Profile" data-position="bottom right" className="ui circular teal icon button large">
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