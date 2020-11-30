import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormCreationService } from 'src/app/core/services/formCreation.service';
import * as globalConst from '../../../core/services/globalConstants';

@Component({
  selector: 'app-person-detail-form',
  templateUrl: './person-detail-form.component.html',
  styleUrls: ['./person-detail-form.component.scss']
})
export class PersonDetailFormComponent implements OnInit {

  @Input() personalDetailsForm: FormGroup;
  gender = globalConst.gender;
  primaryApplicantLastName: string;
  readonly dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(private formCreationService: FormCreationService) { }

  ngOnInit(): void {
    this.formCreationService.getPeronalDetailsForm().subscribe(
      personalDetails => {
        this.primaryApplicantLastName = personalDetails.get('lastName').value;
      }
    );
  }

 /**
  * Returns the control of the form
  */
  get personalFormControl(): { [key: string]: AbstractControl; } {
    return this.personalDetailsForm.controls;
  }

  sameLastNameEvent(event: MatCheckboxChange): void {
    if(event.checked) {
      this.personalDetailsForm.get('lastName').setValue(this.primaryApplicantLastName)
    } else {
      this.personalDetailsForm.get('lastName').setValue("")
    }
  }

}
