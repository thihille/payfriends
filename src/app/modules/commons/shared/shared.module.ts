import { RouterModule } from '@angular/router';
import { IllustratorFriendComponent } from './components/illustrator-friend/illustrator-friend.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { FeatherModule } from 'angular-feather';
import { Eye, EyeOff, Edit, XCircle, Filter } from 'angular-feather/icons';

/*PrimeNG modules */
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

const icons = {
  Eye,
  EyeOff,
  Edit,
  XCircle,
  Filter
};

@NgModule({
  imports: [CommonModule, RouterModule, FeatherModule.pick(icons)],
  declarations: [HeaderComponent, ModalComponent, IllustratorFriendComponent, LoaderComponent],
  exports: [
    HeaderComponent,
    ModalComponent,
    IllustratorFriendComponent,
    LoaderComponent,
    FeatherModule,
    TableModule,
    CheckboxModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ToastModule,
    OverlayPanelModule,
    InputSwitchModule,
    TriStateCheckboxModule
  ]
})
export class SharedModule {}
