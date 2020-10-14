import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, HostListener } from '@angular/core';
import { playBuzzer, playWordFound, playWin } from 'src/app/common/sound';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {

  @Input() word = 'fuck you';
  @Input() spinValue;
  @Output() letterClicked = new EventEmitter();

  guessWords: any[] = [];

  totalLetterFound = 0;
  totalLetters = 0;
  pointsWon = 0;

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.word) {
      this.generateBoard();
      this.spinValue = undefined;
    }
  }

  ngOnInit(): void {
    this.generateBoard();
  }

  generateBoard(): void {
    if (this.word === undefined) { return; }
    this.enableAllButtons();
    this.totalLetterFound = 0;
    this.totalLetters = 0;
    this.pointsWon = 0;
    this.guessWords = [];
    this.word.split(' ').forEach(word => {
      const letterObj: { letter: string, show: boolean }[] = [];

      word.split('').forEach(l => {
        letterObj.push({ letter: l, show: false });
        this.totalLetters++;
      });
      this.guessWords.push(letterObj);
    });
  }

  showLetter(lett: string, e: HTMLElement): void {
    let letterFoundInGame = 0;
    if (this.spinValue === undefined) {
      alert('spin the wheel');
      return;
    }
    let wordFound = false;
    this.guessWords.forEach(word => {
      word.forEach(letter => {
        if (letter.letter.toLowerCase() === lett.toLowerCase()) {
          letter.show = wordFound = true;
          this.totalLetterFound++;
          letterFoundInGame++;
        }
      });
    });
    e.setAttribute('style', 'display:block');

    if (wordFound === false) {
      playBuzzer();
      this.letterClicked.emit({ status: 'LOOSE TURN' });
      this.pointsWon = 0;
      this.spinValue = undefined;
    } else {
      this.pointsWon += this.spinValue * letterFoundInGame;

      if (this.totalLetterFound >= this.totalLetters) {
        playWin();
        setTimeout(() => {
          this.letterClicked.emit({ status: 'win', points: this.pointsWon });
        }, 3000);
      }
      else {
        playWordFound();
      }
    }

  }

  enableAllButtons(): void {
    this.elementRef.nativeElement.querySelectorAll('.alphabets button').forEach(element => {
      element.removeAttribute('style');
    });
  }

  @HostListener('document:keypress', ['$event'])
  keyboardEvent(event: KeyboardEvent): void {
    if (this.spinValue) {
      const element = this.elementRef.nativeElement.querySelector('.letter-' + event.key);
      if (element.getAttribute('disabled') === 'disabled') {
        alert('Spin the wheel!')
        return;
      }
      this.showLetter(event.key, element);
    }
  }


}
