import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './model/user.model';
import { GetUserArgs } from './dto/get-user.args';
import { ListUsersArgs } from './dto/list-users.args';
import { GuardWithMetadata } from '../../auth/auth.guard';
import { UserCreateInput } from './dto/user-create.input';
import { UserUpdateInput } from './dto/user-update.input';

@GuardWithMetadata('admin')
@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Query(() => UserModel, { name: 'user', nullable: false })
  async getUser( @Args() getUserArgs: GetUserArgs ): Promise<UserModel> {
    return await this.usersService.getUser(getUserArgs);
  }

  @Query(() => [ UserModel ], { name: 'users', nullable: false })
  async getUsers( @Args() listUsersArgs: ListUsersArgs ): Promise<UserModel[]> {
    return this.usersService.getUsers(listUsersArgs);
  }

  @Mutation(() => UserModel, { name: 'createUser', nullable: false })
  async createUser( @Args('data') data: UserCreateInput ): Promise<UserModel> {
    return this.usersService.create(data);
  }

  @Mutation(() => UserModel, { name: 'updateUser', nullable: false })
  async updateUser( @Args('data') data: UserUpdateInput ): Promise<UserModel> {
    return this.usersService.update(data);
  }

  @Mutation(() => UserModel, { name: 'deleteUser', nullable: false })
  async deleteUser( @Args('id') id: number ): Promise<UserModel> {
    return this.usersService.delete(id);
  }
}
