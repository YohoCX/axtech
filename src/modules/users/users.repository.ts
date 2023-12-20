import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor( private prisma: PrismaService ) {
  }

  async create( params: { data: Prisma.UserCreateInput } ) {
    const { data } = params;
    return this.prisma.user.create({ data });
  }

  async getOne( params: { where?: Prisma.UserWhereInput } ) {
    const { where } = params;
    return this.prisma.user.findFirst({
      where,
      include: { posts: true, viewedPosts: { include: { post: true } } },
    });
  }

  async findMany( params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  } ) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { posts: true, viewedPosts: { include: { post: true, user: true } } },
    });
  }

  async update( params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  } ) {
    const { where, data } = params;
    return this.prisma.user.update({ where, data });
  }

  async delete( where: Prisma.UserWhereUniqueInput ) {
    return this.prisma.user.delete({ where });
  }
}