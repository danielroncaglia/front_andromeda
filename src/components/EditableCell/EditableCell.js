import React, { Component } from 'react';


export default class EditableCell extends Component {

    render() {
        return (

            <div>
                <span onClick={this.props.edit}>
                    {this.props.info}
                </span>
                <input type="text"
                value={this.props.info}
                style={{ display: 'none' }}
                readOnly
                />
            </div>




        )

}
}