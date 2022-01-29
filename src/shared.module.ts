import { Global, Module } from '@nestjs/common';

const interfaces = [];

const services = [];

@Global()
@Module({
  imports: [],
  controllers: [...interfaces, ...services],
  providers: [...interfaces, ...services]
})
export class SharedModule {}
