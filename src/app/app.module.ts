import { GameValidatorService } from './services/game-validator-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BoardComponent } from './component/board/board.component';
import { GlobalDataService } from './services/global-data.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GameValidatorService,
    GlobalDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
