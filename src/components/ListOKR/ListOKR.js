import React, { Component } from 'react';
import axios from 'axios';
import EditableCell from '../EditableCell/EditableCell';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import moment from 'moment';

export default class ListOKR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listObjs: [],
            clicks: 0
        }
    }
    componentDidMount() {
        this.listObjs();
    }
    listObjs = () => {
        fetch('http://192.168.4.35:63600/objectives')
            .then(response => response.json())
            .then(data => {
                this.setState({ listObjs: data })
            })
            .catch(erro => console.log(erro))
    }

    tradutionEnumPriority = (priority) => {
        if (priority === 1) {
            return "Alta"
        } else if (priority === 2) {
            return "Urgente"
        } else if (priority === 3) {
            return "Baixa"
        }
    }
    tradutionEnumType = (type) => {
        if (type === 0) {
            return "Empresa"
        } else if (type === 1) {
            return "Equipe"
        } else if (type === 2) {
            return "Individual"
        }
    }

    tradutionEnumTypeValue = (type) => {
        if (type === 2) {
            return "%"
        } else if (type === 3) {
            return " unidades"
        } else if (type === 4) {
            return " $"
        } else if (type === 5) {
            return " outros"
        }
    }
    tradutionEnumResult = (type) => {
        if (type === 2) {
            return "danger"
        } else if (type === 3) {
            return "warning"
        } else if (type === 4) {
            return "success"
        }
    }
    tradutionEnumWeight = (type) => {
        if (type === 2) {
            return "25%"
        } else if (type === 3) {
            return "33,3%"
        } else if (type === 4) {
            return "50%"
        }
    }
    tradutionEnumWeightPorcentagem = (type) => {
        if (type === 2) {
            return 0.25;
        } else if (type === 3) {
            return 0.33;
        } else if (type === 4) {
            return 0.5;
        }
    }
    listKRs = (idObj) => {
        axios.get(`http://192.168.4.35:63600/keyresults/${idObj}`)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }
    calculaValorOkrs = (krs) => {
        let actualKR = 0;
        let partKR = 0;
        let objectivepercentage = 0;
        if (krs != null) {
            krs.map((kr) => {
                actualKR = kr.initialValue / kr.finalValue;
                if (actualKR > 1)
                    actualKR = 1;
                partKR = actualKR * this.tradutionEnumWeightPorcentagem(kr.weight);
                objectivepercentage += partKR;
            })
            return objectivepercentage * 100;
        }
        return 0;
    }
    editTitle(event) {
        const input = event.target.parentNode.children[1];
        const span = event.target.parentNode.children[0];
        input.style.display = 'block';
        span.style.display = 'none';
    }
    handleChange = (event, idKr, idObjective) => {
        event.preventDefault();
        console.log(idKr + " - " + idObjective)
        let lista = this.state.listObjs;
        lista.map((item) => {
            if (item.id === idObjective) {
                console.log(item);
                item.kRs.map((kr) => {
                    if (kr.id === idKr) {
                        console.log(kr.title);
                        kr.initialValue = event.target.value;
                        this.setState({ listObjs: lista })
                        document.getElementById('objective-' + idObjective).classList.add('show')
                    }
                })
            }
        })
    };
    render() {
        return (
            <div className="container">
                {
                    this.state.listObjs.map((item, index) => {
                        return (
                            <Accordion key={index} >
                                <Card className="justify-content-md-center padding">
                                    <div >
                                        <Accordion.Toggle
                                            as={Card.Header} eventKey={index} key={item.id}>
                                            <Row>
                                                <Col md="12">
                                                    <EditableCell
                                                        edit={this.editTitle.bind(this)}
                                                        info={item.title} />
                                                </Col>
                                                <Col md="6">
                                                    <ProgressBar variant={'info'}
                                                        now={this.calculaValorOkrs(item.kRs)}
                                                        label={this.calculaValorOkrs(item.kRs) + `%`} />
                                                </Col>
                                                {/* <Col md="auto">
                                                    <h6>Prioridade</h6>
                                                    <EditableCell
                                                        edit={this.editTitle.bind(this)}
                                                        info={this.tradutionEnumPriority(item.priority)} />
                                                </Col> */}
                                                <Col md="auto">
                                                    <h6>Dono</h6>
                                                    <EditableCell
                                                        edit={this.editTitle.bind(this)}
                                                        info={item.owner.name} />
                                                </Col>
                                                <Col md="auto">
                                                    <h6>Tipo</h6>
                                                    <EditableCell
                                                        edit={this.editTitle.bind(this)}
                                                        info={this.tradutionEnumType(item.type)} />
                                                </Col>
                                                <Col md="auto" >
                                                    <h6>Prazo final</h6>
                                                    <span >{moment(item.finalDate).format("DD/MM/YYYY").split('T00:00:00')}</span>
                                                </Col>

                                            </Row>
                                        </Accordion.Toggle>
                                    </div>
                                    <div>
                                        <Accordion.Collapse id={'objective-' + item.id} eventKey={index}>
                                            <Card.Body>
                                                <div className="justify-content-md-center">
                                                    {
                                                        item.kRs === null ? '' : item.kRs.map((kr) => {
                                                            return (
                                                                <Row key={kr.id} >
                                                                    <Col md="12">
                                                                        <EditableCell
                                                                            edit={this.editTitle.bind(this)}
                                                                            info={kr.title} />
                                                                    </Col>
                                                                    <Col md="6">
                                                                        <ProgressBar variant={this.tradutionEnumResult(kr.result)}
                                                                            now={(kr.initialValue / kr.finalValue) * 100}
                                                                            label={`${kr.initialValue}${this.tradutionEnumTypeValue(kr.typeValue)}`

                                                                            }
                                                                        />
                                                                    </Col>
                                                                    <Col md="1">
                                                                        <h6>Atual</h6>
                                                                        <p>
                                                                            <input type="number" value={kr.initialValue} onInput={(event) => {
                                                                                this.handleChange(event, kr.id, item.id)
                                                                            }} />

                                                                        </p>
                                                                    </Col>

                                                                    <Col md="1">
                                                                        <h6>KR</h6>
                                                                        <EditableCell
                                                                            edit={this.editTitle.bind(this)}
                                                                            info={kr.finalValue}>Resultado esperado:</EditableCell >
                                                                    </Col>
                                                                    <Col md="1">
                                                                        <h6>Peso</h6>
                                                                        <EditableCell
                                                                            edit={this.editTitle.bind(this)}
                                                                            info={this.tradutionEnumWeight(kr.weight)} />
                                                                    </Col>
                                                                    <Col md="2">
                                                                        <h6>Dono</h6>
                                                                        <EditableCell
                                                                            edit={this.editTitle.bind(this)}
                                                                            info={kr.owner.name} />
                                                                    </Col>
                                                                    <hr />
                                                                </Row>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </div>
                                </Card>
                            </Accordion>
                        );
                    })
                }
            </div>
        );
    }
}