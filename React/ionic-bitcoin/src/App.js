import React, {Component} from 'react';
import { 
  IonApp, 
  IonContent,
  IonIcon
  } from '@ionic/react';

import './App.css';

import LoadingCard from './components/LoadingCard/LoadingCard';
import { getBitcoinPrice } from './api/Bitcoin';
import BitcoinCard from './components/BitcoinCard/BitcoinCard';
class App extends Component {
  state = {
    bitcoinInfo: {},
    loading: true,
  };

  async componentDidMount () {
    const bitcoinInfo = await getBitcoinPrice();

    this.setState({
      bitcoinInfo, 
      loading : false,
    }, 
      () => console.log(this.state),
    );
  }

  createLoadingCards(){
    return (
      <>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </>
    );
  }

  createBitcoinCards(bitcoinInfo){
    return Object.keys(bitcoinInfo.bpi).map((item, index) => (
      <BitcoinCard data={bitcoinInfo.bpi[item]} />
    ))
  }

  render() {
    const {bitcoinInfo, loading} = this.state;
    return (
      <IonApp>
        <IonContent>
          <section className="bitcoin__header">
          <IonIcon name="logo-bitcoin" className="bitcoin__logo"></IonIcon>
          </section>
          {loading === true 
          ? this.createLoadingCards() 
          : this.createBitcoinCards(bitcoinInfo)}

          <section className="bitcoin__disclaimer">
          <p>{bitcoinInfo.disclaimer}</p>
          </section>
        </IonContent>
      </IonApp>
    );
  }
}

export default App;
