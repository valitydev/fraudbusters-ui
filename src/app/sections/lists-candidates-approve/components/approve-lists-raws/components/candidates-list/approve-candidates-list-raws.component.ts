import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';

import { LAYOUT_GAP_M } from '../../../../../../tokens';
import { FetchCandidatesRecordService } from './services/fetch-candidates-record.service';
import { SortOrder } from '../../../../../../shared/constants/sort-order';
import { ConfigService } from '../../../../../../config';
import { WbListRecord } from '../../../../../../api/fb-management/swagger-codegen/model/wbListRecord';

@Component({
    selector: 'fb-approve-candidates-list-raws',
    templateUrl: 'approve-candidates-list-raws.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchCandidatesRecordService],
})
export class ApproveCandidatesListRawsComponent {
    candidates$ = this.fetchCandidatesRecordService.searchResult$;
    inProgress$ = this.fetchCandidatesRecordService.inProgress$;
    hasMore$ = this.fetchCandidatesRecordService.hasMore$;

    @Output()
    approveItem = new EventEmitter<WbListRecord>();

    private SIZE = this.configService.pageSize;

    constructor(
        private fetchCandidatesRecordService: FetchCandidatesRecordService,
        private configService: ConfigService,
        @Inject(LAYOUT_GAP_M) public layoutGapM: string
    ) {}

    search(searchValue: string) {
        this.fetchCandidatesRecordService.search({ sortOrder: SortOrder.Desc, searchValue, size: this.SIZE });
    }

    approveCandidates() {}

    fetchMore() {}
}
