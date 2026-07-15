# ITStart landing

Статичний лендинг для GitHub Pages. Ніякого build-кроку не потрібно.

## Що змінити перед запуском

1. `assets/script.js`:
   - `checkoutUrl` — посилання на checkout/SendPulse;
   - `price` — актуальна ціна.
2. `index.html`:
   - Meta Pixel ID;
   - email і контакти;
   - блок керівника курсу: реальне ім’я, фото, досвід і LinkedIn;
   - OG-image URL після підключення домену.
3. `privacy.html` та `offer.html` — передати юристу й додати реквізити продавця.

## Як опублікувати на GitHub Pages

1. Створіть репозиторій і завантажте весь вміст цієї папки у корінь.
2. Settings → Pages → Deploy from a branch → `main` / `/root`.
3. У Custom domain введіть `itstart.com.ua`.
4. Додайте DNS-записи GitHub Pages у реєстратора домену та увімкніть Enforce HTTPS.

## Структура

- `index.html` — ленд;
- `assets/styles.css` — дизайн;
- `assets/script.js` — інтерактивний тест, CTA, UTM і налаштування ціни;
- `privacy.html`, `offer.html` — юридичні чернетки;
- `assets/favicon.svg`, `assets/og-cover.svg` — айдентика.
