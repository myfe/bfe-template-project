import { POST } from '../util/request';

export async function fetchEnv(payload) {
  const { d } = await POST('/api/env', payload);
  if (d && d.success) {
    return d.data;
  }
  return null;
}

export default {
  fetchEnv
};
