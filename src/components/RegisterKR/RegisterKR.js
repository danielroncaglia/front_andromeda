import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default class RegisterKR extends Component {

    constructor() {
        super();
        this.state = {
            // Title: "",
            TypeValue: null,
            InitialValue: null,
            FinalValue: null,
            Weight: null,
            Result: null,
            FinalDate: "",
            UpdateDate: ""
        };
    }

    componentDidMount() {

    }

    atualizaEstadoTitle(event) {
        this.setState({ Title: event.target.value });
    }

    atualizaEstadoTypeValue(event) {
        this.setState({ TypeValue: event.target.value });
    }

    atualizaEstadoInitialValue(event) {
        this.setState({ InitialValue: event.target.value });
    }

    atualizaEstadoFinalValue(event) {
        this.setState({ FinalValue: event.target.value });
    }

    atualizaEstadoWeight(event) {
        this.setState({ Weight: event.target.value });
    }

    atualizaEstadoResult(event) {
        this.setState({ Result: event.target.value });
    }

    atualizaEstadoUpdateDate(event) {
        this.setState({ UpdateDate: event.target.value });
    }

    atualizaEstadoFinalDate(event) {
        this.setState({ FinalDate: event.target.value });
    }

    RegisterKR(event) {
        event.preventDefault();

        let keyresults = {
            title: this.state.Title,
            typeValue: parseInt(this.state.TypeValue),
            initialValue: parseInt(this.state.InitialValue),
            finalValue: parseInt(this.state.FinalValue),
            weight: parseInt(this.state.Weight),
            result: parseInt(this.state.Result),
            finalDate: this.state.FinalDate,
            updateDate: "10/20/2019",
        };

        const id = localStorage.getItem("idObjectiveAndromeda");

        fetch(`http://192.168.4.35:63600/keyresults/${id}`, {
            body: JSON.stringify(keyresults),
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(resposta => console.log(resposta))
            .catch(erro => console.log("Erro: ", erro))
    }


    render() {

        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">KR cadastrado</Popover.Title>
            </Popover>
        );

        return (
            <div className="register_kr">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} sm={12}>
                            <Form.Control 
                                value={this.state.Title}
                                onChange={this.atualizaEstadoTitle.bind(this)}
                                placeholder="Resultados chave"
                            />
                        </Form.Group >
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="auto">
                            <Form.Control as="select"
                                value={this.state.TypeValue}
                                onChange={this.atualizaEstadoTypeValue.bind(this)}>
                                <option defaultValue="0">Tipo</option>
                                <option value="2">Porcentagem (%)</option>
                                <option value="3">Unidade (N)</option>
                                <option value="4">Moeda ($)</option>
                                <option value="5">Outros</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <input type="number"
                                className="numero"
                                placeholder="Início"
                                value={this.state.InitialValue}
                                onChange={this.atualizaEstadoInitialValue.bind(this)} />
                        </Form.Group>

                        <Form.Group as={Col} md="3">
                            <input type="number"
                                className="numero"
                                placeholder="Final"
                                value={this.state.FinalValue}
                                onChange={this.atualizaEstadoFinalValue.bind(this)} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="auto">
                        <Form.Control
                            // value={this.state.Owner}
                            // onChange={this.atualizaEstadoOwner.bind(this)}
                            placeholder="Dono"
                        />
                    </Form.Group >
                    {/* <Form.Group as={Col} md="auto">
                        <Form.Control as="select"
                            value={this.state.Result}
                            onChange={this.atualizaEstadoResult.bind(this)}>
                            <option defaultValue="0">Resultado</option>
                            <option value="2">Vermelho</option>
                            <option value="3">Amarelo</option>
                            <option value="4">Verde</option>
                        </Form.Control>
                    </Form.Group> */}

                    <Form.Group as={Col} md="auto">
                        <Form.Control as="select"
                            value={this.state.Weight}
                            onChange={this.atualizaEstadoWeight.bind(this)}>
                            <option defaultValue="0">Peso</option>
                            <option value="2">25%</option>
                            <option value="3">33%</option>
                            <option value="4">50%</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="auto">
                        <input
                            className="register_kr-date"
                            type="date"
                            value={this.state.FinalDate}
                            onChange={this.atualizaEstadoFinalDate.bind(this)}
                            id="Data Final"
                        />
                    </Form.Group>
                    </Form.Row>

                <Form.Group>
                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                        <Button variant="info" type="submit" onClick={this.RegisterKR.bind(this)} >Cadastrar
                    </Button>
                    </OverlayTrigger>
                </Form.Group>

                </Form>
            </div >
        );
    }
}