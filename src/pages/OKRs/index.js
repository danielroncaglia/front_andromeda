import React, { Component } from 'react';
import Toolbars from '../../components/Toolbars/index';
import RegisterObjective from '../../components/RegisterObjective/index';
import RegisterKR from '../../components/RegisterKR/index';
import ListOKR from '../../components/ListOKR/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import './OKRs.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import api from '../../services/api';

export default class Menu extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          listObjs: []
        }
      }

    componentDidMount(){
        this.listObjs();
    }

    listObjs = () => {
        console.log("listou")
        api.get("/objectives")
            .then(response => this.setState({ listObjs: response.data.reverse().sort() }))
            .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div>
                <header>
                    <div>
                        <Toolbars />
                    </div>
                </header>
                <div>

                </div>
                <div>
                    <Accordion defaultActiveKey="1" >
                        <Card >
                            <div className="justify-content-md-center" >
                            
                                <Accordion.Toggle as={Card}
                                    eventKey="0" >

                                    <RegisterObjective listFnc={this.listObjs} />
                                </Accordion.Toggle>
                            </div>
                            <div>
                                <Accordion.Collapse eventKey="0" >
                                    <Card.Body>
                                        <RegisterKR  listFnc={this.listObjs} />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </div>
                        </Card>
                    </Accordion>
                    <div>
                        <ListOKR listObjs={this.state.listObjs} listFnc={this.listObjs}/>
                    </div>
                </div>
            </div>
        );
    }
}