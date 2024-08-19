import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateOrEditDialogComponent } from './user-create-or-edit-dialog.component';

describe('UserCreateOrEditDialogComponent', () => {
  let component: UserCreateOrEditDialogComponent;
  let fixture: ComponentFixture<UserCreateOrEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreateOrEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCreateOrEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
