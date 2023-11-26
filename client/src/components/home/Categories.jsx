
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
const StyledLinko = styled(Table)`
    background: #fff;
    text-decoration: none;
    &: hover{
        background: #999999;
    }
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #1d1d1d;
    color: #fff;
    text-decoration: none;
    &: hover{
        background: #333333;
    }
`;
    
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #1d1d1d
    
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Article</StyledButton>
            </Link>
            
            <StyledTable>        
                <TableHead>
                    <TableRow>
                        <StyledLinko>
                            <TableCell>
                                    <StyledLink to={"/"}>
                                        All Categories
                                    </StyledLink>
                            </TableCell>
                        </StyledLinko>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <StyledLinko>
                                    <TableCell>
                                        <StyledLink to={`/?category=${category.type}`}>
                                            {category.type}
                                        </StyledLink>
                                    </TableCell>
                                </StyledLinko>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;