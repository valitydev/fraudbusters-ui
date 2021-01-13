import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigService } from '../../../config';
import { GroupReferenceModel } from '../../../sections/groups-reference/model/groups-reference';
import { GroupsReferenceResponse } from '../../../sections/groups-reference/model/groups-reference-response';
import { P2pGroupReferenceModel } from '../../../sections/groups-reference/model/p2p-groups-reference';
import { HttpRequestModel } from '../../model/http-request-model';
import { SearchParams } from '../../model/search-params';
import { ParamsUtilService } from '../utils/params-util.service';
import { IGroupsReferenceService } from './igroups-reference.service';

@Injectable()
export class P2pGroupsReferenceService implements IGroupsReferenceService {
    private readonly fbManagementEndpoint = this.configService.fbManagementEndpoint;

    constructor(
        private http: HttpClient,
        private paramsUtilService: ParamsUtilService,
        private configService: ConfigService
    ) {}

    findGroups(params?: SearchParams): Observable<GroupsReferenceResponse> {
        return this.http.get<GroupsReferenceResponse>(`${this.fbManagementEndpoint}/p2p/group/reference/filter`, {
            params: this.paramsUtilService.filterParameters(params),
        });
    }

    deleteGroupReference(reference: P2pGroupReferenceModel): Observable<string> {
        return this.http.delete(`${this.fbManagementEndpoint}/p2p/group/${reference.groupId}/reference`, {
            params: { identityId: reference.identityId },
            responseType: 'text',
        });
    }

    saveGroupReference(groupReferenceModels: GroupReferenceModel[]): Observable<string[]> {
        return this.http.post<string[]>(
            `${this.fbManagementEndpoint}/p2p/group/${groupReferenceModels[0].groupId}/reference`,
            groupReferenceModels,
            new HttpRequestModel()
        );
    }
}
