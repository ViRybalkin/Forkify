import { TIMEOUT_SEC } from './config';

const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

export const AJAX = async (url, uploadData = undefined) => {
  try {
    const fecthPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fecthPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status}) `);
    return data;
  } catch (error) {}
};

// export const getJSON = async url => {
//   try {
//     const fecthPro = fetch(url);
//     const res = await Promise.race([fecthPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status}) `);
//     return data;
//   } catch (e) {
//     throw e;
//   }
// };

// export const sendJSON = async (url, uploadData) => {
//   try {
//     const fecthPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const res = await Promise.race([fecthPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status}) `);
//     return data;
//   } catch (e) {
//     throw e;
//   }
// };
