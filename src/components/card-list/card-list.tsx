import React from 'react';
import style from './card-list.module.scss';
import md5 from 'md5';

class CardList extends React.Component {
  publicKey: string = String(import.meta.env.VITE_PUBLIC_KEY);
  privateKey: string = String(import.meta.env.VITE_PRIVATE_KEY);
  apiBase: string = 'https://gateway.marvel.com:443/v1/public/';

  getCharacters = (): void => {
    const time = new Date().getTime();
    const hash = this.generateHash(time);
    const url = `${this.apiBase}/characters?apikey=${this.publicKey}&hash=${hash}&ts=${time}&limit=20&offset=0`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  generateHash = (time: number): string => {
    return md5(time + this.privateKey + this.publicKey);
  };
  render(): React.ReactNode {
    return (
      <div className={style['card-list']}>
        <h1>Marvel Characters</h1>
        <button onClick={this.getCharacters}>Fetch Characters</button>
        <p>Check the console for the fetched data.</p>
      </div>
    );
  }
}

export default CardList;
