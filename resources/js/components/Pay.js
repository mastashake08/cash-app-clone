import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Pay extends Component {
    render() {
        return (
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
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Pay />, document.getElementById('example'));
}
