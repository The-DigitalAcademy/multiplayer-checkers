import styled from 'styled-components';

export const StyledBoard = styled.div`
align-items: flex-start;
margin: 10px auto 0 auto;
width: 600px;
height: 600px;

background-color: white;

border: 20px;
border-color: black;
border-style: solid;

display: grid;
grid-template-columns: repeat(10, 10%);
grid-template-rows: repeat(10, 10%);
grid-gap: 0px;
`;