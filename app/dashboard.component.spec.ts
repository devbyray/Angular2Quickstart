import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, Component} from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import {HeroService} from "./hero.service";
import {Router, RouterModule} from '@angular/router';
import {FakeHeroService} from "./fake.hero.service";
import {HeroSearchComponent} from "./hero-search.component";

@Component({selector: 'hero-search',template:''})
class EmptyComponent{}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ DashboardComponent, EmptyComponent ],
        providers: [{ provide: Router, useClass: RouterModule}, {provide: HeroService, useClass: FakeHeroService}]
      }).overrideComponent(HeroSearchComponent,EmptyComponent)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
