import './App.css';
import React, {useEffect, useState} from 'react';
import './semantic/dist/semantic.min.css'
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from "./context/user";
import { useAdmin } from "./context/admin.js"
import { Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header.js';
import PaintingsPage from './components/PaintingsPage.js';
import HomePage from './components/HomePage.js';
import ContactPage from './components/ContactPage.js';
import EventsPage from './components/EventsPage.js';
import AboutPage from './components/AboutPage.js';
import Footer from './components/Footer.js';
import PaintingDetail from './components/PaintingDetail.js';
import PostDetail from './components/PostDetail.js';
import AddPost from './components/AddPost.js'
import LoginForm from './components/Login.js';
import SignUp from './components/SignUp.js';
import AddEvent from './components/AddEvent.js';
import AddPainting from './components/AddPainting.js';
import EventDetail from './components/EventDetail.js';
import EditPainting from './components/EditPainting.js';
import EditPost from './components/EditPost.js';
import EditEvent from './components/EditEvent.js';
import User from './components/User.js';
import { useDevice } from './context/device.js';
import { useFolders } from './context/folder.js';
import Favicon from "react-favicon";
import favUrl from './assets/favicon.ico'
import Blog from './components/Blog.js';
import Gallery from './components/Gallery.js';
import PrintPoll from './components/PrintPoll.js';
import PollAdmin from './components/PollAdmin.js';


export default function App() {
  const { setUser } = useUser()
  const { setIsAdmin } = useAdmin()
  const {setDeviceSize} = useDevice()
  const {setFolders} = useFolders()
  const [hasActivePoll, setHasActivePoll] = useState(false);



  useEffect(() => {
    const resizeW = () => setDeviceSize(window.innerWidth);
    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });

  useEffect(() => {
    fetch(`/folder`)
    .then((res) => res.json())
    .then((folders) => {setFolders(folders)})
  }, [setFolders]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          user.is_admin ? setIsAdmin(true) : setIsAdmin(false);
        }
    )}
    });
  }, [setUser, setIsAdmin]);


  function handleLogin(user) {
    setUser(user);
    user.is_admin ? setIsAdmin(true) : setIsAdmin(false)
    toast(`Welcome back, ${user.username}!`);

  }
  function handleLogout() {
    setUser(null);
    setIsAdmin(false)
    navigate('/')
    toast(`Goodbye, thanks for visiting!`);
  }

  useEffect(() => {
    // Fetch the current poll data to check if there is an active poll
    axios.get('/current_poll')
      .then(response => {
        if (response.data.paintings) {
          setHasActivePoll(true);
        } else {
          setHasActivePoll(false);
        }
      })
      .catch(error => {
        console.error('Error fetching current poll:', error);
        setHasActivePoll(false);
      });
  }, []);

  return (
    <div className='ui fluid container' style={{minHeight: "100vh"}}>
        <div>
            <Header onLogout={handleLogout}/>
        </div>
        <div className="ui container" style={{marginTop: "90px"}}>
        <Favicon url={favUrl} />
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user" element={<User />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/paintings" element={<PaintingsPage />} />
                <Route path="/paintings/:id" element={<PaintingDetail />} />
                <Route path="/paintings/new" element={<AddPainting />}/>
                <Route path="/paintings/:id/edit" element={<EditPainting />}/>
                <Route path="/events" element={<EventsPage/>} />
                <Route path="/events/new" element={<AddEvent/>} />
                <Route path="/posts/:id" element={<PostDetail/>} />
                <Route path="/posts/:id/edit" element={<EditPost />} />
                <Route path="/events/:id" element={<EventDetail />} /> 
                <Route path="/events/:id/edit" element={<EditEvent/>} /> 
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/posts/new" element={<AddPost/>} />
                <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
                <Route path="/poll" element={<PrintPoll/>}/>
                <Route path='/polladmin' element={<PollAdmin/>}/>
            </Routes>
        </div>
        <div>
            <Footer />
        </div>
        {hasActivePoll && (
        <Link to="/poll">
          <Button className="floating-button" size='huge' circular color="teal">
            <span className="button-text">🎨 Vote & Win Art! 🖼️</span>
          </Button>
        </Link>
      )}
    </div>
    
  );
}

