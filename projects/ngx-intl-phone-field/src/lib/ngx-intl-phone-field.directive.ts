import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import intlTelInput, { SomeOptions } from 'intl-tel-input';

@Directive({
  selector: '[ngxIntlPhoneField]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NgxIntlPhoneField,
      multi: true,
    },
  ],
})
export class NgxIntlPhoneField implements AfterViewInit {
  @Input() public ngxIntlPhoneFieldParams: SomeOptions = {};

  private defaultOptions: SomeOptions = {
    initialCountry: '',
    allowDropdown: true,
    autoPlaceholder: 'polite',
    containerClass: '',
    countryOrder: [],
    countrySearch: true,
    customPlaceholder: null,
    dropdownContainer: null,
    excludeCountries: [],
    fixDropdownWidth: true,
    formatAsYouType: true,
    formatOnDisplay: true,
    geoIpLookup: null,
    hiddenInput: null,
    i18n: {},
    loadUtilsOnInit: '',
    nationalMode: true,
    onlyCountries: [],
    placeholderNumberType: 'MOBILE',
    showFlags: true,
    separateDialCode: false,
    strictMode: false,
    useFullscreenPopup: /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 500 || false,
    // @ts-ignore
    utilsScript: this.utilsScript || (async () => await import(/* webpackIgnore: true *//* @vite-ignore */ 'intl-tel-input/utils') ),
    validationNumberType: 'MOBILE',
  };

  private onTouched: () => void = () => {};
  private onChange: (value: any) => void = () => {};
  
  constructor(private el: ElementRef) {}

  public ngAfterViewInit(): void {
    const instance = intlTelInput(this.el.nativeElement, {
      ...this.defaultOptions,
      ...this.ngxIntlPhoneFieldParams,
    });

    this.el.nativeElement.addEventListener('input', () => {
      this.onChange({
        isValidNumber: instance.isValidNumber(),
        isValidNumberPrecise: instance.isValidNumberPrecise(),
        number: instance.getNumber(),
        numberType: instance.getNumberType(),
        countryData: instance.getSelectedCountryData(),
        validationError: instance.getValidationError(),
        extension: instance.getExtension(),
      });
    });
  }

  public writeValue(value: any): void {
    if (value) {
      this.el.nativeElement.value = value;
    }
  }
  
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  public setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}
