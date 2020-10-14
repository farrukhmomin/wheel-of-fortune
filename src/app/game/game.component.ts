import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  players: { name: string, score: number, hasTurn: boolean }[] = [];
  letter: number;
  spinValue: string | number;
  selectedWord: string;
  gameStarted = false;
  turn: { name: string; hasTurn: boolean; }[];


  movieList: any;
  countryList: any;
  citiesList: any;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('assets/dataset/movies.json').subscribe(data => this.movieList = data);
    this.httpClient.get('assets/dataset/countries.json').subscribe(data => this.countryList = data);
    this.httpClient.get('assets/dataset/cities.json').subscribe(data => this.citiesList = data);
  }

  ngOnInit(): void {
  }

  // a callback from letter press event
  // either you guessed correct or you lose your turn
  letterClicked(letter): void {
    if (letter.status === 'LOOSE TURN') {
      this.nextTurn();
      this.spinValue = undefined;
    } else if (letter.status === 'win') {
      this.nextTurn(letter.points);
      this.spinValue = undefined;
      this.selectedWord = this.getMovieName();
    }
  }

  // when spin is complete
  // either you go bankrupt, or lose a turn 
  // or you get a chance to play
  spinComplete(spin): void {
    this.spinValue = spin;
    if (this.spinValue === 'BANKRUPT') {
      this.nextTurn(0);
      this.spinValue = undefined;
    } else if (this.spinValue === 'LOOSE TURN') {
      this.nextTurn();
      this.spinValue = undefined;
    } else {
      this.spinValue = +this.spinValue;
    }
  }

  // main function to start game
  playGame(players): void {
    this.players = players;
    this.turn = [...this.players];
    this.selectedWord = this.getMovieName();
    this.gameStarted = true;
  }

  getMovieName(): string {
    const index = Math.floor((Math.random() * this.movieList.length - 1) + 1);
    const movieName = this.movieList[index].title.replace(/[^a-zA-Z1-9 .]/g, '');
    this.movieList.splice(index, 1);
    console.log(movieName);
    return movieName;
  }

  nextTurn(points?: number): void {
    let currentPlayerIndex = -1;
    this.players.forEach((item, index) => {
      if (item.hasTurn) {
        item.hasTurn = false;
        if (points) {
          item.score = item.score + points;
        }
        currentPlayerIndex = index;
      }
    });

    if (currentPlayerIndex === this.players.length - 1) {
      this.players[0].hasTurn = true;
    } else {
      this.players[++currentPlayerIndex].hasTurn = true;
    }
  }

}
