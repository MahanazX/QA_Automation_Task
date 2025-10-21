import { Page } from '@playwright/test';

export class FlightResultsPage {
  constructor(private page: Page) {}

  async selectUSBanglaAndLastFlight() {
    await this.page.getByText('Airlines', { exact: true }).click();
    await this.page.getByTestId('airline-filter-list').getByText('US Bangla Airlines').click();
    await this.page.getByTestId('flight_card_4').getByText('Partially Refundable9 seat(s').click();
    await this.page.getByTestId('flight_card_4').getByText(/BDT \d{1,3}(,\d{3})*/).click();
  }
  async selectNovoAirAndLastFlight() {
    await this.page.getByText('Airlines', { exact: true }).click();
    await this.page.getByTestId('airline-filter-list').getByText('Novo Air').click();
    await this.page.locator('div').filter({ hasText: /^Partially Refundable$/ }).nth(4).click();
  }
  async getPrices(): Promise<number[]> {
    const priceElements = this.page.locator('div.font-bold.text-brand-1');
    const pricesText = await priceElements.allTextContents();
    const prices = pricesText.map(p => Number(p.replace(/[^0-9]/g, ''))).filter(Boolean);
    return prices;
  }

  async selectLastFlightAndVerifySignIn(): Promise<void> {
    const lastFlight = this.page.getByTestId('flight_card_4');
    const popupPromise = this.page.waitForEvent('popup');
    await lastFlight.getByRole('button', { name: 'Select' }).click();

    const popup = await popupPromise;
    await popup.waitForLoadState();
    await popup.getByRole('heading', { name: 'Sign In' }).waitFor({ state: 'visible' });
    await popup.close();
  }
}
