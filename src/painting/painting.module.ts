import { Module } from '@nestjs/common';
import { PaintingService } from './painting.service';
import { PaintingController } from './painting.controller';
import { CosService } from './cos/cos.service';

@Module({
  controllers: [PaintingController],
  providers: [PaintingService, CosService]
})
export class PaintingModule {}
