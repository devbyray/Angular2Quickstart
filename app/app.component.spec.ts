import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {RouterOutletStubComponent} from "./testing/router-stubs";

////////  SPECS  /////////////
describe('AppComponent', function () {
  const title: string = 'Tour of Heroes';

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, RouterOutletStubComponent ],
    })
      .compileComponents(); // compile template and css
  }));

  it('should create component', () => {
    let fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    let comp: AppComponent = fixture.componentInstance;
    expect(comp).toBeDefined()
  });

  it('should have expected title', () => {
    let fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toMatch(title, 'should contain correct title');
  });

  it('should have expected <h1> text', () => {
    let fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    let comp: AppComponent = fixture.componentInstance;
    let de: DebugElement = fixture.debugElement.query(By.css('h1'));
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch(title, '<h1> should contain correct title');
  });
});
