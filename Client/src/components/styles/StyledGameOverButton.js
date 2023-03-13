import styled from 'styled-components'

export const StyledGameOverButton = styled.div`
box-sizing: border-box;
padding-top 2%;
margin: auto;
top: 50%;
left: ${props => props.left}%;
border: 4px solid #333;
height: 10%;
width: 30%;
border-radius: 20px;
color: #999;
background: #000;
font-size: 24px;
position: absolute;
cursor: pointer;
`;