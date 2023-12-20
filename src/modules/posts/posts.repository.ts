import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsRepository {
  constructor( private readonly prisma: PrismaService ) {
  }

  async create( params: { data: Prisma.PostCreateInput } ) {
    const { data } = params;
    return this.prisma.post.create({ data });
  }

  async getOne( params: { where?: Prisma.PostWhereInput } ) {
    const { where } = params;
    return this.prisma.post.findFirst({
      where,
      include: { postViews: { include: { user: true } }, author: true },
    });
  }

  async findMany( params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  } ) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { postViews: { include: { user: true } }, author: true }
    });
  }

  async delete( where: Prisma.PostWhereUniqueInput ) {
    return this.prisma.post.delete({ where });
  }
}