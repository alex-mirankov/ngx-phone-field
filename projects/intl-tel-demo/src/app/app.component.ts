import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxPhoneField } from '../../../ngx-phone-field/src/public-api';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Iti } from 'intl-tel-input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, NgxPhoneField],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public params = {
    initialCountry: 'us',
    strictMode: true,
    allowDropdown: true,
    // @ts-ignore
    loadUtilsOnInit: async () => await import('intl-tel-input/utils'),
  };
  public phone: Iti | null = null;

  public phoneForm = new FormGroup({
    phone: new FormControl<Iti | null>(null),
  });
}
