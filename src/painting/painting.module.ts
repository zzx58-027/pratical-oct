import { Module } from '@nestjs/common';
import { PaintingService } from './painting.service';
import { PaintingController } from './painting.controller';
import { CosNodeService } from './cos/cos_node.service';

@Module({
  imports: [],
  controllers: [PaintingController],
  providers: [PaintingService, CosNodeService]
})
export class PaintingModule {}
