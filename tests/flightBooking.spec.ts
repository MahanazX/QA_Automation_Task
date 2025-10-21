import { test, expect } from '@playwright/test';

test('Flight search and price comparison between US-Bangla and Novo Air', async ({ page }) => {
  // 1️⃣ Navigate to the flight search page
  await page.goto('https://firsttrip.com/flight', { waitUntil: 'networkidle' });

  // 2️⃣ Enter flight search details
  await page.getByTestId('$departure-airport-input-form-1').fill('chatt');
  await page.getByText('Chattogram, Bangladesh', { exact: true }).click();

  await page.getByTestId('$destination-airport-input-form-1').fill('dhaka');
  await page.getByText('Dhaka, Bangladesh', { exact: true }).click();

  // 3️⃣ Select departure date - 23 September 2025
  await page.locator('button:has-text("Departure")').click();
  await page.getByLabel('Choose Tuesday, September 23rd, 2025').click();

  // 4️⃣ Travelers: 2 Adults
  await page.getByText('1 Traveller').click();
  await page.locator('button[aria-label="Add Adult"]').click(); // click + once
  await page.getByText('Done').click();

  // 5️⃣ Select Class = Economy / Premium Economy
  await page.getByAltText('cabin_class_radio_1').click();

  // 6️⃣ Click Search
  await page.getByTestId('search-flight-button').click();
  await page.waitForLoadState('networkidle');

  // 7️⃣ Filter by US-Bangla Airlines
  const usBanglaFilter = page.getByLabel('US-Bangla Airlines');
  await usBanglaFilter.click();
  await page.waitForTimeout(3000);

  // 8️⃣ Capture all US-Bangla flight prices
  const usBanglaPrices = await page.locator('[data-testid^="flight_card_"] .font-semibold').allTextContents();
  console.log('🟩 US-Bangla Prices:', usBanglaPrices);

  // 9️⃣ Select last US-Bangla flight
  const lastUsBanglaFlight = page.locator('[data-testid^="flight_card_"]').last();
  const popupPromise = page.waitForEvent('popup');
  await lastUsBanglaFlight.getByRole('button', { name: 'Select' }).click();
  const popup = await popupPromise;

  // 🔟 Verify Sign In page/modal
  await expect(popup.getByText('Sign In', { exact: false })).toBeVisible();

  // 11️⃣ Close popup
  await popup.close();

  // 12️⃣ Deselect US-Bangla, Select Novo Air
  await usBanglaFilter.click();
  const novoAirFilter = page.getByLabel('Novo Air');
  await novoAirFilter.click();
  await page.waitForTimeout(3000);

  // 13️⃣ Capture Novo Air prices
  const novoAirPrices = await page.locator('[data-testid^="flight_card_"] .font-semibold').allTextContents();
  console.log('🟦 Novo Air Prices:', novoAirPrices);

  // 14️⃣ Compare and assert price difference
  // expect(novoAirPrices.join(',')).not.toBe(usBanglaPrices.join(','), 'Expected price difference between airlines');
});
