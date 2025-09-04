const localeCache = new Map(); // key: `${page}:${lang}` -> JSON

export async function loadLocale(page, lang) {
  const key = `${page}:${lang}`;
  if (localeCache.has(key)) return localeCache.get(key);
  const url = `/locales/${lang}/${page}.json`;
  const p = fetch(url, { cache: 'no-cache' })
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  localeCache.set(key, p);
  return p;
}
