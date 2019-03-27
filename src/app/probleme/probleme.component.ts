import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typeProblemeClient: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private typeProbleme: TypeProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['',[ Validators.required, ZonesValidator.longueurMinimum(3)]],
      nom: ['',[ Validators.required, ZonesValidator.longueurMaximum(50)]],
      typeProbleme: ['',[Validators.required]],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
        }),
       telephone: [{value: '', disabled: true}], 
       


    });
  
      this.typeProbleme.obtenirTypeProbleme()
      .subscribe(prob => this.typeProblemeClient = prob,
                 error => this.errorMessage = <any>error);  
  
  }

  appliquerNotification(notification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    courrielControl.disable();
    courrielControl.clearValidators();
    courrielControl.reset();
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    courrielConfirmationControl.disable();
    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    const telephoneControl = this.problemeForm.get('telephone');
    telephoneControl.disable();
    telephoneControl.reset();
    telephoneControl.clearValidators();

    if(notification === 'courriel'){
      courrielControl.enable();
      courrielConfirmationControl.enable();
      telephoneControl.disable();
      courrielControl.setValidators([Validators.required]);
      courrielConfirmationControl.setValidators([Validators.required]);
    }else if(notification === 'telephone'){
      courrielControl.disable();
      courrielConfirmationControl.disable();
      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required]);
    }else if(notification === 'aucune'){
      courrielControl.disable();
      courrielConfirmationControl.disable();
      telephoneControl.disable();
      telephoneControl.setValue('');
    }
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }
}
