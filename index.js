import { createClient } from 'redis';

export default class SRS {
  async constructor(url = false, clearClient = false) {
    await this.connect(url);

    if (!this.client) return false;

    if (clearClient) await this.clearSessions();

    return this.client;
  }

  async connect(url = false) {
    if (url) {
      this.client = createClient({
        url: url
      });
    } else {
      this.client = createClient();
    }

    return this.client;
  }

  async clearSessions() {
    return await this.client.flushall();
  }

  async deleteSession(sessionId) {
    return await this.client.del(sessionId);
  }

  async disconnect() {
    return await this.client.disconnect();
  }

  async getSession(sessionId) {
    return await this.client.get(sessionId);
  }

  async setSession(sessionId, session, expire = 0, replace = false) {
    const params = [ sessionId, session ];

    if (expire) params.push('ex', expire);

    if (replace) params.push('nx');

    return await this.client.set(...params);
  }
}
