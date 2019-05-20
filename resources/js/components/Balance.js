import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

export default class Balance extends Component {

    constructor() { 
        super(); 
        this.state = { 
            user: {}
        }; 
    }


    componentDidMount() {
        axios.get('/api/user').then(data => {
            this.setState({
                user: data.data
            })
            console.log(this.state.user);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">My Profile</div>

                            <div className="card-body">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
