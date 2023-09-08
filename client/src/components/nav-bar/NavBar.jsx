import React from 'react';
import axios from"axios";
import './NavBar.css';
import institutionLogo from './InstitutionLogo.svg';
import notificationIcon from './NotificationIcon.svg';
import profileIcon from './ProfileIcon.svg';
import logoutIcon from './LogoutIcon.svg';
import { Link, useNavigate } from 'react-router-dom';

function NavBarNew() {
  /*
    User roles:  
      TechOfficer
      Student
      Staff
      Clerk
  */
  const userRole = 'TechOfficer';

 
  const  navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:8800/auth/logout");
      if(res.data.status === "ok"){
        navigate("/");}
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <nav className="custom-navbar">

        <div className="custom-logo-name custom-nav-left-group">
          <div className="custom-logo">
            <img src={institutionLogo} alt="Logo" />
          </div>
          <div className="custom-name" style={{ lineHeight: '0.8' }}>
            <span className="first-word">Wisdom</span>
            <br />
            <span className="second-word" style={{ fontSize: '0.7em'}}>Education</span>
          </div>
        </div>

        <button className="custom-dropdown-button">&#9776;</button>


        {/* when the nav bar is collapsed*/}
        <div className="custom-nav-links custom-nav-center-group custom-dropdown-container">
          <Link to='/dashboard' className="custom-dropdown-link">
            <div className="custom-link-box">Dashboard</div>
          </Link>
          <Link to='/resources' className="custom-dropdown-link">
            <div className="custom-link-box">Resources</div>
          </Link>
          <Link to='/reservations' className="custom-dropdown-link">
            <div className="custom-link-box">Reservations</div>
          </Link>
          {userRole === 'TechOfficer' && <Link to='/maintenance' className="custom-dropdown-link">
            <div className="custom-link-box">Maintenance</div>
          </Link>}

          {/*for TechOfficers to check-out an item. Inside, there will be a link leading to details of check-outs*/}
          {userRole === 'TechOfficer' && <Link to='/check-out' className="custom-dropdown-link">
            <div className="custom-link-box">Check-out</div>
          </Link>}
          {/*for Students and Staff to see their own check-outs*/}
          {(userRole === 'Student' || userRole === 'Staff') && <Link to='/check-outs' className="custom-dropdown-link">
            <div className="custom-link-box">Check-outs</div>
          </Link>}

          {userRole === 'TechOfficer' && <Link to='/check-in' className="custom-dropdown-link">
            <div className="custom-link-box">Check-in</div>
          </Link>}
          {(userRole === 'TechOfficer'|| userRole === 'Clerk') && <Link to='/analytics' className="custom-dropdown-link">
            <div className="custom-link-box">Analytics</div>
          </Link>}
          
          <div className="custom-nav-links custom-nav-right-group">
          <Link to='/notifications' className="custom-dropdown-link">
            <div className="custom-link-box">
              <img src={notificationIcon} alt='Notifications' />
            </div>
          </Link>
          <Link to='/account' className="custom-dropdown-link">
            <div className="custom-link-box">
              <img src={profileIcon} alt='Profile' />
            </div>
          </Link>
          <Link to='/' className="custom-dropdown-link" onClick={(e) => handleLogout(e)}>
            <div className="custom-link-box">
              <img src={logoutIcon} alt='Logout' />
            </div>
          </Link>
        </div>
        </div>


        {/* when the navbar is expanded */}
        <div className="custom-nav-links custom-nav-center-group">
          <Link to='/dashboard' className="custom-link">
            <div className="custom-link-box">Dashboard</div>
          </Link>
          <Link to='/resources' className="custom-link">
            <div className="custom-link-box">Resources</div>
          </Link>
          <Link to='/reservations' className="custom-link">
            <div className="custom-link-box">Reservations</div>
          </Link>
          {userRole === 'TechOfficer' && <Link to='/maintenance' className="custom-link">
            <div className="custom-link-box">Maintenance</div>
          </Link>}

          {/*for TechOfficers to check-out an item. Inside, there will be a link leading to details of check-outs*/}
          {userRole === 'TechOfficer' && <Link to='/check-out' className="custom-link">
            <div className="custom-link-box">Check-out</div>
          </Link>}
          {/*for Students and Staff to see their own check-outs*/}
          {(userRole === 'Student' || userRole === 'Staff') && <Link to='/check-outs' className="custom-link">
            <div className="custom-link-box">Check-outs</div>
          </Link>}

          {userRole === 'TechOfficer' && <Link to='/check-in' className="custom-link">
            <div className="custom-link-box">Check-in</div>
          </Link>}
          {(userRole === 'TechOfficer' || userRole === 'Clerk') && <Link to='/analytics' className="custom-link">
            <div className="custom-link-box">Analytics</div>
          </Link>}
        </div>

        <div className="custom-nav-links custom-nav-right-group">
          <Link to='/notifications' className="custom-link">
            <div className="custom-link-box">
              <img src={notificationIcon} alt='Notifications' />
            </div>
          </Link>
          <Link to='/account' className="custom-link">
            <div className="custom-link-box">
              <img src={profileIcon} alt='Profile' />
            </div>
          </Link>
          <Link to='/' className="custom-link" onClick={(e) => handleLogout(e)}>
            <div className="custom-link-box">
              <img src={logoutIcon} alt='Logout' />
            </div>
          </Link>
        </div>
    </nav>
  );
}

export default NavBarNew;