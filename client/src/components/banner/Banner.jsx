import { styled, Box, Typography } from '@mui/material';
import logo from '../../images/contentcraft.jpeg';

const Image = styled(Box)`
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 7%; 
    margin-bottom: 3%;
`;

const Logo = styled('img')`
    width: 100%; /* Adjust the width as needed */
    height: auto;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #fff;
    line-height: 1;
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
`;

const Banner = () => {
    return (
        <Image>
            <Logo src={logo} alt="Content Craft Logo" />
            {/* <Heading>Content Craft</Heading>
            <SubHeading>Your Subheading Here</SubHeading> */}
        </Image>
    );
};

export default Banner;
