import React from 'react';
import { StyledPiece } from './styles/StyledPiece';

import king from '../Imges/kingIcon.png';

class Piece extends React.Component {
    
    render() {

        return (
            <StyledPiece color={this.props.color} outline={this.props.outline}>
                {this.props.king ? <img src={king} alt="king" className="center"></img> : ""}
            </StyledPiece>
        )
    }
}

export default Piece;