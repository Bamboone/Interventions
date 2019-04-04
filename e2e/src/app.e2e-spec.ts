import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Doit afficher le titre du formulaire Déclarer un problème', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Déclarer un problème');
  });

  it('doit activer le bouton sauvegarder avec champs valides sénario nominal', () => {
    page.setChampsValidesScenarioNominal();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', () => {
    page.setChampsValidesScenarioAlternatifParMessageTexte();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message Courriel', () => {
    page.setChampsValidesScenarioAlternatifParCourriel();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('zone DESCRIPTION DU PROBLÈME a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.setZoneDescriptionProblemeCaracteresInsuffisants();  
    expect(page.obtenirClasseZoneDescriptionProbleme()).toContain('is-invalid');
  }); 
  
  it('zone DESCRIPTION DU PROBLÈME a une bordure VERTE si nombre de caractères suffisant', () => {
    page.setZoneDescriptionProblemeCaracteresSuffisants();  
    expect(page.obtenirClasseZoneDescriptionProbleme()).toContain('is-valid');
  });  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
