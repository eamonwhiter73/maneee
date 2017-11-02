import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormulasPage } from './formulas';

@NgModule({
  declarations: [
    FormulasPage,
  ],
  imports: [
    IonicPageModule.forChild(FormulasPage),
  ],
})
export class FormulasPageModule {}
