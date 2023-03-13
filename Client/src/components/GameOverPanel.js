import React from 'react';

import { StyledGameOver } from './styles/StyledGameOver';

const Display = ({winner}) => {
        return (
            <StyledGameOver >
                {winner} Wins!
            </StyledGameOver>
        )
}

export default Display;