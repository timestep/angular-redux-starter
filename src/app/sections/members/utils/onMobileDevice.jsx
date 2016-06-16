export const onMobileDevice = () => {
  return navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
    navigator.userAgent.match(/Android/i);
};
