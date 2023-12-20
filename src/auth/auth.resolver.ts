import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignInModel } from './dto/sign-in.model';

@Resolver()
export class AuthResolver {
  constructor( private readonly authService: AuthService ) {
  }

  @Mutation(() => SignInModel)
  async signIn( @Args('signIn') signIn: SignInDto ) {
    return await this.authService.signIn(signIn);
  }
}