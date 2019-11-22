import React, { Component } from 'react';
import Toolbars from '../../components/Toolbars/Toolbars'
import './Dashboard.css';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['october', 'november', 'december'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

export default class MainPage extends Component {
    render() {
        return (
            <div>
                <div>
                    <Toolbars />
                </div>
                <div className="container main__dashboard__contain">
                    <Line data={data} />
                </div>
            </div>
        );
    }
}