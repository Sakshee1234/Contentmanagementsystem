
import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import logo from '../../images/contentcraft.jpeg'
// /contentmangementsystem/client/src/images
const Component = styled(AppBar)`
    background: #1d1d1d;
    color: #fff;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #fff;
        text-decoration: none;
    }
`
const Image = styled('img')({
    width: '100px', // Set your desired width
    height: 'auto', // Maintain aspect ratio
  });

const Header = () => {

    const navigate = useNavigate();

    const logout = async () => navigate('/account');
        
    return (
        <Component>
            <Container>
                {/* <Image src={logo} alt="/" className="navbar--logo" /> */}
                <Link to='/'>HOME</Link>
                {/* <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link> */}
                <Link to='/account'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;