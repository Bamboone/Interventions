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
      typeProbleme: ['',[Validators.required]]


    });
  
      this.typeProbleme.obtenirTypeProbleme()
      .subscribe(prob => this.typeProblemeClient = prob,
                 error => this.errorMessage = <any>error);  
  
  }

}
