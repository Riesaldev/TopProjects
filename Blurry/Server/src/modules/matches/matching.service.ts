import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class MatchingService {
  constructor(private readonly httpService: HttpService) {}

  async callExternalMatchingService(data: any): Promise<any> {
    // Usamos firstValueFrom para convertir el Observable a Promise
    const response: AxiosResponse<any> = await firstValueFrom(
      this.httpService.post('https://api.example.com/matching', data)
    );
    
    return response.data;
  }

  // Resto de la implementación...
}