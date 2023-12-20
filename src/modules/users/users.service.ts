import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateInput } from './dto/user-create.input';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserUpdateInput } from './dto/user-update.input';
import { GetUserArgs } from './dto/get-user.args';
import { ListUsersArgs } from './dto/list-users.args';

@Injectable()
export class UsersService {
  constructor( private repository: UsersRepository, private readonly configService: ConfigService ) {
  }

  async getUser( data: GetUserArgs ) {
    return this.repository.getOne({
      where:
        {
          id: data.id,
        },
    });
  }

  async getUsers( listUsersArgs: ListUsersArgs ) {
    return this.repository.findMany({
      skip: listUsersArgs.offset,
      take: listUsersArgs.limit,
      where: {
        role: listUsersArgs.role,
        email: listUsersArgs.email,
      },
    });
  }

  async create( data: UserCreateInput ) {
    const hashedPassword = await bcrypt.hash(data.password, Number(this.configService.get('SALT_ROUNDS')));

    return this.repository.create({ data: { ...data, password: hashedPassword } });
  }

  async update( params: UserUpdateInput ) {
    return this.repository.update({ where: { id: params.id }, data: params });
  }

  async delete( id: number ) {
    return this.repository.delete({ id: id });
  }
}
