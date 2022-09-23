import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FetchCandidatesService } from './services/fetch-candidates.service';
import { LAYOUT_GAP_M } from '../../../../tokens';
import { Router } from '@angular/router';
import { SortOrder } from '../../../../shared/constants/sort-order';

@Component({
    templateUrl: './candidates.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchCandidatesService],
})
export class CandidatesComponent {
    candidates$ = this.fetchCandidatesService.searchResult$;
    inProgress$ = this.fetchCandidatesService.inProgress$;
    hasMore$ = this.fetchCandidatesService.hasMore$;

    constructor(
        private router: Router,
        private fetchCandidatesService: FetchCandidatesService,
        @Inject(LAYOUT_GAP_M) public layoutGapM: string
    ) {}

    search(searchValue: string) {
        this.fetchCandidatesService.search({ sortOrder: SortOrder.Desc, searchValue });
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
