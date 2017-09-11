import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditlistPage } from './editlist';

@NgModule({
  declarations: [
    EditlistPage,
  ],
  imports: [
    IonicPageModule.forChild(EditlistPage),
  ],
})
export class EditlistPageModule {}
