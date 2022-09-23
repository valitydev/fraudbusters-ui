import { SearchParams } from '../../../shared/model/search-params';

export interface SearchCandidatesListsParams extends SearchParams {
    continuationId?: string;
}
