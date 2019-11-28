import React, { Component } from 'react';
import axios from 'axios';
import { Card, ListGroup } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import Toolbars from '../../components/Toolbars/index'
import './Dashboard.css';

export default class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [],
                datasets: []
            },
            obj: []
        }
    }

    listObjs = () => {
        axios.get("http://localhost:3001/obj")
            .then(response => {
                this.setState({ obj: response.data })
            })
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        let dados = {
            labels: ['26/11/2019', '27/11/2019', '28/11/2019', '29/11/2019', '30/11/2019'],
            datasets: [
                {
                    label: 'Quantidade Alertas por Data',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [5, 10, 12, 20, 30],
                },
            ]
        }

        this.setState({
            data: dados
        })

        this.listObjs();
    }

    render() {
        return (
            <div>
                <div>
                    <Toolbars />
                </div>
                <div className="main__cards__contain">
                    <Card className="main__cards__data" bg="danger" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title className="txtW">Objectives</Card.Title>
                            <Card.Text className="txtW text-right">
                                {this.state.obj.map((item) => item.number)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="main__cards__data" bg="danger" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title className="txtW">Not Completed Objectives</Card.Title>
                            <Card.Text className="txtW text-right">
                                {this.state.obj.map((item) => item.notCompleted)}
                                </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="main__cards__data" bg="danger" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title className="txtW">Completion Percentage</Card.Title>
                            <Card.Text className="txtW text-right">
                                *
                                </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="container main__dashboard__contain1">
                    <Line data={this.state.data} height={100} />
                </div>
                <div className="main__dashboard__contain2 pt-5">
                    <Card style={{ width: '30rem' }}>
                        <Card.Header>Team Information</Card.Header>
                        <ListGroup variant="flush">
                        <ListGroup.Item>*</ListGroup.Item>
                            <ListGroup.Item>\</ListGroup.Item>
                            <ListGroup.Item>/</ListGroup.Item>
                        </ListGroup>
                    </Card>

                    <Card style={{ width: '30rem' }}>
                        <Card.Header>Recent Activities</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>*</ListGroup.Item>
                            <ListGroup.Item>\</ListGroup.Item>
                            <ListGroup.Item>/</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            </div>
        );
    }
}