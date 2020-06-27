import axios from 'axios';

const url = 'webhook';

class WebhookService {
  static sendChat(message) {
    return axios.post(url, { message });
  }
}

export default WebhookService;
