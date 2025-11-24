import { HttpService } from '@nestjs/axios';
export declare class MatchingService {
    private readonly httpService;
    constructor(httpService: HttpService);
    callExternalMatchingService(data: any): Promise<any>;
}
