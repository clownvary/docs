export default function (mypage, myname, w, h, scroll) {
  const offset = 20;
  const wint = (screen.height - parseInt(h, 10)) / 2;
  let win = null;
  let winprops = '';
  let winl = screen.width - parseInt(w, 10);
  let url = mypage;

  if ((parseFloat(w) + parseFloat(offset)) < screen.width) {
    winl = (screen.width - parseInt(w, 10) - offset) / 2;
  }

  winprops = `height=${h},width=${w},top=${wint},left=${winl},toolbar=yes,menubar=yes,scrollbars=${scroll},resizable`;

  if (url.indexOf('?') > 0) {
    url += '&popup_window=yes';
  } else {
    url += '?popup_window=yes';
  }

  win = window.open(url, myname, winprops);

  return win;
}
