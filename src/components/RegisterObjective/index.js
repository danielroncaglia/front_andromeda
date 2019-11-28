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

    // atualizaEstadoUpdateDate(event) {
    //     this.setState({ UpdateDate: event.target.value });
    // }


    RegisterObjective(event) {
        event.preventDefault();

        let objective = {
            title: this.state.Title,
            priority: parseInt(this.state.Priority),
            term: parseInt(this.state.Term),
            type: parseInt(this.state.Type),
            finalDate: this.state.FinalDate,
            // updateDate: this.state.UpdateDate,
        };

        axios.post("http://192.168.4.35:63600/objectives", objective)
            .then(data => {
                this.props.listFnc();
                
                localStorage.setItem("idObjectiveAndromeda", data.data.id);
            })
            .catch(erro => console.log("Erro: ", erro))

    }

    render() {

        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Objetivo cadastrado</Popover.Title>
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
                                placeholder="Objetivo"
                            />
                        </Form.Group >
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="auto">
                            <Form.Control as="select"
                                value={this.state.Priority || ''}
                                onChange={this.atualizaEstadoPriority.bind(this)}>
                                <option defaultValue>Peso</option>
                                <option value="0">1/5</option>
                                <option value="1">1/4</option>
                                <option value="2">1/3</option>
                                <option value="3">1/2</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="auto">
                            <Form.Control as="select"
                                value={this.state.Type || ''}
                                onChange={this.atualizaEstadoType.bind(this)}>
                                <option defaultValue>Tipo</option>
                                <option value="0">Empresa</option>
                                <option value="1">Equipe</option>
                                <option value="2">Indivíduo</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="auto">
                            <Form.Control as="select"
                                value={this.state.Term || ''}
                                onChange={this.atualizaEstadoTerm.bind(this)}>
                                <option defaultValue>Período</option>
                                <option value="1">Trimestral</option>
                                <option value="2">Anual</option>
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
                            } >Cadastrar
                    </Button>
                        </OverlayTrigger>
                    </Form.Group>

                </Form>
            </div>
        );
    }
}