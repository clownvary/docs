export default function getDynamicUrl(url, urlParams) {
  if (!urlParams) return url;

  const reg = /\{(\w+)\}/g;
  const lowCaseUrlParams = Object.keys(urlParams).reduce((acc, key) => ({
    ...acc, [key.toLowerCase()]: urlParams[key]
  }), {});

  return url.replace(reg, (_, replaceParam) => lowCaseUrlParams[replaceParam.toLowerCase()]);
}
