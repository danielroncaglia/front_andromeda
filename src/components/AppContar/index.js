import React, { Component } from 'react';
import Countdown from '../Countdown/index';
import api from '../../services/api';

class AppContar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listObjs: [],
        }
    }

    listObjs = () => {
        api.get("/objectives")
            .then(response =>
                {
                    this.setState({ listObjs: response.data });
                    console.log(response.data.finalDate)
                })
            .catch(erro => console.log(erro))
    }

  render() {
    const currentDate = new Date();
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    
    return (
    
      <div >
        {/* {
            this.state.listObjs.map((item) => ( */}
                <Countdown date={`${year}-12-31T00:00:00`} />

        {/* //     ))
        // } */}
      </div>
    );
  }
}
export default AppContar;