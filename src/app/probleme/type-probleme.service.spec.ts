import { TestBed } from '@angular/core/testing';

import { TypeProblemeService } from './type-probleme.service';

describe('TypeProblemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeProblemeService = TestBed.get(TypeProblemeService);
    expect(service).toBeTruthy();
  });
});
