import $ from 'jquery';

function complete(data) {
  console.log(
    'COMPLETE:',
    JSON.parse(data.responseText), '|',
    data
  );
  return data;
}

export default function apiCall(uri, settings = {}) {
  console.log('API Request: ', 'http://192.168.1.24:8080/api' + uri, settings);
  return $.ajax({
    dataType: 'json',
    url: 'http://192.168.1.24:8080/api' + uri,
    complete: complete.bind(this),
    ...settings,
  });
}
