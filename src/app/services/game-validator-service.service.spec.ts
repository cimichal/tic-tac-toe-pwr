import { TestBed, inject } from '@angular/core/testing';

import { GameValidatorServiceService } from './game-validator-service.service';

describe('GameValidatorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameValidatorServiceService]
    });
  });

  it('should be created', inject([GameValidatorServiceService], (service: GameValidatorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
