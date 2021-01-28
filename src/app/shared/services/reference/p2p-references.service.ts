import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigService } from '../../../config';
import { PaymentReference } from '../../../sections/reference/model/payment-reference';
import { P2pReference } from '../../../sections/references/model/p2p-reference';
import { Reference } from '../../../sections/references/model/reference';
import { HttpRequestModel } from '../../model/http-request-model';
import { HttpSearchResponse } from '../../model/http-search-response';
import { filterParameters } from '../../utils/filter-params';
import { IReferencesService } from './ireferences.service';
import { SearchReferenceParams } from './model/search-reference-params';

@Injectable()
export class P2pReferencesService implements IReferencesService {
    private readonly fbManagementEndpoint = this.configService.fbManagementEndpoint;

    constructor(private http: HttpClient, private configService: ConfigService) {}

    findReferences(params?: SearchReferenceParams): Observable<HttpSearchResponse<PaymentReference | P2pReference>> {
        return this.http.get<HttpSearchResponse<PaymentReference | P2pReference>>(
            `${this.fbManagementEndpoint}/p2p/reference/filter/`,
            {
                params: filterParameters(params),
            }
        );
    }

    deleteReference(reference: P2pReference): Observable<string> {
        return this.http.delete(`${this.fbManagementEndpoint}/p2p/template/${reference.templateId}/reference`, {
            params: { identityId: reference.identityId },
            responseType: 'text',
        });
    }

    saveReferences(references: Reference[]): Observable<string[]> {
        return this.http.post<string[]>(
            `${this.fbManagementEndpoint}/p2p/template/references`,
            references,
            new HttpRequestModel()
        );
    }
}
