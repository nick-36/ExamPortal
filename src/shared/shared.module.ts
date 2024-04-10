// shared.module.ts

import { Module } from '@nestjs/common';
import { CurrentUserDto } from '@/shared/dto/current-user.dto'; // Import your CurrentUserDto

@Module({
  imports: [],
  providers: [],
  exports: [CurrentUserDto], // Export CurrentUserDto to make it available in other modules
})
export class SharedModule {}
