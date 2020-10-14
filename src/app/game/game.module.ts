import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { GameComponent } from './game.component';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { WheelComponent } from './wheel/wheel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './game.service';
import { WheelDirective } from './wheel/wheel.directive';

const routes: Routes = [{ path: '', component: GameComponent }];

@NgModule({
  imports: [RouterModule, CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, HttpClientModule],
  exports: [RouterModule],
  providers: [GameService],
  declarations: [GameComponent, BoardComponent, ScoreComponent, WheelComponent, WheelDirective]
})
export class GameModule { }
