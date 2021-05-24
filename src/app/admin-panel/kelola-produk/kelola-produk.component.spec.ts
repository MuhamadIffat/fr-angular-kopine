import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KelolaProdukComponent } from './kelola-produk.component';

describe('KelolaProdukComponent', () => {
  let component: KelolaProdukComponent;
  let fixture: ComponentFixture<KelolaProdukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KelolaProdukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KelolaProdukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
