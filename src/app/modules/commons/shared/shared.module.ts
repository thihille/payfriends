import { RouterModule } from '@angular/router';
import { IllustratorFriendComponent } from './components/illustrator-friend/illustrator-friend.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { FeatherModule } from 'angular-feather';
import { Eye, EyeOff } from 'angular-feather/icons';

const icons = {
  Eye,
  EyeOff
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule.pick(icons)
  ],
  declarations: [
    HeaderComponent,
    ModalComponent,
    IllustratorFriendComponent
  ],
  exports: [
    HeaderComponent,
    ModalComponent,
    IllustratorFriendComponent,
    FeatherModule
  ]
})
export class SharedModule { }
