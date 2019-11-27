import React from 'react';
import CustomToggle from '../CustomToogle';
import Accordion from 'react-bootstrap/Accordion';
import Card, { CardBody } from 'react-bootstrap/Card';
import RegisterKR from '../RegisterKR/index';

export default function InputKR() {
    return (
        <Accordion defaultActiveKey="0">
            <Card >
                <CustomToggle eventKey="1">New KR</CustomToggle>
                <Accordion.Collapse eventKey="1">
                        <RegisterKR />
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
