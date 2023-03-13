import styled from 'styled-components'

export const StyledDisplay = styled.div`
float: ${props => props.dir};
margin-top: 120px;
display: inline-block;
left: 50px;
box-sizing: border-box;
padding: 18px;
border: 4px solid #333;
height: 75px;
width: 250px;
border-radius: 20px;
color: #999;
background: #000;
font-size: 28px;
`;