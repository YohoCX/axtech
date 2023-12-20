import { JwtPayload } from 'jsonwebtoken'

export interface IConsumerJwtPayload extends JwtPayload {
  id: number
}
