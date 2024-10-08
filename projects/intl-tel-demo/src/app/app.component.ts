import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxIntlPhoneField } from '../../../ngx-intl-phone-field/src/public-api';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, NgxIntlPhoneField],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public params = { initialCountry: 'us', strictMode: true, allowDropdown: true };
  public phone: string = '';

  public phoneForm = new FormGroup({
    phone: new FormControl(''),
  });
}
