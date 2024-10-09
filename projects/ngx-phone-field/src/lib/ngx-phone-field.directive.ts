import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import intlTelInput, { SomeOptions } from 'intl-tel-input';

@Directive({
  selector: '[ngxPhoneField]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NgxPhoneField,
      multi: true,
    },
  ],
})
export class NgxPhoneField implements AfterViewInit, OnDestroy {
  @Input() public ngxPhoneFieldParams: SomeOptions = {};

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
  private instance!: { destroy: () => void };
  private inputListener!: EventListener;

  private onTouched: () => void = () => {};
  private onChange: (value: any) => void = () => {};
  
  constructor(private el: ElementRef) {}

  public ngAfterViewInit(): void {
    this.instance = intlTelInput(this.el.nativeElement, {
      ...this.defaultOptions,
      ...this.ngxPhoneFieldParams,
    });

    this.inputListener = () => {
      this.onChange(this.instance);
    }

    this.el.nativeElement.addEventListener('input', this.inputListener);
  }

  public ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener('input', this.inputListener);

    if (this.instance) {
      this.instance.destroy();
    }
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
