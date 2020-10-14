import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../game.service';
import { WheelDirective } from './wheel.directive';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {

  @ViewChild(WheelDirective) wheel: WheelDirective;
  @Output() spinComplete = new EventEmitter();

  theWheel: any;
  onWheelStop: Observable<any>;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.onWheelStop.subscribe(point => {
      this.spinComplete.emit(point);
    });
  }

  spin(): void {
    this.wheel.resetWheel();
    this.wheel.theWheel.startAnimation();
  }
}
