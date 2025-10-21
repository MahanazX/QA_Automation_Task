import { test, expect } from '@playwright/test';
import { FlightSearchPage } from '../pages/FlightSearchPage';
import { FlightResultsPage } from '../pages/FlightResultsPage';

test('Flight search and price comparison', async ({ page }) => {
  const search = new FlightSearchPage(page);
  const results = new FlightResultsPage(page);

  // -----------------------------
  // 1️⃣ Search Flights
  // -----------------------------
  await search.goto();
  await search.setFrom('chatt'); // Chattogram
  await search.setTo('dhaka');   // Dhaka
  await search.setDepartureDate('Choose Tuesday, September 23rd, 2025');
  await search.setTravellers(2); // 2 Adults
  await search.setCabinEconomy(); // Economy class
  await search.searchFlights();

  // -----------------------------
  // 2️⃣ Filter US-Bangla Airlines and get prices
  // -----------------------------
  await results.filterAirline('US-Bangla Airlines');
  const usPrices = await results.getPrices();
  console.log('US-Bangla prices:', usPrices);

  // -----------------------------
  // 3️⃣ Select last flight and verify Sign In popup
  // -----------------------------
  await results.selectLastFlightAndVerifySignIn();

  // -----------------------------
  // 4️⃣ Switch to Novo Air and get prices
  // -----------------------------
  await results.filterAirline('US-Bangla Airlines'); // deselect US-Bangla
  await results.filterAirline('Novo Air');          // select Novo Air
  const novoPrices = await results.getPrices();
  console.log('Novo Air prices:', novoPrices);

  // -----------------------------
  // 5️⃣ Compare prices
  // -----------------------------
  expect(novoPrices.join(',')).not.toBe(usPrices.join(','));
});
