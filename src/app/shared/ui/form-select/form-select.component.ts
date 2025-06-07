import { Component, inject, Input, OnInit } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { TranslatePipe } from '@ngx-translate/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

@Component({
  selector: 'sf-form-select',
  imports: [FloatLabel, Message, TranslatePipe, Select, ReactiveFormsModule],
  templateUrl: './form-select.component.html',
  styleUrl: './form-select.component.scss',
})
export class FormSelectComponent implements OnInit {
  @Input() id!: string;
  @Input() prefix!: string;
  @Input() options!: any[];
  @Input() optionLabel!: string;

  @Input() type = 'text';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() autocomplete = 'off';
  @Input() disabled = false;
  @Input() required = false;
  @Input() readonly = false;

  private controlContainer = inject(ControlContainer, { optional: true });

  ngOnInit() {
    if (this.prefix) {
      this.label = this.prefix + '.' + this.id;
    }
  }

  get formGroup(): FormGroup {
    return this.controlContainer?.control as FormGroup;
  }

  get formControl(): FormControl {
    return this.formGroup?.get(this.id) as FormControl;
  }

  getErrorMessage() {
    if (this.formControl.errors?.['required']) {
      return this.prefix + '.error.' + this.id + '.required';
    }
    if (this.formControl.errors?.['email']) {
      return this.prefix + '.error.' + this.id + '.invalid';
    }
    return '';
  }
}
