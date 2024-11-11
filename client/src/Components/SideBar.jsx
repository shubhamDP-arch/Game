import { useAuth } from "../../store/auth";
import {NavLink} from "react-router-dom"
const SideBar = ({ isOpen, toggleSidebar }) => {
    const { LogoutUser } = useAuth();

    const handleLogout = () => {
        console.log("Logged out");
        LogoutUser();
    };
    
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleSidebar}>
                &times;
            </button>
            <ul className="sidebar-links">
                <li><NavLink to="#">Shop</NavLink></li>
                <li><NavLink to="#">Items</NavLink></li>
                <li><NavLink to="#">Contacts</NavLink></li>
                <li> <NavLink to="/logout">Logout</NavLink></li>
            </ul>
        </div>
    );
};

export default SideBar;
