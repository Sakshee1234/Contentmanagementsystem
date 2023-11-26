import { useContext } from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { Link, useNavigate, useParams,useLocation } from 'react-router-dom';
import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {

    const { account } = useContext(DataContext)
    const navigate=useNavigate();
    const location=useLocation();
    const removeComment = async (id) => {
        fetch(`http://localhost:8000/deleteComment?id=${id}`,{
            method:"DELETE",
            credentials:'include',
        }).then(res=>res.json()).then(data=>{
            navigate(location.pathname);
        })
        
    }

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                { comment.name === account.username && <DeleteIcon onClick={() => removeComment(comment._id)} color="error"/> }
            </Container>
            <Typography>{comment.comments}</Typography>
        </Component>
    )
}

export default Comment;