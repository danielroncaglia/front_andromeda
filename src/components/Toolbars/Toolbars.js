import React, { Component } from 'react';
import logo from '../../assets/images/onlyLogo.png';
import DashboardIcon from 'react-ionicons/lib/MdTrendingUp';
import SearchIcon from 'react-ionicons/lib/IosSearchOutline';
import TrophyIcon from 'react-ionicons/lib/IosTrophy';
import { Link } from 'react-router-dom';
import InfoIcon from 'react-ionicons/lib/IosInformationCircleOutline';

export default class BarrasMenu extends Component {

    render() {
        return (

            <div>
                <div className="toolbar"></div>

                <div className="options">

                    <img src={logo} alt="Andromeda" />

                    <nav className="nav">
                        <Link className="option" to="/"><TrophyIcon color="#3E3672" className="icon" fontSize="30px" /><span className="tooltip">OKRs</span></Link>
                        <Link className="option" to="*"><DashboardIcon color="#3E3672" className="icon" fontSize="30px" /><span className="tooltip">Dashboard</span></Link>
                        <Link className="option" to="/search"><SearchIcon color="#3E3672" className="icon" fontSize="30px" /><span className="tooltip">Search</span></Link>
                        <Link className="option" to="/aboutOKRS"><InfoIcon color="#3E3672" className="icon" fontSize="30px" /><span className="tooltip">About</span></Link>
                    </nav>

                    <span>©</span>
                </div>

            </div>
        );
    }
}