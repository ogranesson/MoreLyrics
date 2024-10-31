import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CanComponentDeactivate, deactivateGuard } from './deactivate.guard';

describe('deactivateGuard', () => {
  // Define mocks for ActivatedRouteSnapshot and RouterStateSnapshot
  const mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
  const mockRouterStateSnapshot = {} as RouterStateSnapshot;

  // Provide all required parameters to deactivateGuard
  const executeGuard: CanDeactivateFn<CanComponentDeactivate> = (
    component: CanComponentDeactivate,
    currentRoute = mockActivatedRouteSnapshot,
    currentState = mockRouterStateSnapshot,
    nextState = mockRouterStateSnapshot
  ) => TestBed.runInInjectionContext(() =>
    deactivateGuard(component, currentRoute, currentState, nextState)
  );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
