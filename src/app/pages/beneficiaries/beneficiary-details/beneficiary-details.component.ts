import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-beneficiary-details',
  templateUrl: './beneficiary-details.component.html',
  styleUrls: ['./beneficiary-details.component.css']
})
export class BeneficiaryDetailsComponent implements OnInit {
  beneficiaryFormGroup: FormGroup;
  beneficiaryStatus: boolean;
  constructor( private router: ActivatedRoute, private fb: FormBuilder) {
     this.createBeneficiaryFormGroup();
   }
  createBeneficiaryFormGroup() {
    this.beneficiaryFormGroup = this.fb.group({
      id: new FormControl({value: 0, disabled: true}, [Validators.required]),
      firstname: new FormControl({value: '', disabled: true }, [Validators.required]),
      middlename: new FormControl({value: '', disabled: true }, [Validators.required]),
      lastname: new FormControl({value: '', disabled: true }, [Validators.required]),
      phone: new FormControl({value: '', disabled: false}, [Validators.required]),
      idnumber: new FormControl({value: '', disabled: true }, [Validators.required]),
      county:  new FormControl({value: '', disabled: false }, [Validators.required]),
      status: new FormControl(false, [Validators.required]),
      cardnumber: new FormControl({value: '', disabled: false}, [Validators.required]),
      programvalidity: new FormControl({value: new Date(), disabled: false}, [Validators.required]),
      createdAt: new FormControl({value: new Date(), disabled: true}, [Validators.required]),
      updatedAt: new FormControl({value: new Date(), disabled: true}, [Validators.required])
    });
  }
  createAndPopulateBeneficiaryForm() {
    this.router.params.subscribe(data => { this.beneficiaryFormGroup.patchValue(data);
                                           this.beneficiaryStatus = (this.beneficiaryFormGroup.get('status').value);
                                           console.log(this.beneficiaryStatus); });
  }
  toggleBeneficiaryStatus(event: any) {
    this.beneficiaryFormGroup.get('status').setValue(event.checked);
  }
  update() {
    console.log(this.beneficiaryFormGroup.getRawValue());
  }
  ngOnInit() {
    this.createAndPopulateBeneficiaryForm();
  }

}
