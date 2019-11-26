import React from 'react';
import CustomToggle from '../CustomToogle/index';
import Accordion from 'react-bootstrap/Accordion';
import Card, { CardBody } from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RegisterKR from '../RegisterKR/RegisterKR';

export default function InputKR() {
    return (
        <Accordion defaultActiveKey="0">
            <Card >
                  as={Card.Header}>
                    <CustomToggle eventKey="1"
                        
                    >New KR</CustomToggle>
            
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <RegisterKR />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
