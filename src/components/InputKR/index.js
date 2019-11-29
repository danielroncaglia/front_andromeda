import React from 'react';
import CustomToggle from '../CustomToogle';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import RegisterKRinObj from '../RegisterKRinObj';

export default function InputKR(props) {
    return (
        <Accordion defaultActiveKey="0">
            <Card >
                <CustomToggle eventKey="1">New KR</CustomToggle>
                <Accordion.Collapse eventKey="1" >
                        <RegisterKRinObj idobj={props.id} />
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
