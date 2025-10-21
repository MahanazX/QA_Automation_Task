import { test, expect } from '@playwright/test';
import { FlightSearchPage } from '../pages/FlightSearchPage';
import { FlightResultsPage } from '../pages/FlightResultsPage';

test('Flight search and price comparison US-Bangla vs Novo Air', async ({ page }) => {
  const search = new FlightSearchPage(page);
  const results = new FlightResultsPage(page);

  // -----------------------------
  // 1️⃣ Search Flights
  // -----------------------------
  await search.goto();
  await search.selectOneWay();
  await search.setFrom('chatt');
  await search.setTo('dhaka');
  await search.setDepartureDate();
  await search.setTravellers(2);
  await search.setCabinEconomy();
  await search.searchFlights();

  // -----------------------------
  // 2️⃣ US-Bangla Airlines
  // -----------------------------
  await results.selectUSBanglaAndLastFlight();
  const usPrices = await results.getPrices();
  console.log('US-Bangla prices:', usPrices);
  await results.selectLastFlightAndVerifySignIn();

  // -----------------------------
  // 3️⃣ Novo Air
  // -----------------------------
  await results.selectNovoAirAndLastFlight();
  const novoPrices = await results.getPrices();
  console.log('Novo Air prices:', novoPrices);

  // -----------------------------
  // 4️⃣ Compare prices
  // -----------------------------
  expect(novoPrices.join(',')).not.toBe(usPrices.join(','));
});
