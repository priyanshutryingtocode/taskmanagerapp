import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taskmanager } from './taskmanager';

describe('Taskmanager', () => {
  let component: Taskmanager;
  let fixture: ComponentFixture<Taskmanager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taskmanager],
    }).compileComponents();

    fixture = TestBed.createComponent(Taskmanager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
