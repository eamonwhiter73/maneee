import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DropinPage } from './dropin';

@NgModule({
  declarations: [
    DropinPage,
  ],
  imports: [
    IonicPageModule.forChild(DropinPage),
  ],
})
export class DropinPageModule {}
