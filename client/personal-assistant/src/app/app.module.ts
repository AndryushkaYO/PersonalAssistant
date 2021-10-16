import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderBlockComponent } from './header-block/header-block.component';
import { MainBlockComponent } from './main-block/main-block.component';
import { SideBlockComponent } from './side-block/side-block.component';
import { FooterBlockComponent } from './footer-block/footer-block.component';
import { SelectionMenuComponent } from './components/selection-menu/selection-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBlockComponent,
    MainBlockComponent,
    SideBlockComponent,
    FooterBlockComponent,
    SelectionMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
