export const timeFormat = (timestamp, formatStr) => {
  let date = new Date(timestamp * 1000);
  let Y = date.getFullYear();
  let M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  formatStr = formatStr || 'YYYY-MM-DD H:m:s';
  return formatStr.replace(/YYYY|MM|DD|H|m|s/ig, function (matches) {
    return ({
      YYYY: Y,
      MM: M,
      DD: D,
      H: h < 10 ? '0' + h : h,
      m: m < 10 ? '0' + m : m,
      s: s < 10 ? '0' + s : s
    })[matches];
  });
};
