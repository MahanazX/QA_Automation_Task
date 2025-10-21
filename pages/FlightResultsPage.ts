import { Page, Locator } from '@playwright/test';

export class FlightResultsPage {
  flightCards: Locator;

  constructor(private page: Page) {
    // This selects all flight cards
    this.flightCards = page.locator('[data-testid^="flight_card_"]');
  }

  // NEW: method to get all current flight prices
  async getPrices(): Promise<number[]> {
    // Select all divs with current price
    const priceElements = this.page.locator('div.font-bold.text-brand-1');
    
    // Get text from all of them
    const pricesText = await priceElements.allTextContents();

    // Convert text to numbers
    const prices = pricesText.map(p => Number(p.replace(/[^0-9]/g, ''))).filter(Boolean);

    return prices; // returns array of numbers
  }

  // Select last flight and verify Sign In popup
  async selectLastFlightAndVerifySignIn(): Promise<void> {
    const lastFlight = this.flightCards.last();
    const popupPromise = this.page.waitForEvent('popup');
    await lastFlight.getByRole('button', { name: 'Select' }).click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    await popup.locator('text=Sign In').waitFor({ state: 'visible' });
    await popup.close();
  }

  async filterAirline(name: string) {
    const checkbox = this.page.getByLabel(name);
    await checkbox.click();
    await this.page.waitForTimeout(2000);
  }
}
