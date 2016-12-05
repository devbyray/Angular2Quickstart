import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, Component} from '@angular/core';

import {HeroesComponent} from './heroes.component';
import {HeroService} from "./hero.service";
import {Router, RouterModule} from '@angular/router';
import {FakeHeroService} from "./fake.hero.service";
import {Hero} from "./hero";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }


  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ HeroesComponent ],
        providers: [{provide: Router, useValue: router}, {provide: HeroService, useClass: FakeHeroService}]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load all heroes for hero list', () => {
    expect(component.heroes.length).toEqual(6);
  })

  it('should navigate to clicked hero when hero is clicked', () => {
    component.selectedHero = new Hero(42,'Test');
    component.gotoDetail();
    expect(router.navigate).toHaveBeenCalledWith([ '/detail', 42 ]);
  })

  it('should add a hero if name is given', () => {
    expect(component.heroes.length).toEqual(6);
    component.add('Nobody');
    expect(component.heroes.length).toEqual(7);
    expect(component.heroes[6].name).toEqual('Nobody');
  })

  it('should not add empty hero if empty name is given', () => {
    expect(component.heroes.length).toEqual(6);
    component.add('');
    expect(component.heroes.length).toEqual(6);
  })

  it('should delete hero', () => {
    expect(component.heroes.length).toEqual(6);
    component.selectedHero = component.heroes[2];
    component.delete(component.selectedHero);
    expect(component.heroes.length).toEqual(5);
    expect(component.selectedHero).toEqual(null);
  })

  it('should save selected hero on selection', () => {
    component.onSelect(component.heroes[1]);
    expect(component.selectedHero.id).toEqual(42);
  })
});
