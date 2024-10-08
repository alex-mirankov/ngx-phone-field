import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxIntlPhoneField } from './ngx-intl-phone-field.directive';

@NgModule({
    declarations: [NgxIntlPhoneField],
    imports: [CommonModule],
    exports: [NgxIntlPhoneField],
})
export class NgxIntlPhoneFieldModule {}