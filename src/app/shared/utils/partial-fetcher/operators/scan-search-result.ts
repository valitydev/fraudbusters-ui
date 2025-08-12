import { Observable, of } from 'rxjs';
import { catchError, first, map, mergeScan } from 'rxjs/operators';

import { FetchAction } from '../fetch-action';
import { FetchFn } from '../fetch-fn';
import { FetchResult } from '../fetch-result';

export const handleFetchResultError =
    <R>(result: R[] = [], count?: number) =>
    (s: Observable<FetchResult<R>>): Observable<FetchResult<R>> =>
        s.pipe(
            catchError(() =>
                of<FetchResult<R>>({
                    result,
                    count,
                })
            )
        );

export const scanFetchResult =
    <P, R>(fn: FetchFn<P, R>) =>
    (s: Observable<FetchAction<P>>): Observable<FetchResult<R>> =>
        s.pipe(
            mergeScan<FetchAction<P>, FetchResult<R>>(
                ({ result, count }, { type, value }) => {
                    console.log('scanFetchResult action:', { type, value });
                    switch (type) {
                        case 'search':
                            return fn(value).pipe(
                                first(),
                                map((r) => {
                                    console.log('scanFetchResult search result:', r);
                                    return r;
                                }),
                                handleFetchResultError()
                            );
                        case 'fetchMore':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            return fn(value, (result[result.length - 1] as any).id).pipe(
                                first(),
                                map((r) => {
                                    const newResult = {
                                        result: result.concat(r.result),
                                        count: r.count,
                                    };
                                    console.log('scanFetchResult fetchMore result:', newResult);
                                    return newResult;
                                }),
                                handleFetchResultError(result, count)
                            );
                    }
                },
                { result: [] },
                1
            )
        );
