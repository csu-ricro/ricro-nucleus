import $ from 'jquery';

function complete(data) {
  console.log('complete');
  return data;
}

export default function apiCall(uri, data = null, ) {
  console.log('http://192.168.1.24:8080/api' + uri);
  return $.ajax({
    dataType: 'json',
    url: 'http://192.168.1.24:8080/api' + uri,
    data: data,
    complete: complete.bind(this),
  });
}
