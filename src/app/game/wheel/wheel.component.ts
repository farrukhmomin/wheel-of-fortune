import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {

  @Output() spinComplete = new EventEmitter();

  points = [
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 1000, display: '$1000' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 2000, display: '$2000' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 3000, display: '$3000' },
    { point: 4000, display: '$4000' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 1000, display: '$1000' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 2000, display: '$2000' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 3000, display: '$3000' },
    { point: -1, display: 'Bankruptcy' },
    { point: 4000, display: '$4000' },
    { point: 100, display: '$100' },
    { point: 0, display: 'Lose a turn' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 5000, display: '$5000' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 400, display: '$400' },
    { point: 500, display: '$500' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 600, display: '$600' },
    { point: 700, display: '$700' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 800, display: '$800' },
    { point: 900, display: '$900' },
    { point: 0, display: 'Lose a turn' },
    { point: -1, display: 'Bankruptcy' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 5000, display: '$5000' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 400, display: '$400' },
    { point: 500, display: '$500' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 600, display: '$600' },
    { point: 700, display: '$700' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 800, display: '$800' },
    { point: 900, display: '$900' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 400, display: '$400' },
    { point: 500, display: '$500' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' },
    { point: 600, display: '$600' },
    { point: 700, display: '$700' },
    { point: 100, display: '$100' },
    { point: 200, display: '$200' },
    { point: 300, display: '$300' }
  ];
  spinValue = 'SPIN';

  constructor() {

  }

  ngOnInit(): void {

  }

  spin(): void {

    let stopWheel = false;
    setTimeout(() => {
      stopWheel = true;
    }, 2000);

    const wheelSpin = setInterval(() => {
      const spin = this.shuffle(this.points)[Math.floor((Math.random() * this.points.length - 1) + 1)];
      this.spinValue = spin.display;
      if (stopWheel) {
        clearInterval(wheelSpin);
        this.spinComplete.emit(spin.point);
      }
    }, 50);

  }

  shuffle(a: any): any {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

}
