import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {StripeProvider, Elements} from 'react-stripe-elements';
export default class Pay extends Component {
  constructor() {
      super();
      this.state = {
          deferredPrompt:null
      };
      this.install = this.install.bind(this);
      window.addEventListener('beforeinstallprompt', (e) => {
        console.log(e)
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
          <StripeProvider apiKey="pk_live_REpu4rz1eQsuOgZuxukmRxbX">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Send A Payment</div>

                            <div className="card-body">
                                <Elements>
                                <input placeholder="Enter Tag" />
                                <input placeholder="Enter Amount" />
                                <button>Pay</button>
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <button onClick={this.install}>
                  Install this app!
                </button>
            </div>
            </StripeProvider>

        );
    }
}
ReactDOM.render(<Pay />, document.getElementById('pay'));
