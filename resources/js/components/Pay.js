import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Balance from './Balance';

export default class Pay extends Component {
  constructor() {
      super();
      this.state = {
          deferredPrompt:null
      };
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        this.state.deferredPrompt = e;
      });
  }
    componentDidMount() {
        axios.get('/api/user').then(data => {
            console.log(data.data);
        })
    }


install() {
  if (this.state.deferredPrompt) {
    this.state.deferredPrompt.prompt();
    console.log(deferredPrompt)
    this.state.deferredPrompt.userChoice.then(function(choiceResult){

      if (choiceResult.outcome === 'accepted') {
      console.log('Your PWA has been installed');
    } else {
      console.log('User chose to not install your PWA');
    }

    this.state.deferredPrompt = null;

    });


  }
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
            <br/>
            <button onclick={this.install}>
              Install this app!
            </button>
            </div>
        );
    }
}
