const { Observable, from } = require('rxjs');
const { map } = require('rxjs/operators');
const axios = require('axios');

const options = {
  url: 'https://jsonplaceholder.typicode.com/posts?userId=5',
};

const res$ = from(
  axios(options)
);

res$
  .pipe(
    map(({data}) => data)
  )
  .subscribe(
  (res) => console.log(res)
);
