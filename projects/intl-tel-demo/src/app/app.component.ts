import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxIntlPhoneField } from '../../../ngx-intl-phone-field/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxIntlPhoneField],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public params = { initialCountry: 'us', strictMode: true, allowDropdown: true }
}
