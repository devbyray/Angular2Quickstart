// re-export for tester convenience
import {Headers, Http} from "@angular/http";
import { Hero }        from './hero';
import {Observable} from "rxjs";

export var HEROES: Hero[] = [
  new Hero(41, 'Bob'),
  new Hero(42, 'Carol'),
  new Hero(43, 'Ted'),
  new Hero(44, 'Alice'),
  new Hero(45, 'Speedy'),
  new Hero(46, 'Stealthy')
];

export class FakeHeroSearchService {
  http: Http;

  search(term: string): Observable<Hero[]> {
    return undefined;  }
}

export class FakeHeroService {
  heroesUrl: string;
  headers: Headers;
  http: Http;

  handleError(error: any): Promise<any> {
    return undefined;
  }

  create(name: string): Promise<Hero> {
    return undefined;
  }

  delete(id: number): Promise<boolean> {
    return undefined;
  }

  update(hero: Hero): Promise<Hero> {
    return undefined;
  }

  heroes = HEROES.map(h => h.clone());
  lastPromise: Promise<any>;  // remember so we can spy on promise calls

  getHero(id: number | string) {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    let hero = this.heroes.find(h => h.id === id);
    return this.lastPromise = Promise.resolve(hero);
  }

  getHeroes() {
    return this.lastPromise = Promise.resolve<Hero[]>(this.heroes);
  }

  updateHero(hero: Hero): Promise<Hero> {
    return this.lastPromise = this.getHero(hero.id).then(h => {
      return h ?
        Object.assign(h, hero) :
        Promise.reject(`Hero ${hero.id} not found`) as any as Promise<Hero>;
    });
  }
}
