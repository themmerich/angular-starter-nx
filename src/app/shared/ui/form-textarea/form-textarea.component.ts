import { Component, inject, Input, OnInit } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { TranslatePipe } from '@ngx-translate/core';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'sf-form-textarea',
  imports: [FloatLabel, FormsModule, Message, TranslatePipe, ReactiveFormsModule, Textarea],
  templateUrl: './form-textarea.component.html',
  styleUrl: './form-textarea.component.scss',
})
export class FormTextareaComponent implements OnInit {
  @Input() id!: string;
  @Input() prefix!: string;

  @Input() rows = 5;
  @Input() cols = 30;
  @Input() label = '';
  @Input() placeholder = '';
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
