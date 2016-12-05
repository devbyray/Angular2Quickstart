import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, Component, Type} from '@angular/core';
import { NO_ERRORS_SCHEMA }          from '@angular/core';

import {HeroService} from "./hero.service";
import {ActivatedRoute, Params, UrlSegment, ActivatedRouteSnapshot, Data, Route} from '@angular/router';
import {FakeHeroService} from "./fake.hero.service";
import {HeroDetailComponent} from "./hero-detail.component";
import {Observable} from 'rxjs/Rx';

export class MockActivatedRoute implements ActivatedRoute{
  snapshot : ActivatedRouteSnapshot;
  url : Observable<UrlSegment[]>;
  params : Observable<Params>;
  queryParams : Observable<Params>;
  fragment : Observable<string>;
  data : Observable<Data>;
  outlet : string;
  component : Type<any>|string;
  routeConfig : Route;
  root : ActivatedRoute;
  parent : ActivatedRoute;
  firstChild : ActivatedRoute;
  children : ActivatedRoute[];
  pathFromRoot : ActivatedRoute[];
  toString() : string{
    return "";
  };
}

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let route = new MockActivatedRoute();
  route.params = Observable.of({id:"42"});

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [HeroDetailComponent],
        providers: [{provide: ActivatedRoute, useValue: route}, {provide: HeroService, useClass: FakeHeroService}],
        schemas:      [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents()
  }))

  beforeEach(() => {
        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        expect(component).toBeDefined();
        fixture.detectChanges();
  })

  it('should create component', () => {
    expect(true).toBe(true);
  })

  it('should load hero from params', () => {
    expect(component.hero.id).toEqual(42);
  })

/*  it('should navigate to clicked hero when hero is clicked', () => {
    component.gotoDetail(component.heroes[2]);
    expect(router.navigate).toHaveBeenCalledWith([ '/detail', 44 ]);
  }) */
});
