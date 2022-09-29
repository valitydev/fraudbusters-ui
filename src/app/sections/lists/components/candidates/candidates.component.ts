import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '../../../../config';
import { SortOrder } from '../../../../shared/constants/sort-order';
import { LAYOUT_GAP_M } from '../../../../tokens';
import { FetchCandidatesService } from './services/fetch-candidates.service';

@Component({
    templateUrl: './candidates.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchCandidatesService],
})
export class CandidatesComponent {
    candidates$ = this.fetchCandidatesService.searchResult$;
    inProgress$ = this.fetchCandidatesService.inProgress$;
    hasMore$ = this.fetchCandidatesService.hasMore$;

    private SIZE = this.configService.pageSize;

    constructor(
        private router: Router,
        private fetchCandidatesService: FetchCandidatesService,
        private configService: ConfigService,
        @Inject(LAYOUT_GAP_M) public layoutGapM: string
    ) {}

    search(searchValue: string) {
        this.fetchCandidatesService.search({ sortOrder: SortOrder.Desc, searchValue, size: this.SIZE });
    }

    goToApproveCandidates(id: string) {
        this.router.navigate([`candidates/${id}`]);
    }

    removeListCandidates(id: string) {
        // this.fetchGroupsService.search({ searchValue });
    }

    fetchMore() {
        // this.fetchGroupsService.fetchMore();
    }
}
