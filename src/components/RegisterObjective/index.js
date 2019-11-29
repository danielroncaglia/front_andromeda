import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


export default class RegisterObjective extends Component {

    constructor() {
        super();
        this.state = {
            Title: "",
            Priority: null,
            Term: null,
            Type: null,
            FinalDate: ""
        };
    }

    componentDidMount() {

    }

    atualizaEstadoTitle(event) {
        this.setState({ Title: event.target.value });
    }

    atualizaEstadoPriority(event) {
        this.setState({ Priority: event.target.value });
    }

    atualizaEstadoTerm(event) {
        this.setState({ Term: event.target.value });
    }

    atualizaEstadoType(event) {
        this.setState({ Type: event.target.value });
    }

    atualizaEstadoFinalDate(event) {
        this.setState({ FinalDate: event.target.value });
    }


    RegisterObjective(event) {
        event.preventDefault();

        let objective = {
            title: this.state.Title,
            priority: parseInt(this.state.Priority),
            term: parseInt(this.state.Term),
            type: parseInt(this.state.Type),
            finalDate: this.state.FinalDate
        };

        axios.post("http://192.168.4.35:63600/objectives", objective)
            .then(data => {
                this.props.listFnc();
                localStorage.setItem("idObjectiveAndromeda", data.data.id);
                window.location.reload();
            })
            .catch(erro => console.log("Erro: ", erro))

    }

    render() {

        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3" >Objective register</Popover.Title>
            </Popover>
        );

        return (

            <div className="register_objective">

                <Form>

                    <Form.Row  >
                        <Form.Group as={Col} sm={12}>

                            <Form.Control
                                value={this.state.Title}
                                onChange={this.atualizaEstadoTitle.bind(this)}
                                placeholder="Objective"
                            />
                        </Form.Group >
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="auto">
                            <Form.Control as="select"
                                value={this.state.Type || ''}
                                onChange={this.atualizaEstadoType.bind(this)}>
                                <option defaultValue>Alignment</option>
                                <option value="1">Company</option>
                                <option value="2">Team</option>
                                <option value="3">Person</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="auto">
                            <Form.Control as="select"
                                value={this.state.Priority || ''}
                                onChange={this.atualizaEstadoPriority.bind(this)}>
                                <option defaultValue>Weight</option>
                                <option value="1">1/5</option>
                                <option value="2">1/4</option>
                                <option value="3">1/3</option>
                                <option value="5">1/2</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="auto">
                            <Form.Control as="select"
                                value={this.state.Term || ''}
                                onChange={this.atualizaEstadoTerm.bind(this)}>
                                <option defaultValue>Period</option>
                                <option value="1">Quarterly</option>
                                <option value="2">Annual</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="auto">
                            <input
                                className="input-date"
                                type="date"
                                value={this.state.FinalDate}
                                onChange={this.atualizaEstadoFinalDate.bind(this)}
                                id="Data Final"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                            <Button variant="info" type="submit" onClick={
                                this.RegisterObjective.bind(this)
                                
                            } >Register
                    </Button>
                        </OverlayTrigger>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}