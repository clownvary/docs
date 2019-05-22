export default (option, xhr) => {
  const msg = `cannot post ${option.action} ${xhr.status}`;
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = option.action;
  return err;
};
