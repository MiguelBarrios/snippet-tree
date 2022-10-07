import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetDisplayComponent } from './snippet-display.component';

describe('SnippetDisplayComponent', () => {
  let component: SnippetDisplayComponent;
  let fixture: ComponentFixture<SnippetDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnippetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
