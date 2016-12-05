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
  heroes: Hero[];
  data: any;
  error: any;

  private loadHeroes() {
    if(this.heroes == undefined) {
      this.heroes = HEROES.map(h => h.clone());
    }
  }

  getHeroes() {
    this.loadHeroes();
    this.data = this.heroes.map(h => h.clone());
    return this;
  }

  then(callback: any) {
    if (!this.error) {
      callback(this.data);
    }
    return this;
  }

  catch(callback: any) {
    if (this.error) {
      callback(this.error);
    }
  }

  setError(error: any) {
    this.error = error;
  }

  handleError(error: any): Promise<any> {
    return undefined;
  }

  create(name: string) {
    this.loadHeroes();
    var hero = new Hero(99, name);
    this.heroes.push(hero);
    this.data = hero;
    return this;
  }

  delete(id: number) {
    this.loadHeroes();
    var index = this.heroes.indexOf(this.heroes.find(x => x.id == id), 0);
    if (index > -1) {
      this.heroes.splice(index, 1);
      this.data = true;
    }
    else
    {
      this.data = false;
    }
    return this;
  }

  update(hero: Hero): Promise<Hero> {
    return undefined;
  }

  lastPromise: Promise<any>;  // remember so we can spy on promise calls

  getHero(id: number | string) {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    this.loadHeroes();
    let hero = this.heroes.find(h => h.id === id);
    this.data = hero;
    return this;
  }

  getHeroesOld() {
    return this.lastPromise = Promise.resolve<Hero[]>(this.data);
  }

  /*
  updateHero(hero: Hero): Promise<Hero> {
    return this.lastPromise = this.getHero(hero.id).then(h => {
      return h ?
        Object.assign(h, hero) :
        Promise.reject(`Hero ${hero.id} not found`) as any as Promise<Hero>;
    });
  }
  */
}
