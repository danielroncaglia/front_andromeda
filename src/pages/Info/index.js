import React, { Component } from 'react';
import Toolbars from '../../components/Toolbars/index';
import '../Info/Info.css';
import Button from 'react-bootstrap/Button';

export default class Info extends Component {
    render() {
        return (
            <div>
                <header>
                    <Toolbars />
                </header>

                <div className="list_objectives-container" >
                    <h1>O que são OKRS?</h1>
                    <br></br>
                    <h2>Quero alcançar os *Objetivos*,</h2>
                    <h2>medido por *Resultados Chave*</h2>
                    <br></br>
                    <h3>Objetivos</h3>
                    <h4>Título, Dono, Destino, Peso, Período e Data</h4>
                    <h3>Resultados Chave</h3>
                    <h4>Título, Dono, Peso, Tipo, Número atual e Número final e Data</h4>
                    <br></br>
                    <h1>Os donos</h1>
                    <br></br>
                    <h2>OKR da Empresa</h2>
                    <h2>OKR da Time</h2>
                    <h2>OKR do Indívidio</h2>
                    <br></br>
                    <h1>OKRs devem ter:</h1>
                    <h3>Foco</h3>
                    <h3>Alinhamento</h3>
                    <h3>Produtividade</h3>
                    <h3>Transparência</h3>
                    <h3>Comunicação</h3>
                    <br></br>
                    <Button to="/" variant="primary">Faça seus OKRs</Button>

                </div>

            </div>
        );
    }
}