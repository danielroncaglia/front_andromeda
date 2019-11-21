import React, { Component } from 'react';
import './OKRs.css';
import Toolbars from '../../components/Toolbars/Toolbars';
import RegisterObjective from '../../components/RegisterObjective/RegisterObjective';
import RegisterKR from '../../components/RegisterKR/RegisterKR';
import ListOKR from '../../components/ListOKR/ListOKR'
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

export default class Menu extends Component {
    render() {
        return (
            <div>
                <header>
                    <div>
                        <Toolbars />
                    </div>
                </header>
                <div className="container">
                    <Accordion defaultActiveKey="1" >
                        <Card >
                            <div>
                                <Accordion.Toggle as={Card.Header}
                                    eventKey="0"
                                    variant="primary">
                                    <RegisterObjective />
                                </Accordion.Toggle>
                            </div>
                            <div>
                                <Accordion.Collapse eventKey="0" >
                                    <Card.Body>
                                        <RegisterKR />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </div>
                        </Card>
                    </Accordion>
                    <div>
                        <ListOKR />
                    </div>
                </div>
            </div>
        );
    }
}