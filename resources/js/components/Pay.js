import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Balance from './Balance';

export default class Pay extends Component {
  constructor() {
      super();
  }
    componentDidMount() {
        axios.get('/api/user').then(data => {
            console.log(data.data);
        })
    }


    render() {
        return (
            <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Send A Payment</div>

                            <div className="card-body">
                                <input placeholder="Enter Tag" />
                                <input placeholder="Enter Amount" />
                                <button>Pay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
