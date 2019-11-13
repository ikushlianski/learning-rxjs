const { interval } = require('rxjs');

const stream$ = interval(1000);
stream$.subscribe(
  val => console.log(val),
);
