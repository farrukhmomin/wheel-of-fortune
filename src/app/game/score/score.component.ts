import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Output() playGame = new EventEmitter();
  @Input() players: { name: string, score: number, hasTurn: boolean }[];

  gameStart = false;

  constructor() { }
  player = new FormControl('');

  ngOnInit(): void {
  }

  addPlayer(): void {
    this.players.push({ name: this.player.value, score: 0, hasTurn: false });
    this.player.setValue('');
  }

  startGame(): void {
    this.gameStart = true;
    this.players[Math.floor((Math.random() * this.players.length - 1) + 1)].hasTurn = true;

    this.playGame.emit(this.players);
  }

}
