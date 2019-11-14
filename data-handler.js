// Data from JSONplaceholder
// display all users (full names) whose albums contain word `molestiae`

const axios = require('axios');
const { map, mergeMap, filter } = require('rxjs/operators');
const { from, concat, of, zip } = require('rxjs');

// albums of all users
const albums$ = from(axios('https://jsonplaceholder.typicode.com/users/1/albums'))
  .pipe(
    mergeMap(albums => albums.data),
    filter(album => album.title.includes('molestiae')),
  );

const fullUsers$ = from(albums$)
  .pipe(
    mergeMap(({userId}) => from(axios(`https://jsonplaceholder.typicode.com/users/${userId}`))),
    map(users => users.data),
    map(user => user.name)
  );

zip(albums$, fullUsers$)
  .subscribe(
    ([albumObj, userName]) => {
      console.log(`${userName} used word "molestiae" in album "${albumObj.title}"`)
    }
);
