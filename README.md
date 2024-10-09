# ngx-intl-phone-field

`ngx-intl-phone-field` is an Angular directive that provides international phone input with country flag dropdowns. It integrates with Angular forms, supporting both Reactive Forms and Template-Driven Forms.

## Table of Contents

1. [Features](#features)
2. [Version Compatibility](#version-compatibility)
3. [Installation](#installation)
4. [Usage](#usage)
   - [Standalone Directive and Example with Reactive Forms](#standalone-directive-and-example-with-reactive-forms)
   - [Standalone Directive and Example with Template-Driven Forms](#standalone-directive-and-example-with-template-driven-forms)
5. [Configuration Options](#configuration-options)
6. [Instance Methods and Properties](#instance-methods-and-properties)
   - [Static Methods](#static-methods)
   - [Events](#events)
7. [Development](#development)
8. [License](#license)


## Features
- International phone input field with country code selection.
- Supports `intl-tel-input` functionalities such as number validation, formatting, and placeholder management.
- Works with both Reactive Forms and Template-Driven Forms.
- Customizable via configuration options.

## Version Compatibility

| ngx-intl-phone-field Version | Supported Angular Versions                |
|------------------------------|-------------------------------------------|
| v2.x.x                       | Angular 15 to Angular 18 (inclusive)      |
| v1.x.x                       | Angular 10 to Angular 14 (inclusive)      |

## Installation

```bash
npm install ngx-intl-phone-field
```
`Note`: You don't need to install intl-tel-input separately. It's bundled with the package.

## Usage
`ngxIntlPhoneField` directive returns the full `intl-tel-input` instance when the input changes. This gives the access to all the methods and properties available in the `intl-tel-input` API, providing full flexibility for advanced use cases.

### Standalone directive and Example with Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlPhoneFieldDirective } from 'ngx-intl-phone-field';

@Component({
  selector: 'app-phone-form',
  standalone: true,
  template: `
    <form [formGroup]="phoneForm">
      <label for="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        formControlName="phone"
        ngxIntlPhoneField
        [ngxIntlPhoneFieldParams]="params"
      />
      <div *ngIf="phoneForm.controls.phone?.invalid">
        Phone number is invalid
      </div>
    </form>
  `,
  imports: [ReactiveFormsModule, NgxIntlPhoneFieldDirective]
})
export class PhoneFormComponent {
  phoneForm = new FormGroup({
    phone: new FormControl(''),
  });

  params = {
    initialCountry: 'us',
    allowDropdown: true,
    formatAsYouType: true,
  };

  handleSubmit() {
    const phoneControlValue = this.phoneForm.get('phone').value;
    console.log(phoneControlValue); // Iti instance
  }
}
```

### Standalone directive and Example with Template-Driven Forms

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxIntlPhoneFieldDirective } from 'ngx-intl-phone-field';

@Component({
  selector: 'app-template-phone-form',
  standalone: true,
  template: `
    <form #phoneForm="ngForm">
      <label for="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        [(ngModel)]="phone"
        ngxIntlPhoneField
        [ngxIntlPhoneFieldParams]="params"
        required
      />
      <div *ngIf="phoneForm.controls.phone?.invalid && phoneForm.controls.phone?.touched">
        Phone number is invalid
      </div>
    </form>

    <button (click)="logInstance()">Log Instance</button>
  `,
  imports: [FormsModule, NgxIntlPhoneFieldDirective]
})
export class TemplatePhoneFormComponent {
  public phone: string = '';
  
  params = {
    initialCountry: 'us',
    allowDropdown: true,
    formatAsYouType: true,
  };

  logInstance() {
    console.log(this.phone) // Iti instance
  }
}
```

## Configuration Options

You can pass various options to configure the behavior of the phone input field through `ngxIntlPhoneFieldParams`. The `ngxIntlPhoneFieldParams` input accepts a configuration object, which includes all the properties from `intl-tel-input`. You can refer to the full list of properties in the `Initialisation Options` section [here](https://www.npmjs.com/package/intl-tel-input) or see them here:
.

| Option                   | Type                                 | Default          | Description                                                                                                                                                                                                                                                                                                                                 |
|--------------------------|--------------------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `allowDropdown`           | Boolean                              | true             | Whether or not to allow the dropdown. If disabled, the selected country is not clickable, and the flag appears on the right. If `separateDialCode` is enabled, `allowDropdown` is forced to true.                                                                                                                                            |
| `autoPlaceholder`         | String                               | "polite"         | Set the input's placeholder to an example number for the selected country. You can specify the number type using `placeholderNumberType`. Requires the utils script to be loaded.                                                                                                                     |
| `containerClass`          | String                               | ""               | Additional classes to add to the wrapper `<div>`.                                                                                                                                                                                                                                                                                           |
| `countryOrder`            | Array                                | null             | Specify the order of the country list using an array of ISO2 country codes. Any omitted countries will appear after the specified ones.                                                                                                                                                                                                     |
| `countrySearch`           | Boolean                              | true             | Add a search input to the top of the dropdown to filter the displayed countries.                                                                                                                                                                                                                                                             |
| `customPlaceholder`       | Function                             | null             | Change the placeholder generated by `autoPlaceholder`. The function must return a string. Example: `customPlaceholder: (placeholder, countryData) => "e.g. " + placeholder`.                                                                                                                            |
| `dropdownContainer`       | Node                                 | null             | Instead of placing the country dropdown markup next to the input, append it to the specified node (e.g., `document.body`). Useful when the input is inside a container with `overflow: hidden`.                                                                                                                                               |
| `excludeCountries`        | Array                                | []               | Display all countries except the ones specified in this array.                                                                                                                                                                                                                                                                               |
| `fixDropdownWidth`        | Boolean                              | true             | Fix the dropdown width to match the input width.                                                                                                                                                                                                                                                                                            |
| `formatAsYouType`         | Boolean                              | true             | Automatically format the number as the user types. Requires the utils script to be loaded.                                                                                                                                                                                                                                                  |
| `formatOnDisplay`         | Boolean                              | true             | Format the input value during initialization and on `setNumber`. Requires the utils script to be loaded.                                                                                                                                                                                                                                    |
| `geoIpLookup`             | Function                             | null             | Custom function for IP lookup services to get the user's location and return the relevant country code. Requires setting `initialCountry` to `auto`.                                                                                                                                                                                          |
| `hiddenInput`             | Function                             | null             | Allows creating hidden input fields within a form to store the full international number and country code. This requires the input to be inside a form and the utils script to be loaded.                                                                                                                                                     |
| `i18n`                    | Object                               | {}               | Localize or customize the country names and other user interface text. You can import predefined translations or provide your own custom translations.                                                                                                                                                                                        |
| `initialCountry`          | String                               | ""               | Set the initial country selection using the country code (e.g., `"us"` for the United States). Can also be set to `"auto"` for automatic IP-based country detection.                                                                                                                                                                          |
| `loadUtilsOnInit`         | String or () => Promise<module>      | ""               | URL to the utils.js script for formatting/validation. It can also be a function returning a promise. Example: `{ loadUtilsOnInit: () => import("intl-tel-input/utils") }`.                                                                                                                            |
| `nationalMode`            | Boolean                              | true             | Format numbers in the national format rather than the international format. This applies to placeholder numbers and when displaying existing numbers.                                                                                                                                                                                        |
| `onlyCountries`           | Array                                | []               | In the dropdown, display only the countries specified in this array.                                                                                                                                                                                                                                                                         |
| `placeholderNumberType`   | String                               | "MOBILE"         | Set the number type for the placeholder (e.g., `"FIXED_LINE"`).                                                                                                                                                                                                                                                                              |
| `showFlags`               | Boolean                              | true             | Show or hide the country flags. If set to `false`, a globe icon will be displayed instead of the flags.                                                                                                                                                                                                                                      |
| `separateDialCode`        | Boolean                              | false            | Display the selected country's dial code next to the input field. Automatically opens the country dropdown if the user types a new dial code.                                                                                                                                                                                                 |
| `strictMode`              | Boolean                              | false            | As the user types, ignore irrelevant characters and cap the input to the maximum valid number length. Requires the utils script to be loaded.                                                                                                                                                                                                |
| `useFullscreenPopup`      | Boolean                              | true (on mobile) | Show the country list as a fullscreen popup on mobile devices and as an inline dropdown on larger devices.                                                                                                                                                                                                                                  |
| `utilsScript`             | String or () => Promise<module>      | ""               | ⚠️ **Deprecated**. Use `loadUtilsOnInit` instead.                                                                                                                                                                                                                                                                                             |
| `validationNumberType`    | String                               | "MOBILE"         | Set the number type to enforce during validation with `isValidNumber` and number length enforcement with `strictMode`.                                                                                                                                                                                                                        
## Instance Methods and Properties

Once you initialize the `ngxIntlPhoneField`, the directive returns an instance of `intl-tel-input` with the following methods and properties:

| Method                     | Description                                                                                                                                                                                                                                                       |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `destroy()`                 | Removes the plugin from the input and unbinds all event listeners.                                                                                                                                                                                                |
| `getExtension()`            | Returns the extension from the current number. Requires the utils script to be loaded. Example: if the input value is `"(702) 555-5555 ext. 1234"`, this will return `"1234"`.                                                                                   |
| `getNumber(format?)`        | Gets the current number in the specified format. Defaults to E.164 format. Formats are available in `intlTelInput.utils.numberFormat`. Example: `iti.getNumber(intlTelInput.utils.numberFormat.E164)` returns a string like `"+17024181234"`. Requires utils script. |
| `getNumberType()`           | Returns the type of the current number (fixed-line/mobile/toll-free, etc.). Requires the utils script to be loaded. Example: `iti.getNumberType()` returns an integer matched against `intlTelInput.utils.numberType`.                                              |
| `getSelectedCountryData()`  | Returns the country data for the currently selected country, e.g., `{ name: "Afghanistan", iso2: "af", dialCode: "93" }`.                                                                                                                                        |
| `getValidationError()`      | Returns information about a validation error. Example: `iti.getValidationError()` returns an integer matched against `intlTelInput.utils.validationError`.                                                                                                       |
| `isValidNumber()`           | Returns `true` or `false` based on whether the current number is valid (based on length). It respects the `validationNumberType` option (set to `"MOBILE"` by default). Requires utils script.                                                                     |
| `isValidNumberPrecise()`    | Returns `true` or `false` for more precise validation using detailed matching rules for each country/area code. This is more accurate but requires the plugin to be up-to-date. Requires the utils script.                                                          |
| `setCountry(countryCode)`   | Changes the selected country. Example: `iti.setCountry("gb")`. This method automatically updates when calling `setNumber` with a full international number.                                                                                                        |
| `setNumber(number)`         | Inserts a number into the input and updates the selected country accordingly. If `formatOnDisplay` is enabled, it formats the number based on `nationalMode`. Example: `iti.setNumber("+447733123456")`.                                                             |
| `setPlaceholderNumberType(type)` | Changes the `placeholderNumberType` option. Example: `iti.setPlaceholderNumberType("FIXED_LINE")`.                                                                                                                                                       |
| `setDisabled(isDisabled)`   | Sets the disabled attribute of both the input field and the selected country button. Example: `iti.setDisabled(true)`.                                                                                                                                            |

### Static Methods

| Method                        | Description                                                                                                                                                                                                                                                     |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `getCountryData()`             | Retrieves the plugin's country data, which can be reused elsewhere or modified before initialization. Example: `intlTelInput.getCountryData()` returns an array of country objects.                                                                             |
| `getInstance(input)`           | After initializing the plugin, access the instance again by passing in the input element. Example: `const iti = intlTelInput.getInstance(input); iti.isValidNumber();`.                                                                                         |
| `loadUtils()`                  | Manually loads the utils.js script. Can be useful for enabling formatting/validation on demand. Returns a `Promise` that can be handled with `.then()`. Example: `intlTelInput.loadUtils("/build/js/utils.js")`.                                                 |

### Events

| Event                         | Description                                                                                                                                                                                                                                                   |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `countrychange`                | Triggered when the selected country is updated (e.g., user selects a country from the dropdown, types a new dial code, or `setCountry` is called). Example: `input.addEventListener("countrychange", () => { iti.getSelectedCountryData(); });`.               |
| `open:countrydropdown`         | Triggered when the user opens the dropdown.                                                                                                                                                                                                                    |
| `close:countrydropdown`        | Triggered when the user closes the dropdown.                                                                                                                                                                                                                   |



## Development
If you want to contribute or modify the package, follow these steps:

* Fork the repository to your own GitHub account.
* Clone your forked repository locally:

```bash
git clone https://github.com/your-username/ngx-intl-phone-field.git
```
* Run npm install to install dependencies.
* Run ng build ngx-intl-phone-field to build the project.
* Run ng serve intl-tel-demo to run the demo project and see your changes in action (if applicable).
* Make changes to the codebase.
* Test your changes thoroughly before submitting.
* Create a pull request from your fork to the original repository.
* Pass the code review and ensure your changes meet the project's contribution guidelines.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.
