import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        AngularFontAwesomeModule],

      declarations: [ ProblemeComponent ]
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
  
});
