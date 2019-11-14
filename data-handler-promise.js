// Data from JSONplaceholder
// display all users (full names) whose albums contain word `molestiae`

const axios = require('axios');
const { zipObject } = require('lodash');

console.time('promise');
(async () => {
  axios('https://jsonplaceholder.typicode.com/users/1/albums')
    .then(res => res.data)
    .then(albums => {
      return albums.filter(album => album.title.indexOf('molestiae') > -1)
    })
    .then(filteredAlbums => {
      return Promise.all(filteredAlbums.map(({userId}) => (
        axios(`https://jsonplaceholder.typicode.com/users/${userId}`)
      )))
        .then((users) => {
          return {
            filteredAlbums,
            users,
          }
        })
    })
    .then(({ filteredAlbums, users }) => ({
      filteredAlbums: filteredAlbums.map(album => album.title),
      users: users.map(user => user.data.name)
    }))
    .then(({ filteredAlbums, users }) => {
      zipObject(filteredAlbums, users)
      console.timeEnd('promise');
    })
})();
