import React, { Component } from 'react';

import Toolbars from '../../components/Toolbars/Toolbars';

export default class Info extends Component {
    render() {
        return (
            <div>
                <header>
                    <div>
                        <Toolbars />
                    </div>
                </header>
                    <div>
                        <h1
                        className="container">O que é OKR?</h1>
                    </div>
                
            </div>
        );
    }
}