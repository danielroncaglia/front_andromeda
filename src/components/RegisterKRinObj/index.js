import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import api from '../../services/api';

export default class RegisterKRinObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // listOwner: [],
            Title: "",
            TypeValue: null,
            InitialValue: null,
            FinalValue: null,
            Weight: null,
            Owner: ""
        };
    }

    componentDidMount() {
        this.listOwner();
    }

    listOwner = () => {
        api.get("/objectives")
            .then(response => this.setState({ listOwner: response.data }))
            .catch(erro => console.log(erro))
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

    atualizarEstadoFinalOwner(event) {
        this.setState({ Owner: event.target.value })
    }

    atualizaEstadoUpdateDate(event) {
        this.setState({ UpdateDate: event.target.value });
    }

    RegisterKR(event) {
        event.preventDefault();

        let keyresults = {
            title: this.state.Title,
            typeValue: parseInt(this.state.TypeValue),
            initialValue: parseInt(this.state.InitialValue),
            finalValue: parseInt(this.state.FinalValue),
            weight: parseInt(this.state.Weight),
            owner: this.state.Owner.name
        };

        // const id = localStorage.getItem("idObjectiveAndromeda");
        const id = this.props.idobj
        console.log("Id dessa porra: ", id)

        fetch(`http://192.168.4.35:63600/keyresults/${id}`, {
            body: JSON.stringify(keyresults),
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(resposta => resposta)
            .catch(erro => console.log("Erro: ", erro))
    }


    render() {

        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">KR cadastrado</Popover.Title>
            </Popover>
        );

        return (
            <div className="register_kr"
                style={{ padding: "20px 20px 20px 20px" }}>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} sm={12}>
                            <Form.Control
                                value={this.state.Title}
                                onChange={this.atualizaEstadoTitle.bind(this)}
                                placeholder="Key results"
                            />
                        </Form.Group >
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="3">
                            <Form.Control as="select"
                                value={this.state.TypeValue || ""}
                                onChange={this.atualizaEstadoTypeValue.bind(this)}>
                                <option defaultValue="0">Type of number</option>
                                <option value="1">Percentage (%)</option>
                                <option value="2">Unit (N)</option>
                                <option value="3">Money ($)</option>
                                <option value="4">Others</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <input type="number"
                                min="0"
                                className="input-date"
                                placeholder="Initial number"
                                value={this.state.InitialValue || ''}
                                onChange={this.atualizaEstadoInitialValue.bind(this)} />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <input type="number"
                                min="0"
                                className="input-date"
                                placeholder="Goal number"
                                value={this.state.FinalValue || ''}
                                onChange={this.atualizaEstadoFinalValue.bind(this)} />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Control as="select"
                                value={this.state.Weight || ""}
                                onChange={this.atualizaEstadoWeight.bind(this)}>
                                <option defaultValue="0">Weight</option>
                                <option value="1">1/5</option>
                                <option value="2">1/4</option>
                                <option value="3">1/3</option>
                                <option value="4">1/2</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                  <Form.Group>
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                            <Button variant="info" type="submit" onClick={this.RegisterKR.bind(this)} >Register
                    </Button>
                        </OverlayTrigger>
                    </Form.Group>

                </Form>
            </div >
        );
    }
}