import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import intlTelInput, { SomeOptions } from 'intl-tel-input';

@Directive({
  selector: '[ngxIntlPhoneField]',
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
  
  constructor(private el: ElementRef) {}

  public ngAfterViewInit(): void {
      intlTelInput(this.el.nativeElement, {
        ...this.defaultOptions,
        ...this.ngxIntlPhoneFieldParams,
      });
  }
}
