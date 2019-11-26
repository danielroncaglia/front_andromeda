import React from 'react';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

export default function CustomToggle({ children, eventKey }) {

    const decoratedOnClick = useAccordionToggle(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <button
            type="button"
            style={{ color: '#fff',
                backgroundColor: '#17a2b8',
                borderColor: '#17a2b8',
                border: '1px solid transparent',
                lineHeight: '1.5',
                borderRadius: '.25rem',
                display: 'inline-block' }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}