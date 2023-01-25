import {Component, OnInit} from '@angular/core';
import {delay, map, Observable, merge, concatWith, combineAll, concatAll, tap} from "rxjs";
import { of } from "rxjs"

@Component({
    selector: 'my-app',
    template: ``,
})
export class AppComponent implements OnInit {
    sendRequest(number: number): Observable<number> {
        console.log("in send request with parameter " + number);
        const timeDelay:number = 200;
        const addValue:number = 100;

        return of(number + addValue).pipe(delay(timeDelay));
    }

    getResponse(request: Observable<number>): Observable<number> {
        let collectionNumber:number[] = [];
        request.pipe(map(x => this.sendRequest(x))).subscribe( p => p.subscribe(n => {
            collectionNumber.push(n);
        }));
        return of(...collectionNumber);
    }

    ngOnInit() {
        const response:Observable<number> = this.getResponse(of(1, 2, 3, 4, 5));
        response.subscribe(x => console.log(x));
    }

}