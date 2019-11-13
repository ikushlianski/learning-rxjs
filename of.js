const { of } = require('rxjs');
const { map, concatMap, delay } = require('rxjs/operators');

const obs$ = of(1, 2, 3, 4, 6);

obs$.pipe(
  concatMap(val => of(val)
    .pipe(
      delay(1250)
    )
  )
)
  .subscribe(
  v => console.log(v)
);
