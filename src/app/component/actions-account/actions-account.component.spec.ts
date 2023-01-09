import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsAccountComponent } from './actions-account.component';

describe('ActionsAccountComponent', () => {
  let component: ActionsAccountComponent;
  let fixture: ComponentFixture<ActionsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
