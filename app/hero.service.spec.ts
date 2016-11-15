// Straight Jasmine - no imports from Angular test libraries
import {MockBackend, MockConnection} from "@angular/http/testing";
import {TestBed, getTestBed, async, inject} from "@angular/core/testing";
import {
  Headers, BaseRequestOptions, Response, ResponseOptions, HttpModule, Http, XHRBackend, RequestMethod,
  ResponseType
} from '@angular/http';

import {Hero} from "./hero";
import {HeroService} from "./hero.service";

describe('HeroService', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }
      ],
      imports: [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));

  function SetupMockBackend() {
    let heroService: HeroService;

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.url).toBe('app/heroes');
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockRespond(new Response(
          new ResponseOptions({
              body: {"data":[
                {id: 15, name: 'Me'},
                {id: 16, name: 'You'},
                {id: 17, name: 'Him'}
              ]}
            }
          )));
      });

    heroService = getTestBed().get(HeroService);
    expect(heroService).toBeDefined();
    return heroService;
  }

  it('should get heroes', done => {
    let heroService: HeroService;

    getTestBed().compileComponents().then(() => {
      heroService = SetupMockBackend();

      heroService.getHeroes().then((heroes: Hero[]) => {
        expect(heroes.length).toBeDefined();
        expect(heroes.length).toEqual(3);
        expect(heroes[0].id).toEqual(15);
        done();
      });
    });
  });

  it('should get hero by id', done => {
    let heroService: HeroService;

    getTestBed().compileComponents().then(() => {
      heroService = SetupMockBackend();

      heroService.getHero(16).then((hero: Hero) => {
        expect(hero).toBeDefined();
        expect(hero.id).toEqual(16);
        expect(hero.name).toEqual('You');
        done();
      });
    });
  });

  it('should create hero', done => {
    let heroService: HeroService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.url).toBe('app/heroes');
          expect(connection.request.method).toBe(RequestMethod.Post);
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: {"data":{id: 18, name: 'Ralf'}},
                status: 201
              }
            )));
        });

      heroService = getTestBed().get(HeroService);
      expect(heroService).toBeDefined();

      heroService.create('Ralf').then((hero: Hero) => {
        expect(hero).toBeDefined();
        expect(hero.id).toEqual(18);
        expect(hero.name).toEqual('Ralf');
        done();
      });
    });
  });

  it('should update hero', done => {
    let heroService: HeroService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.url).toBe('app/heroes/16');
          expect(connection.request.method).toBe(RequestMethod.Put);
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: {id: 16, name: 'Ralf'},
                status: 201
              }
            )));
        });

      heroService = getTestBed().get(HeroService);
      expect(heroService).toBeDefined();

      let hero: Hero;
      hero = new Hero();
      hero.id = 16;
      hero.name = 'Ralf';
      heroService.update(hero).then((hero: Hero) => {
        expect(hero).toBeDefined();
        expect(hero.id).toEqual(16);
        expect(hero.name).toEqual('Ralf');
        done();
      });
    });
  });

  it('should delete hero', done => {
    let heroService: HeroService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.url).toBe('app/heroes/16');
          expect(connection.request.method).toBe(RequestMethod.Delete);
          connection.mockRespond(new Response(
            new ResponseOptions({
                status: 201
              }
            )));
        });

      heroService = getTestBed().get(HeroService);
      expect(heroService).toBeDefined();

      heroService.delete(16).then((ok: Boolean) => {
        expect(ok).toBe(true);
        done();
      });
    });
  });

  it('should handle http', done => {
    let heroService: HeroService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.url).toBe('app/heroes');
          expect(connection.request.method).toBe(RequestMethod.Get);
          connection.mockRespond(new Response(
            new ResponseOptions({
                status: 403
              }
            )));
        });

      heroService = getTestBed().get(HeroService);
      expect(heroService).toBeDefined();

      heroService.getHero(16).then(() => {
        fail('promise should not resolve');
        done();
      },(reason: any) => {
        expect(reason).toBeDefined();
        done();
      } );
    });
  });

  // TODO: cover other branch, handle timeouts
  it('should handle connection errors', done => {
    let heroService: HeroService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.url).toBe('app/heroes');
          expect(connection.request.method).toBe(RequestMethod.Get);
          connection.mockRespond(new Response(
            new ResponseOptions({
                status: 500
              }
            )));
        });

      heroService = getTestBed().get(HeroService);
      expect(heroService).toBeDefined();

      heroService.getHero(16).then(() => {
        fail('promise should not resolve');
        done();
      },(reason: any) => {
        expect(reason).toBeDefined();
        done();
      });
    });
  });
});
