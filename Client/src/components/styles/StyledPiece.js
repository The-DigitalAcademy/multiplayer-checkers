import styled from 'styled-components'

export const StyledPiece = styled.div`
    height: 75%;
    width: 75%;

    background-color: ${props => props.color};
    
    margin: auto;
    margin-top: 7.500px;

    border-radius: 50%;

    box-shadow: 0 0 0 3px ${props => props.outline};
`