import { Component, OnInit } from '@angular/core';
import {delay, map, Observable, Subject} from "rxjs";
import { of } from "rxjs"

@Component({
    selector: 'my-app',
    template: ``,
})
export class AppComponent implements OnInit {
    sendRequest(number: number): Observable<number> {
        const timeDelay:number = 500;
        const addValue:number = 100;

        return of(number + addValue).pipe(delay(timeDelay));
    }

    getResponse(request: Observable<number>): Observable<number> {
        const result: Observable<number> =  new Observable<number>(observer => {
            request.pipe(map(num => this.sendRequest(num)))
                .subscribe(obs => obs.subscribe(
                    value => observer.next(value)
                ))
        });

        return result;
    }

    ngOnInit() {
        const testObservable:Observable<number> = of(1, 2, 3, 4, 5);
        testObservable.subscribe(x => console.log(`begin value: ${x}`));

        const response:Observable<number> = this.getResponse(testObservable);
        response.subscribe(x => console.log(`end value: ${x}`));
    }

}