import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { HttpClientModule} from '@angular/common/http';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        AngularFontAwesomeModule, HttpClientModule],

      declarations: [ ProblemeComponent ],
      providers:[TypeProblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //  it('should create', () => {
  //    expect(component).toBeTruthy();
  //  });

  it('champ prénom doit être invalide avec 2 caractères', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();

  });
  it('champ prénom doit être valide avec 3 caractères', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();

  });
  it('champ prénom doit être valide avec 200 caractères', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();

  });

  it('champ prénom doit être invalide avec 0 caractères', () =>{
    let zone = component.problemeForm.get('prenom');
    let errors = {};
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();

  });

  it('champ prénom doit être invalide avec 10 espaces', () =>{
    //Préparer une variable afin de manipler le validateur
    let validator = ZonesValidator.longueurMinimum(3);
    let control = {value:'          '};
     let result = validator(control as AbstractControl);
     //Comparer le résultat avec null
     expect(result['nbreCaracteresInsuffisants']).toBe(true);

  });

  it('champ prénom doit être invalide avec 2 espaces et 1 caractères', () =>{
    //Préparer une variable afin de manipler le validateur
    let validator = ZonesValidator.longueurMinimum(3);
    let control = {value:'  a'};
     let result = validator(control as AbstractControl);
     //Comparer le résultat avec null
     expect(result['nbreCaracteresInsuffisants']).toBe(true);

  });

  it('Zone TELEPHONE est désactivée quand ne pas me notifier', () =>{
    component.appliquerNotification('aucune');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est vide quand ne pas me notifier', () =>{
    component.appliquerNotification('aucune');
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBe('');
  });

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () =>{
    component.appliquerNotification('aucune');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () =>{
    component.appliquerNotification('aucune');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est désactivée quand notifier par courriel', () =>{
    component.appliquerNotification('courriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });
  
  it('Zone ADRESSE COURRIEL est activée quand notifier par courriel', () =>{
    component.appliquerNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () =>{
    component.appliquerNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () =>{
    component.appliquerNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let errors = {};
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () =>{
    component.appliquerNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let errors = {};
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone ADRESSE COURRIEL est invalide avec un format non conforme', () =>{
    component.appliquerNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('Zone ADRESSE COURRIEL sans valeur et Zone COMFIRMER COURRIEL avec valeur valide retourne null', () =>{
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel.setValue('');
    courrielConfirmation.setValue("gab@gmail.com");
    let validator = emailMatcherValidator.courrielDifferents();
    let control = component.problemeForm.get('courrielGroup');
     let result = validator(control as AbstractControl);
     expect(result).toBeNull();

  });
  it('Zone ADRESSE COURRIEL avec valeur valide et Zone COMFIRMER COURRIEL sans valeur retourne null', () =>{
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel.setValue('gab@gmail.com');
    courrielConfirmation.setValue("");
    let validator = emailMatcherValidator.courrielDifferents();
    let control = component.problemeForm.get('courrielGroup');
     let result = validator(control as AbstractControl);
     expect(result).toBeNull();

  });
  it('Zone ADRESSE COURRIEL et Zone COMFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () =>{
    component.appliquerNotification('courriel');
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel.setValue('gab@gmail.com');
    courrielConfirmation.setValue("gab21312@gmail.com");
    let validator = emailMatcherValidator.courrielDifferents();
    let control = component.problemeForm.get('courrielGroup');
     let result = validator(control as AbstractControl);
     expect(result['match']).toBe(true);

  });

  it('Zone ADRESSE COURRIEL et Zone COMFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () =>{
    component.appliquerNotification('courriel');
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel.setValue('gab@gmail.com');
    courrielConfirmation.setValue("gab@gmail.com");
    let validator = emailMatcherValidator.courrielDifferents();
    let control = component.problemeForm.get('courrielGroup');
     let result = validator(control as AbstractControl);
     expect(result).toBeNull();

  });

  it('Zone TELEPHONE est activée quand notifier par messagerie texte', () =>{
    component.appliquerNotification('telephone');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est desactivée quand notifier par messagerie texte', () =>{
    component.appliquerNotification('telephone');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée notifier par messagerie texte', () =>{
    component.appliquerNotification('telephone');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () =>{
    component.appliquerNotification('telephone');
    let zone = component.problemeForm.get('telephone');
    let errors = {};
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () =>{
    component.appliquerNotification('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('adasd');
    let errors = {};
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () =>{
    component.appliquerNotification('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('123456789');
    let errors = {};
    errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () =>{
    component.appliquerNotification('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('1234567891');
    expect(zone.valid).toBeTruthy();
  });
});
