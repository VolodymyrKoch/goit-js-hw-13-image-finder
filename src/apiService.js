
export default function (value, page) {
  const TOKEN = "18953459-ccf1cbce1be1015139c395560"
     
  return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=12&key=${TOKEN}`)
    .then((data) => data.json())
  
}
