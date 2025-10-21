import { Page } from '@playwright/test';

export class FlightSearchPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/flight', { waitUntil: 'domcontentloaded' });
  }

  async setFrom(city: string) {
    await this.page.getByTestId('$departure-airport-input-form-1').fill(city);
    await this.page.getByText('Chattogram, Bangladesh', { exact: true }).click();
  }

  async setTo(city: string) {
    await this.page.getByTestId('$destination-airport-input-form-1').fill(city);
    await this.page.getByText('Dhaka, Bangladesh', { exact: true }).click();
  }

  async setDepartureDate(label: string) {
    await this.page.locator('button:has-text("Departure")').click();
    await this.page.getByLabel(label).click();
  }

  async setTravellers(adults = 2) {
    await this.page.getByText('1 Traveller').click();
    for (let i = 1; i < adults; i++) {
      await this.page.locator('button[aria-label*="Add Adult"]').click();
    }
    const done = this.page.getByText('Done');
    if (await done.count()) await done.click();
  }

  async setCabinEconomy() {
    await this.page.getByAltText('cabin_class_radio_1').click();
  }

  async searchFlights() {
    await this.page.getByTestId('search-flight-button').click();
    await this.page.waitForLoadState('networkidle');
  }
}
