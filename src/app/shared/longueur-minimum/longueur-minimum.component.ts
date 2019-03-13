import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator {
    static longueurMinimum(longueurMinimum: number): ValidatorFn {
        //Sous Angular dans les validateurs pour indiquer un succès retourner NULL
        return (c: AbstractControl): { [key: string]: boolean} | null =>{
            if(c.value != null){
                if(c.value.trim().length >= longueurMinimum ){
                    return null;
                }
            }
            

            return {'nbreCaracteresInsuffisants':true};
        };  
    }
}