import { Controller, Get, Query } from '@nestjs/common';
import { EngagementQueryDto } from './dto/engagement-query.dto';
import { CpmQueryDto } from './dto/cpm-query.dto';

@Controller('metrics')
export class MetricsController {
  @Get('engagement')
  getEngagement(@Query() dto: EngagementQueryDto) {
    const rate = ((dto.likes + dto.comments) / dto.followers) * 100;
    return { rate };
  }

  @Get('cpm')
  getCpm(@Query() dto: CpmQueryDto) {
    const cpm = (dto.cost / dto.impressions) * 1000;
    return { cpm };
  }
}
