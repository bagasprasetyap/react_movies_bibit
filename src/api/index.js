import axios from 'axios';

const apiMovie = (data) => {
  return new Promise((resolve, reject) => {
    let url = `${process.env.REACT_APP_KEY}`;
    if (data.title) url += `&s=${data.title}`;
    if (data.page) url += `&page=${data.page}`;
    if (data.id) url += `&i=${data.id}`;
    if (data.plot) url += `&plot=${data.plot}`;

    axios({
      method: 'GET',
      url,
    }).then((res) => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject(res.response);
      }
    }).catch((err) => {
      if (err.response) {
        reject(err.response);
      } else {
        reject(err);
      }
    });
  });
};

export {
  apiMovie,
};