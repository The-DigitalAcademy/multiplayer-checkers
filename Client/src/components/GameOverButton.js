import React from 'react';

import { StyledGameOverButton } from './styles/StyledGameOverButton';

const Display = ({callback, text, left}) => {
        return (
            <StyledGameOverButton onClick={callback}  left={left}>
                {text}
            </StyledGameOverButton>
        )
}

export default Display;