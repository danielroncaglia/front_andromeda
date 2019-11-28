import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Nav } from 'react-bootstrap';

import logo from '../../assets/images/onlyLogo.png';
import './Toolbars.css';

/* Icones do bootstrap */
import DashboardIcon from 'react-ionicons/lib/MdTrendingUp';
import SearchIcon from 'react-ionicons/lib/IosSearchOutline';
import TrophyIcon from 'react-ionicons/lib/IosTrophy';
import InfoIcon from 'react-ionicons/lib/IosInformationCircleOutline';
import SettingsIcon from 'react-ionicons/lib/MdSettings';

export default class Toolbars extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ModalIsOpen: false
        }
    }

    render() {
        return (

            <div>

                <div className="toolbar"></div>

                <div className="options">

                    <img src={logo} alt="Andromeda" />

                    <nav className="nav">
                        <Link className="option" to="/"><TrophyIcon color="#3E3672" className="icon" fontSize="30px" /><span className="tooltip">OKRs</span></Link>
                        <Link className="option" to="/dashboard"><DashboardIcon color="#3E3672" className="icon" fontSize="30px" /><span className="tooltip">Dashboard</span></Link>
                        <Link className="option" to="/search"><SearchIcon color="#3E3672" className="icon" fontSize="30px" /><span className="tooltip">Search</span></Link>
                        <Link className="option" to="/about"><InfoIcon color="#3E3672" className="icon" fontSize="30px" /><span className="tooltip">About</span></Link>
                    </nav>

                    <button
                        className="toolbars__button__showModal"
                        onClick={() => {
                            this.setState({ ModalIsOpen: true });
                        }}
                    >
                        <SettingsIcon color="#3E3672" className="icon" fontSize="35px" />
                    </button>
                </div>

                <Modal
                    show={this.state.ModalIsOpen}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Configurações do Usuário
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="d-flex">
                        <Nav variant="tabs" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link href="/home">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.setState({ ModalIsOpen: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}