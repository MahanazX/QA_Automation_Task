import { Page } from '@playwright/test';

export class FlightResultsPage {
  constructor(private page: Page) {}

  // -----------------------------
  // Select US-Bangla Airlines and last flight
  // -----------------------------
  async selectUSBanglaAndLastFlight() {
    // Open Airlines filter
    await this.page.getByText('Airlines', { exact: true }).click();

    // Select US-Bangla Airlines
    await this.page.getByTestId('airline-filter-list').getByText('US Bangla Airlines').click();

    // Click last flight card details
    await this.page.getByTestId('flight_card_4').getByText('Partially Refundable9 seat(s').click();
    await this.page.getByTestId('flight_card_4').getByText(/BDT \d{1,3}(,\d{3})*/).click();
  }

  // -----------------------------
  // Select Novo Air and its last flight
  // -----------------------------
  async selectNovoAirAndLastFlight() {
    // Open Airlines filter
    await this.page.getByText('Airlines', { exact: true }).click();

    // Select Novo Air
    await this.page.getByTestId('airline-filter-list').getByText('Novo Air').click();

    // Click last flight card details (Codegen locator for Novo Air)
    await this.page.locator('div').filter({ hasText: /^Partially Refundable$/ }).nth(4).click();
  }

  // -----------------------------
  // Capture all current flight prices
  // -----------------------------
  async getPrices(): Promise<number[]> {
    const priceElements = this.page.locator('div.font-bold.text-brand-1');
    const pricesText = await priceElements.allTextContents();
    const prices = pricesText.map(p => Number(p.replace(/[^0-9]/g, ''))).filter(Boolean);
    return prices;
  }

  // -----------------------------
  // Select last flight and handle Sign In popup
  // -----------------------------
  async selectLastFlightAndVerifySignIn(): Promise<void> {
    const lastFlight = this.page.getByTestId('flight_card_4');
    const popupPromise = this.page.waitForEvent('popup');

    // Click select button on flight
    await lastFlight.getByRole('button', { name: 'Select' }).click();

    // Wait for popup
    const popup = await popupPromise;
    await popup.waitForLoadState();

    // Verify Sign In popup
    await popup.getByRole('heading', { name: 'Sign In' }).waitFor({ state: 'visible' });

    // Close popup
    await popup.close();
  }
}
