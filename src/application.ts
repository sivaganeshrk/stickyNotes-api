import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {AjvFormat, RestApplication, RestTags} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {JWTStrategy} from './authentication/jwt';
import {MySequence} from './sequence';
import {JWTService} from './services/jwt.service';
import {
  stringNumberAndSomeSpecialValidation,
  uuidValidation,
} from './validation';

export {ApplicationConfig};

export class StickyNotesApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);
    this.bind('services.jwt.service').toClass(JWTService);
    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JWTStrategy);

    // uuid validation
    this.bind<AjvFormat>(`ajv.formats.${uuidValidation.name}`)
      .to(uuidValidation)
      .tag(RestTags.AJV_FORMAT);

    // String Number And '",._ - Validation
    this.bind<AjvFormat>(
      `ajv.formats.${stringNumberAndSomeSpecialValidation.name}`,
    )
      .to(stringNumberAndSomeSpecialValidation)
      .tag(RestTags.AJV_FORMAT);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
