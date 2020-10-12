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
  movieList: any;
  countryList: any;
  selectedWord: string;


  @ViewChild('board') board: BoardComponent;
  showSpin = false;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('assets/movies.json').subscribe(data => this.movieList = data);
    this.httpClient.get('assets/countries.json').subscribe(data => this.countryList = data);
  }

  ngOnInit(): void {
  }

  letterClicked(letter): void {

    if (letter.status === 'lose turn') {
      this.nextTurn();
    } else if (letter.status === 'win') {
      this.nextTurn(letter.points);
      this.selectedWord = this.getMovieName();
      console.log(this.selectedWord);

    }
  }

  spinComplete(spin): void {
    this.spinValue = spin;
    if (this.spinValue === -1) {
      this.nextTurn(0);
    } else if (this.spinValue === 0) {
      this.nextTurn();
    }
  }

  playGame(players): void {
    this.players = players;
    this.selectedWord = this.getMovieName();
    this.showSpin = true;
    console.log(this.selectedWord);
  }

  getMovieName(): string {
    return this.movieList[Math.floor((Math.random() * this.movieList.length - 1) + 1)].title.replace(/[^a-zA-Z .]/g, '');
  }

  nextTurn(points?): void {
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
