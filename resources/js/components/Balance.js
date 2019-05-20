import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

export default class Balance extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            user: {}
        };
        axios.get('/api/user').then(data => {
            this.setState({
                user: data.data.data,
                isLoading: false
            })
            console.log('Balance:',this.state.user.balance.available[0].amount/100);
        })
    }


    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">My Profile</div>

                            <div className="card-body">
                            { !this.state.isLoading ?

                              <div>
                                <p>Tag: {this.state.user.tag}</p>
                                <p>Available: ${this.state.user.balance.available[0].amount/100}</p>
                                <p>Pending: ${this.state.user.balance.pending[0].amount/100}</p>
                                <hr />
                              </div>
                              :
                              <div>

                                <p>Loading</p>
                                <hr />
                              </div>
                          }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
