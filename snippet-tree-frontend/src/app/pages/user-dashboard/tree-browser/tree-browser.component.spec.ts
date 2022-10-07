import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeBrowserComponent } from './tree-browser.component';

describe('TreeBrowserComponent', () => {
  let component: TreeBrowserComponent;
  let fixture: ComponentFixture<TreeBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeBrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
