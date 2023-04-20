import axios from 'axios';
export { getImages };

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '35508663-181292c51616a86d6f02f37d6';

async function getImages(query, page, perPage) {
   // const parameters = new URLSearchParameters({
  //   key: `35508663-181292c51616a86d6f02f37d6`,
  //   image_type: `photo`,
  //   orientation: `horizontal`,
  //   safesearch: `true`,
  //     });
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  );
  return response;
}