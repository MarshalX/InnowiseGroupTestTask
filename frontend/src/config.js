let api_server = process.env.REACT_APP_API_HOST || 'localhost';
let api_port = process.env.REACT_APP_API_PORT || 8000;

const api_path = api_server + ":" + api_port;

export const api_url = 'http://' + api_path + '/';
