import { createClient } from 'redis';

class Session() {
  constructor(url = false, clearClient = false) {
    if (url) {
      this.client = createClient({
        url: url
      });
    } else {
      this.client = createClient();
    }

    if (clearClient) this.clearSessions();

    return this.client;
  }

  async deleteSession(sessionId) {
    return await this.client.del(sessionId);
  }

  async clearSessions() {
    return await this.client.flushall();
  }

  async getSession(sessionId) {
    return await this.client.get(sessionId);
  }

  async setSession(sessionId, session) {
    if (await this.client.get(sessionId)) return;

    return await this.client.set(sessionId, session);
  }
}

export default new Session();
