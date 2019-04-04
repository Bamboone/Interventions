import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme');
  }

  getTitleText() {
    return element(by.css('Inter-root h5')).getText() as Promise<string>;
  }

  setChampsValidesScenarioNominal() : void {
    element(by.id('prenomId')).clear();
    element(by.id('nomId')).clear();
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('typeProbleme')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element(by.id('aucuneId')).click();
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 

   setChampsValidesScenarioAlternatifParMessageTexte() : void {
    element(by.id('prenomId')).clear();
    element(by.id('nomId')).clear();
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('typeProbleme')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element(by.id('notifTelephoneId')).click();
    element(by.id('telephoneId')).sendKeys('5141231234');
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 

   setChampsValidesScenarioAlternatifParCourriel() : void {
    element(by.id('prenomId')).clear();
    element(by.id('nomId')).clear();
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('typeProbleme')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element(by.id('notifCourrielId')).click();
    element(by.id('courrielId')).sendKeys('aa@bbb.com');
    element(by.id('confirmationCourrielId')).sendKeys('aa@bbb.com');
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 

   setZoneDescriptionProblemeCaracteresInsuffisants() : void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('x');
   }

   setZoneDescriptionProblemeCaracteresSuffisants() : void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('xxxxxxxxxxxx');
   }

   obtenirClasseZoneDescriptionProbleme()   { 
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  } 

   boutonSubmit() : ElementFinder {
     return element(by.buttonText('Sauvegarder'));
   }
   
}
