import React from 'react';

import { StyledCenteredButton } from './styles/StyledCenteredButton';

const CenteredButton = ({callback, text}) => {
        return (
            <StyledCenteredButton onClick={callback}>
                {text}
            </StyledCenteredButton>
        )
}

export default CenteredButton;