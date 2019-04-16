import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typeProblemeClient: ITypeProbleme[];
  errorMessage: string;

  probleme: IProbleme;
  messageSauvegarde: string;

  constructor(private fb: FormBuilder, private typeProbleme: TypeProblemeService, private problemeService: ProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['',[ Validators.required, ZonesValidator.longueurMinimum(3)]],
      nom: ['',[ Validators.required, ZonesValidator.longueurMaximum(50)]],
      typeProbleme: ['',[Validators.required]],
      notification:['aucune'],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
        }),
       telephone: [{value: '', disabled: true}], 
       descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
       noUnite: '',
       date: {value: Date(), disabled: true} 
       
    });
  
      this.typeProbleme.obtenirTypeProbleme()
      .subscribe(prob => this.typeProblemeClient = prob,
                 error => this.errorMessage = <any>error);  
      this.problemeForm.get('notification').valueChanges.subscribe(value=>this.appliquerNotification(value));
  }

  appliquerNotification(notification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    courrielControl.disable();
    courrielControl.clearValidators();
    courrielControl.reset();
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    courrielConfirmationControl.disable();
    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielGroupControl.clearValidators();
    const telephoneControl = this.problemeForm.get('telephone');
    telephoneControl.disable();
    telephoneControl.reset();
    telephoneControl.clearValidators();

    if(notification === 'courriel'){
      courrielControl.enable();
      courrielConfirmationControl.enable();
      telephoneControl.disable();
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
    }else if(notification === 'telephone'){
      courrielControl.disable();
      courrielConfirmationControl.disable();
      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)],);
    }else if(notification === 'aucune'){
      courrielControl.disable();
      courrielConfirmationControl.disable();
      telephoneControl.disable();
      telephoneControl.setValue('');
    }
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
         this.probleme = this.problemeForm.value;
         // Affecter les valeurs qui proviennent du fg le plus interne.
         this.probleme.courriel =  this.problemeForm.get('courrielGroup.courriel').value;
         this.probleme.courrielConfirmation =  this.problemeForm.get('courrielGroup.courrielConfirmation').value;      
         this.probleme.date = new Date();
        this.problemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );

            console.log(this.probleme);
    } 
  }
  
  onSaveComplete(): void {
    this.problemeForm.reset(); 
    this.problemeForm.get('date').setValue(new Date()); 
    this.problemeForm.get('notification').setValue('aucune'); // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.messageSauvegarde = 'Votre demande a bien été sauvegardée.  Nous vous remercions.';
  }

}
