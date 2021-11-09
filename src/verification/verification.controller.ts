import { Controller, Headers, Post, Query, Res } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { Response } from "express";
import { VerificationService } from "./verification.service";

@Controller('lab-verification')
export class VerificationController {
  constructor(
    private readonly verificationService: VerificationService
  ) {}
  
  @Post()
  @ApiQuery({ name: 'acount_id'})
  @ApiQuery({ name: 'verification_status', enum: [
    'Unverified',
    'Verified',
    'Rejected',
    'Revoked'
  ]})
  async updateStatusLab(
    @Headers('debio-api-key') debioApiKey: string,
    @Res() response: Response,
    @Query('acount_id') acount_id: string,
    @Query('verification_status') verification_status: string
    ) {
    try {
      if (debioApiKey != process.env.DEBIO_API_KEY) {
        return response.status(401).send('debio-api-key header is required');
      }
      await this.verificationService.vericationLab(acount_id,verification_status)
      let isVerified = ''
      if(verification_status === 'Verified'){
        isVerified = ', and Got Reward 2 DBIO'
      }
      return response.status(200).send(`Lab ${acount_id} ${verification_status}${isVerified}`)
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}