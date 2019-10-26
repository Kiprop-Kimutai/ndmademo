import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegionsService } from '../regions.service';
import { MessagingService } from '../../../shared/messaging.service';
import { ApiResponse } from '../../../models/apiresponse';
@Component({
    selector: 'app-region-forms',
    templateUrl: './region.form.component.html',
    styleUrls: ['./region.form.component.css']
})
export class RegionFormComponent implements OnInit {
    renderForm = false;
    regionFormGroup: FormGroup;
    latitudeValue = 0;
    longitudeValue = 0;
    constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private regionsService: RegionsService,
                private messagingService: MessagingService) {}

    createRegionFormGroup() {
        this.regionFormGroup = this.fb.group({
            name: new FormControl('', [Validators.required]),
            latitude: new FormControl(0, [Validators.required]),
            longitude: new FormControl(0, [Validators.required])
        });
    }
     editRegionFormGroup() {
        this.regionFormGroup = this.fb.group(({
            name: new FormControl({value: '', disabled: true}, [Validators.required]),
            latitude: new FormControl({value: '', disabled: false}, [Validators.required]),
            longitude: new FormControl({value: 0, disabled: false}, [Validators.required]),
            id: new FormControl({value: 0, disabled: true}, [Validators.required])
        }));
    }

    cancel() {
        this.router.navigate(['/home/regions']);
    }
    onLatitudeChange(change) {
        this.latitudeValue = change.value;
    }
    onLongitudeChange(change) {
        this.longitudeValue = change.value;
    }
    addRegion() {
        console.log('adding...');
        console.log(this.regionFormGroup.getRawValue());
        this.regionsService.createRegion(this.regionFormGroup.getRawValue()).subscribe(resp => {
            console.log(resp);
            if (resp.response_status) {
                this.router.navigate(['/home/regions']);
            } else if (!resp.response_status) {
                this.messagingService.alert(`failed to create region. Error ${resp.response_message}`);
            } else {}
        });
    }
    ngOnInit() {
        this.route.params.subscribe(data => {
            if (Object.keys(data).length === 0) {
                this.createRegionFormGroup();
                this.renderForm = true;
            } else {
                this.editRegionFormGroup();
                this.regionFormGroup.patchValue(data);
                this.renderForm = true;
            }
        });
    }
}
