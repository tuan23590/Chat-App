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

    return "Đang hoạt động";
  };