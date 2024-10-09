import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxPhoneField } from './ngx-phone-field.directive';

@NgModule({
    declarations: [NgxPhoneField],
    imports: [CommonModule],
    exports: [NgxPhoneField],
})
export class NgxPhoneFieldModule {}