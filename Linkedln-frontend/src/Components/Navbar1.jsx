
import linkedlnLogo from './../assets/Linkedln_icon.png';
import { Link } from "react-router-dom";

function Navbar1() {

    return (
        <nav className="navbar1">
            <div className="navbar_container">
                <Link to={'/'}className="navbar1_contents">
                    <h3 className="navbar1_logo">Linked</h3>
                    <img src={linkedlnLogo} alt="logo" className="linkedln_logo" />
                </Link>
                <div className='navbarRow'>
                    <Link to="/signUp" className="joinButton">Join Now</Link>
                    <Link to="/signIn" className='signButton'>Sign in</Link>
                </div>

            </div>
        </nav>
    )
}

export default Navbar1