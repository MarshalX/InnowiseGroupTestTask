let api_server = "localhost";
let api_port = "8000";

const env = window._env_;
if(env) {
    api_server = env.API_HOST;
    api_port = env.API_PORT;
}

const api_path = api_server + ":" + api_port;

export const api_url = 'http://' + api_path + '/';
