import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    onWheelStop = new Subject<number | string>();
}
