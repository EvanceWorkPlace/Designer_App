import { TestBed } from '@angular/core/testing';

import { Design } from './design';

describe('Design', () => {
  let service: Design;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Design);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
