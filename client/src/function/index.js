export const TIMEAGO = (timestamp) => {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);

  const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
  if (years > 0) return `${years} năm`;

  const months = Math.floor(diffInSeconds / (60 * 60 * 24 * 30));
  if (months > 0) return `${months} tháng`;

  const weeks = Math.floor(diffInSeconds / (60 * 60 * 24 * 7));
  if (weeks > 0) return `${weeks} tuần`;

  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  if (days > 0) return `${days} ngày`;

  const hours = Math.floor(diffInSeconds / (60 * 60));
  if (hours > 0) return `${hours} giờ`;

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes > 0) return `${minutes} phút`;

  return "1 phút";
};

export const DEBOUNCE = (callback, delay) => {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
};

export const THROTTLE = (callback, delay) => {
  let shouldWait = false;
  let lastArgs = null;
  return (...args) => {
    if (shouldWait) {
      lastArgs = args;
      return;
    }
    callback(...args);
    shouldWait = true;
    setTimeout(() => {
      if (lastArgs === null) {
        shouldWait = false;
      } else {
        shouldWait = false;
        callback(...lastArgs);
        lastArgs = null;
      }
    }, delay);
  };
};

export const FORMAT_TIME = (date) => {
  const d = new Date(parseFloat(date));

  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
  const year = d.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};