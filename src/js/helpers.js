import { TIMEOUT_SEC } from './config';

const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

export const getJSON = async url => {
  try {
    const fecthPro = fetch(url);
    const res = await Promise.race([fecthPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status}) `);
    return data;
  } catch (e) {
    throw e;
  }
};
