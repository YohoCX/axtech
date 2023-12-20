import { Global, Module } from '@nestjs/common';
import { ConsumerJwtService } from './consumer-jwt.service';

@Global()
@Module({
  providers: [ ConsumerJwtService ],
  exports: [ ConsumerJwtService ],
})
export class ConsumerJwtModule {
}
