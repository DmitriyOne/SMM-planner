import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PostEntity implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false, nullable: true })
  image: string;

  @ApiProperty()
  isPublish: boolean;

  @ApiProperty({ required: false, nullable: true })
  isApproved: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
