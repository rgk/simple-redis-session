import { createClient } from 'redis';

export default class TreeSanitizer {
  async constructor(url = false, clearClient = false) {
    if (url) {
      this.client = createClient({
        url: url
      });
    } else {
      this.client = createClient();
    }

    if (!this.client) return false;

    if (clearClient) await this.clearSessions();

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

  async setSession(sessionId, session, replace = false) {
    if (await this.client.get(sessionId) && !replace) return;

    return await this.client.set(sessionId, session);
  }
}
