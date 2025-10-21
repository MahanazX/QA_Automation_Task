import { Page } from '@playwright/test';

export class FlightSearchPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/flight', { waitUntil: 'domcontentloaded' });
  }
    async selectOneWay() {
    await this.page.getByTestId('One Way-input').getByAltText('image').click();
  }

  async setFrom(city: string) {
    await this.page.getByTestId('$departure-airport-input-form-1').fill(city);
    await this.page.getByText('Chattogram, Bangladesh', { exact: true }).click({force: true});
  }

  async setTo(city: string) {
    await this.page.getByTestId('$destination-airport-input-form-1').fill(city);
    await this.page.getByText('Dhaka, Bangladesh', { exact: true }).click();
  }

async setDepartureDate() {
  await this.page.locator('button').filter({ hasText: 'Departure23 Oct, 2025Thursday' }).click();
  await this.page.getByLabel('Choose Thursday, October 23rd,').click();
}
async setTravellers(adults = 2) {
  await this.page.getByText('1 Traveller').click();
  if (adults > 1) {
    for (let i = 1; i < adults; i++) {
      await this.page.locator('p:nth-child(3) > .relative > .h-full').first().click();
    }
  }
  const doneButton = this.page.getByText('Done');
  if (await doneButton.count()) {
    await doneButton.click();
  }
}


  async setCabinEconomy() {
    await this.page.getByAltText('cabin_class_radio_1').click();
  }

  async searchFlights() {
    await this.page.getByTestId('search-flight-button').click();
    await this.page.waitForLoadState('networkidle');
  }
}
