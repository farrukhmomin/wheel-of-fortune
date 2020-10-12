import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { GameComponent } from './game.component';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { WheelComponent } from './wheel/wheel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [{ path: '', component: GameComponent }];

@NgModule({
  imports: [RouterModule, CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, HttpClientModule],
  exports: [RouterModule],
  declarations: [GameComponent, BoardComponent, ScoreComponent, WheelComponent]
})
export class GameModule { }
