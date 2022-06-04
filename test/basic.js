import test from 'tape';
import Session from '../index.js';

test('getSession should return session data.', (t) => {
  const session = new Session();
  
  session.setSession(1, 123);

  t.deepEqual(session.getSession(1), 123);

  t.end();
});

test('deleteSession should delete session data.', (t) => {
  const session = new Session();
  
  session.setSession(1, 123);
  session.deleteSession(1);

  t.deepEqual(session.getSession(1), null);

  t.end();
});

test('clearSessions should delete all session data.', (t) => {
  const session = new Session();
  
  session.setSession(1, 123);
  session.clearSessions();

  t.deepEqual(session.getSession(1), null);

  t.end();
});
