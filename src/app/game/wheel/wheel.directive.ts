import { AfterViewInit, Directive } from '@angular/core';
import { playTick } from 'src/app/common/sound';
import { GameService } from '../game.service';

declare var Winwheel;

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[appwheel]'
})
export class WheelDirective implements AfterViewInit {

    wheelPower = 1;
    wheelSpinning = false;
    theWheel: any;


    constructor(private gameService: GameService) { }

    ngAfterViewInit(): void {
        this.theWheel = new Winwheel({
            outerRadius: 212,        // Set outer radius so wheel fits inside the background.
            innerRadius: 75,         // Make wheel hollow so segments dont go all way to center.
            textFontSize: 24,         // Set default font size for the segments.
            textOrientation: 'vertical', // Make text vertial so goes down from the outside of wheel.
            textAlignment: 'outer',    // Align text to outside of wheel.
            numSegments: 24,         // Specify number of segments.
            segments:             // Define segments including colour and text.
                [                               // font size and text colour overridden on backrupt segments.
                    { fillStyle: '#ee1c24', text: '300' },
                    { fillStyle: '#3cb878', text: '450' },
                    { fillStyle: '#f6989d', text: '600' },
                    { fillStyle: '#00aef0', text: '750' },
                    { fillStyle: '#f26522', text: '500' },
                    { fillStyle: '#000000', text: 'BANKRUPT', textFontSize: 16, textFillStyle: '#ffffff' },
                    { fillStyle: '#e70697', text: '3000' },
                    { fillStyle: '#fff200', text: '600' },
                    { fillStyle: '#f6989d', text: '700' },
                    { fillStyle: '#ee1c24', text: '350' },
                    { fillStyle: '#3cb878', text: '500' },
                    { fillStyle: '#f26522', text: '800' },
                    { fillStyle: '#ffffff', text: 'LOOSE TURN', textFontSize: 12 },
                    { fillStyle: '#fff200', text: '400' },
                    { fillStyle: '#00aef0', text: '650' },
                    { fillStyle: '#ee1c24', text: '1000' },
                    { fillStyle: '#f6989d', text: '500' },
                    { fillStyle: '#f26522', text: '400' },
                    { fillStyle: '#3cb878', text: '900' },
                    { fillStyle: '#000000', text: 'BANKRUPT', textFontSize: 16, textFillStyle: '#ffffff' },
                    { fillStyle: '#a186be', text: '600' },
                    { fillStyle: '#fff200', text: '700' },
                    { fillStyle: '#00aef0', text: '800' },
                    { fillStyle: '#ffffff', text: 'LOOSE TURN', textFontSize: 12 }
                ],
            animation:           // Specify the animation to use.
            {
                type: 'spinToStop',
                duration: 10,
                spins: 3,
                callbackFinished: this.alertPrize.bind(this),  // Function to call when the spinning has stopped.
                callbackSound: playTick,   // Called when the tick sound is to be played.
                soundTrigger: 'pin'        // Specify pins are to trigger the sound.
            },
            pins:                // Turn pins on.
            {
                number: 24,
                fillStyle: 'silver',
                outerRadius: 4,
            }
        });
    }

    // Called when the animation has finished.
    alertPrize(indicatedSegment): void {
        this.gameService.onWheelStop.next(indicatedSegment.text);
    }

    startSpin(): void {
        // Ensure that spinning can't be clicked again while already running.
        if (this.wheelSpinning === false) {
            // Based on the power level selected adjust the number of spins for the wheel, the more times is has
            // to rotate with the duration of the animation the quicker the wheel spins.
            if (this.wheelPower === 1) {
                this.theWheel.animation.spins = 3;
            } else if (this.wheelPower === 2) {
                this.theWheel.animation.spins = 6;
            } else if (this.wheelPower === 3) {
                this.theWheel.animation.spins = 10;
            }

            // Begin the spin animation by calling startAnimation on the wheel object.
            this.theWheel.startAnimation();

            // Set to true so that power can't be changed and spin button re-enabled during
            // the current animation. The user will have to reset before spinning again.
            this.wheelSpinning = true;
        }
    }

    resetWheel(): void {
        this.theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
        this.theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
        this.theWheel.draw();                // Call draw to render changes to the wheel.

        this.wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
    }
}
