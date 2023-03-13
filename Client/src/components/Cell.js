import React from 'react';
import { StyledCell } from './styles/styledCell';
import Piece from './Piece';

class Cell extends React.Component {

    
    render() {
        var color = "";
        if (this.props.cellInfo.usedBy === "P1") {
            color = "white";
        } else if (this.props.cellInfo.usedBy === "P2") {
            color = "black";
        }

        var piece;
        
        if(color !== ""){
            piece = <Piece color={color} outline={this.props.cellInfo.canHit ? "Orange" : "grey"} king={this.props.cellInfo.king}/>
        }

        var cellColor = "";
        if(this.props.cellInfo.forced && this.props.cellInfo.highlighted){
            cellColor = "Red";
        } else if (this.props.cellInfo.forced) {
            cellColor = "LightCoral";
        } else if (this.props.cellInfo.highlighted) {
            cellColor = "Aqua";
        } else { 
            cellColor = this.props.cellInfo.color;
        }

        return (
            <StyledCell onClick={() => this.props.onCellClick(this.props.cellInfo)} color={cellColor}>
                {piece}
            </StyledCell>
        )
    }
};

export default Cell;