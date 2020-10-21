import { Injectable } from '@angular/core';
import { IReferencesService } from './ireferences.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/config.service';
import { Observable } from 'rxjs';
import { SearchReferenceParams } from './model/SearchReferenceParams';
import { ParamsUtilService } from '../utils/params-util.service';
import { ReferencesResponse } from '../../../references/model/references-response';
import { HttpRequestModel } from '../../model/HttpRequestModel';
import { PaymentReference } from '../../../references/model/payment-reference';
import { Reference } from '../../../references/model/reference';

@Injectable({
    providedIn: 'root',
})
export class PaymentReferencesService implements IReferencesService {
    private readonly fbManagementEndpoint: string;

    constructor(private http: HttpClient, private paramsUtilService: ParamsUtilService, configService: ConfigService) {
        this.fbManagementEndpoint = configService.config.fbManagementEndpoint;
    }

    findReferences(params?: SearchReferenceParams): Observable<ReferencesResponse> {
        return this.http.get<ReferencesResponse>(`${this.fbManagementEndpoint}/reference/filter/`, {
            params: this.paramsUtilService.filterParameters(params),
        });
    }

    deleteReference(reference: PaymentReference): Observable<string> {
        return this.http.delete<string>(`${this.fbManagementEndpoint}/template/${reference.templateId}/reference`, {
            params: { shopId: reference.shopId, partyId: reference.partyId },
        });
    }

    saveReference(reference: Reference): Observable<string> {
        return this.http.post<string>(
            `${this.fbManagementEndpoint}/template/${reference.templateId}/reference`,
            reference,
            new HttpRequestModel()
        );
    }
}
