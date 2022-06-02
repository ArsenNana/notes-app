import { TestBed } from '@angular/core/testing';

import { AauthService } from './auth-service';

describe('AuthService', () => {
  let service: AauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
