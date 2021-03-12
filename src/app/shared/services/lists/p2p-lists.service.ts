import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigService } from '../../../config';
import { ListType } from '../../constants/list-type';
import { HttpRequestModel } from '../../model/http-request-model';
import { HttpSearchResponse } from '../../model/http-search-response';
import { filterParameters } from '../../utils/filter-params';
import { IListsService } from './ilists.service';
import { CountInfoListRecord } from './model/count-info-list-record';
import { InsertListRequest } from './model/insert-list-request';
import { P2pListRecord } from './model/p2p-list-record';
import { PaymentListRecord } from './model/payment-list-record';
import { SearchListsParams } from './model/search-lists-params';

@Injectable()
export class P2pListsService implements IListsService {
    private readonly fbManagementEndpoint = this.configService.fbManagementEndpoint;

    constructor(private http: HttpClient, private configService: ConfigService) {}

    deleteListRow(id: string): Observable<string> {
        return this.http.delete(`${this.fbManagementEndpoint}/p2p/lists/${id}`, {
            responseType: 'text',
        });
    }

    findListRows(params: SearchListsParams): Observable<HttpSearchResponse<PaymentListRecord | P2pListRecord>> {
        return this.http.get<HttpSearchResponse<PaymentListRecord | P2pListRecord>>(
            `${this.fbManagementEndpoint}/p2p/lists/filter`,
            {
                params: filterParameters(params),
            }
        );
    }

    getNames(listTypeSearch: ListType): Observable<string[]> {
        return this.http.get<string[]>(`${this.fbManagementEndpoint}/p2p/lists/names`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: { listType: listTypeSearch },
        });
    }

    getAvailableListNames(): Observable<string[]> {
        return this.http.get<string[]>(`${this.fbManagementEndpoint}/p2p/lists/availableListNames`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    saveListsRows(listType: ListType, records: CountInfoListRecord[]): Observable<string[]> {
        return this.http.post<string[]>(
            `${this.fbManagementEndpoint}/p2p/lists`,
            new InsertListRequest(listType, records),
            new HttpRequestModel()
        );
    }

    saveListsRowsFromFile(listType: ListType, file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(`${this.fbManagementEndpoint}/p2p/lists/insertFromCsv/${listType}`, formData, {
            reportProgress: true,
            observe: 'events',
        });
    }
}
