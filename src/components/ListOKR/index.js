import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import moment from 'moment';
import api from '../../services/api';
import UpdateIcon from 'react-ionicons/lib/MdCreate';
import { Link } from 'react-router-dom';
import DeleteIcon from 'react-ionicons/lib/MdTrash';
import quarter from '../../assets/images/quarter.png';
import third from '../../assets/images/third.png';
import half from '../../assets/images/half.png';
import Avatar from 'react-ionicons/lib/IosPerson';
import InputKR from '../InputKR';
import company from '../../assets/images/company.png';
import team from '../../assets/images/team.png';
import person from '../../assets/images/person.png';
import AppContar from '../../components/AppContar/index';

export default class ListOKR extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listObjs: [
                // ...this.props.listObjs
            ],
            clicks: 0
        }
    }

    componentDidMount() {
        this.listObjs();
    }

    listObjs = () => {
        api.get("/objectives")
            .then(response => this.setState({ listObjs: response.data }))
            .catch(erro => console.log(erro))
    }

    excluirKr = (idObj, idKr) => {
        api.delete(`/keyresults/${idObj}/${idKr}`)
            .then(response => this.props.listFnc())
            .catch(error => console.log('Erro: ', error))
    }

    excluirObj = (idObj, idKr) => {
        api.delete(`/objectives/${idObj}`)
            .then(response => this.props.listFnc())
            .catch(error => console.log('Erro: ', error))
    }

    atualizarKr = (idObj, idKr, obj) => {
        api.put(`/keyresults/${idObj}/${idKr}`, {
            obj
        })
            .then(response => console.log(response))
            .catch(error => console.log('Error: ', error))
    }

    tradutionEnumPriority = (type) => {
        if (type === 1) {
            return <div className="option2" ><img src={quarter} className="fractions" /><span className="tooltip2">1/4</span></div>
        } else if (type === 2) {
            return <div className="option2" ><img src={quarter} className="fractions" /><span className="tooltip2">1/4</span></div>
        } else if (type === 3) {
            return <div className="option2" ><img src={third} className="fractions" /><span className="tooltip2">1/3</span></div>
        } else if (type === 4) {
            return <div className="option2" ><img src={half} className="fractions" /><span className="tooltip2">1/2</span></div>
        }
    }

    tradutionEnumType = (type) => {
        if (type === 1) {
            return <div className="option2" ><img src={company} className="fractions" /><span className="tooltip2">Company</span></div>
        } else if (type === 2) {
            return <div className="option2" ><img src={team} className="fractions" /><span className="tooltip2">Team</span></div>
        } else if (type === 3) {
            return <div className="option2" ><img src={person} className="fractions" /><span className="tooltip2">Person</span></div>
        }
    }

    tradutionEnumTypeValue = (type) => {
        if (type === 1) {
            return "%"
        } else if (type === 2) {
            return " unidades"
        } else if (type === 3) {
            return " $"
        } else if (type === 4) {
            return " outros"
        }
    }

    tradutionEnumWeight = (type) => {
        if (type === 0) {
            return <div className="option2" ><img src={quarter} className="fractions" /><span className="tooltip2">1/4</span></div>
        } else if (type === 1) {
            return <div className="option2" ><img src={quarter} className="fractions" /><span className="tooltip2">1/4</span></div>
        } else if (type === 2) {
            return <div className="option2" ><img src={third} className="fractions" /><span className="tooltip2">1/3</span></div>
        } else if (type === 3) {
            return <div className="option2" ><img src={half} className="fractions" /><span className="tooltip2">1/2</span></div>
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

    handleChange = (event, idKr, idObjective) => {
        event.preventDefault();
        let lista = this.state.listObjs;
        lista.map((item) => {
            if (item.id === idObjective) {
                item.kRs.map((kr) => {
                    if (kr.id === idKr) {
                        if (event.target.value >= 0 && event.target.value <= kr.finalValue) {
                            kr.initialValue = event.target.value;
                            this.setState({ listObjs: lista })
                            document.getElementById('objective-' + idObjective).classList.add('show')
                        }
                    }
                })
            }
        })
    };

    colorProgressBar = (value) => {
        let color = "";
        if (value <= 0.3)
            return color = "danger";
        else if (value > 0.3 && value < 0.7)
            return color = "warning";
        else if (value >= 0.7)
            return color = "success";
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.listObjs.map((item, index) => {
                        return (
                            <Accordion key={index} >
                                <Card className="justify-content-md-center padding"
                                    style={{ margin: '20px 20px 20px 20px' }}>

                                    <div >
                                        <Accordion.Toggle as={Card.Header} eventKey={index} key={item.id}>
                                            <Row   >
                                                <Col md="12">
                                                    <h5>{item.title}</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="4">
                                                    <ProgressBar variant={this.colorProgressBar(this.calculaValorOkrs(item.kRs) / 100)}
                                                        now={this.calculaValorOkrs(item.kRs)}
                                                        label={this.calculaValorOkrs(item.kRs).toFixed(0) + `%`} />
                                                </Col>
                                                <Col md="auto">
                                                    <h6>Tipo</h6>
                                                    <h6>{this.tradutionEnumType(item.type)}</h6>
                                                </Col>
                                                <Col md="auto">
                                                    <Avatar />
                                                    <h6>{item.owner.name}</h6>
                                                </Col>
                                                <Col md="auto">
                                                    <h6>Peso</h6>
                                                    <h6>{this.tradutionEnumPriority(item.priority)}</h6>
                                                </Col>
                                                <Col md="auto" >
                                                    <h6>Prazo</h6>
                                                    <h6 >{moment(item.finalDate).format("DD/MM/YYYY").split('T00:00:00')}</h6>
                                                    <AppContar/>
                                                </Col>
                                                <Col md="1">
                                                    <Link className="option" to="/">
                                                        <UpdateIcon className="icon"
                                                            fontSize="26px" /></Link>
                                                </Col>
                                                <Col md="1">
                                                    <Link className="option" to="/">
                                                        <DeleteIcon
                                                            className="icon"
                                                            fontSize="26px"
                                                            onClick={() => this.excluirObj(item.id)}
                                                        />
                                                      
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Accordion.Toggle>
                                    </div>
                                    <div>
                                        <Accordion.Collapse id={'objective-' + item.id} eventKey={index}>
                                            <Card.Body>
                                                <div className="justify-content-md-center"
                                                style={{ margin: '20px 20px 20px 20px' }}>

                                                    {
                                                        item.kRs === null ? '' : item.kRs.map((kr) => {
                                                            return (
                                                                <Row key={kr.id}>
                                                                    <Col md="12"
                                                                    style={{margin:"20x 20x 20x 20x"}}>
                                                                        <h5>{kr.title}</h5>
                                                                    </Col>
                                                                    <Col md="4">
                                                                        <ProgressBar variant={this.colorProgressBar(kr.initialValue / kr.finalValue)}
                                                                            now={(kr.initialValue / kr.finalValue) * 100}
                                                                            label={`${kr.initialValue}${this.tradutionEnumTypeValue(kr.typeValue)}`

                                                                            }
                                                                        />
                                                                    </Col>
                                                                    <Col md="2">
                                                                        <h6>Atual</h6>
                                                                        <input
                                                                            className="input-date"
                                                                            type="number"
                                                                            value={kr.initialValue || ''}
                                                                            onChange={(event) => {
                                                                                this.handleChange(event, kr.id, item.id)
                                                                            }} />
                                                                    </Col>
                                                                    <Col md="1">
                                                                        <h6>KR</h6>
                                                                        <h6>{kr.finalValue}</h6>
                                                                    </Col>
                                                                    <Col md="2">
                                                                        <Avatar />
                                                                        <h6>{kr.owner.name}</h6>
                                                                    </Col>
                                                                    <Col md="1">
                                                                        <h6>Peso</h6>
                                                                        <h6>{this.tradutionEnumWeight(kr.weight)}</h6>
                                                                    </Col>
                                                                    <Col md="1">
                                                                        <Link className="option" to="/">
                                                                            <UpdateIcon className="icon"
                                                                                fontSize="26px" /></Link>
                                                                    </Col>
                                                                    <Col md="1">
                                                                        <Link className="option" to="/">
                                                                            <DeleteIcon
                                                                                className="icon"
                                                                                fontSize="26px"
                                                                                onClick={() => this.excluirKr(item.id, kr.id)}
                                                                            />
                                                                        </Link>
                                                                    </Col>
                                                                </Row>
                                                            );
                                                        })
                                                    }
                                                </div>
                                                <div className="justify-content-md-center padding"
                                                style={{padding:"20px 20px 20px 20px"}} >
                                                    <InputKR />
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