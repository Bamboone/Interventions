import { ZonesValidator } from "./longueur-minimum.component";
import { AbstractControl } from '@angular/forms';

describe('Zones Validator', () => {

    it('champ prénom doit être invalide avec 10 espaces', () =>{
        //Préparer une variable afin de manipler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value:'          '};
         let result = validator(control as AbstractControl);
         //Comparer le résultat avec null
         expect(result['nbreCaracteresInsuffisants']).toBe(true);
    
    });

    it('champ prénom doit être valide avec des mots', () =>{
        //Préparer une variable afin de manipler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: 'Vive angular'};
         let result = validator(control as AbstractControl);
         //Comparer le résultat avec null
         expect(result).toBeNull();
    
      });

    it('champ prénom doit être valide avec 3 espaces, des mots et 3 espaces', () =>{
        //Préparer une variable afin de manipler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: '   je le veux   '};
         let result = validator(control as AbstractControl);
         //Comparer le résultat avec null
         expect(result).toBeNull();
    
    });

    it('champ prénom doit être valide avec 1 espaces et deux caractères', () =>{
        //Préparer une variable afin de manipler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: ' xx'};
         let result = validator(control as AbstractControl);
         //Comparer le résultat avec null
         expect(result['nbreCaracteresInsuffisants']).toBe(true);
    
    });

    it('champ prénom doit être valide avec 2 espaces et 1 caractères', () =>{
        //Préparer une variable afin de manipler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: '  x'};
         let result = validator(control as AbstractControl);
         //Comparer le résultat avec null
         expect(result['nbreCaracteresInsuffisants']).toBe(true);
    
    });

    it('champ prénom doit être valide avec 3 espaces et 3 caractères', () =>{
        //Préparer une variable afin de manipler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: '   xxx'};
         let result = validator(control as AbstractControl);
         //Comparer le résultat avec null
         expect(result).toBeNull();
    
    });

    it('champ prénom doit être valide avec 5 espaces, 5 caractères et 5 espaces', () =>{
        //Préparer une variable afin de manipler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: '   xxxxx   '};
         let result = validator(control as AbstractControl);
         //Comparer le résultat avec null
         expect(result).toBeNull();
    
    });

    it('champ prénom doit être invalide avec valeur null', () =>{
        //Préparer une variable afin de manipler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value:null};
         let result = validator(control as AbstractControl);
         //Comparer le résultat avec null
         expect(result['nbreCaracteresInsuffisants']).toBe(true);
    
    });

});