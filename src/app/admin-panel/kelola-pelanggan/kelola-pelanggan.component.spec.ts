import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KelolaPelangganComponent } from './kelola-pelanggan.component';

describe('KelolaPelangganComponent', () => {
  let component: KelolaPelangganComponent;
  let fixture: ComponentFixture<KelolaPelangganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KelolaPelangganComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KelolaPelangganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
