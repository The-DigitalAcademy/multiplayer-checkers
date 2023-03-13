import React from 'react';

import { StyledDisplay } from './styles/StyledDisplay';

const Display = ({dir, text}) => {
        return (
            <StyledDisplay dir={dir}>{text}</StyledDisplay>
        )
}

export default Display;