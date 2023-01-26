import {Component, OnInit} from '@angular/core';
import {delay, forkJoin, map, mergeMap, Observable, scan, switchAll, switchMap, takeLast, tap} from "rxjs";
import {of} from "rxjs"

@Component({
    selector: 'my-app',
    template: `<h1>Check console!</h1>`,
})
export class AppComponent implements OnInit {
    sendRequest(number: number): Observable<number> {
        const addValue: number = 100;
        const timeDelay: number = 2000;

        return of(number + addValue)
            .pipe(delay(timeDelay));
    }

    getResponse(request$: Observable<number>): Observable<number[]> {
        const result$: Observable<number[]> = request$
            .pipe(
                mergeMap(x => this.sendRequest(x)),
                scan((acc: number[], cur: number) => [...acc, cur], []),
                takeLast(1)
            );

        return result$;
    }

    ngOnInit() {
        const testObservable$: Observable<number> = of(1, 2, 3, 4, 5);
        testObservable$.subscribe(x => console.log(`begin value: ${x}`));

        const response$: Observable<number[]> = this.getResponse(testObservable$);
        response$.subscribe(x => console.log(`end value: ${x}`));
    }
}