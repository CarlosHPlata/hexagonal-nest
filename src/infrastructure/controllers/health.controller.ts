import { Controller, Get, Logger, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('/health')
@ApiTags('health')
export class HealthController {
  private readonly logger = new Logger();

  @Get()
  testHealth(@Res() res: Response): void {
    try {
      res.status(200).send({ message: 'ok' });
    } catch (ex) {
      this.logger.error(ex);
      res.status(400).send(ex);
    }
  }
}
