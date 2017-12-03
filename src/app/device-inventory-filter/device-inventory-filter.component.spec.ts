import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInventoryFilterComponent } from './device-inventory-filter.component';

describe('DeviceInventoryFilterComponent', () => {
  let component: DeviceInventoryFilterComponent;
  let fixture: ComponentFixture<DeviceInventoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInventoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInventoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
