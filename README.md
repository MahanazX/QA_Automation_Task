# QA Automation Task - FirstTrip Flight Search

### Tech Stack
Playwright + TypeScript

### How to Run
1. Clone the repo  
   `git clone https://github.com/MahanazX/QA_Automation_Task.git`
2. Install dependencies  
   `npm install`
3. Run test in headless mode  
   `npx playwright test`
4. Run test in headed mode  
   `npx playwright test --headed`
5. View report  
   `npx playwright show-report`

### Scenario Covered
1. Navigate to flight search page  
2. Fill search details (From, To, Date, Travellers, Class)  
3. Search and filter by **US-Bangla Airlines**  
4. Capture all flight prices  
5. Select last flight → verify Sign-In modal  
6. Switch to **Novo Air**  
7. Capture new flight prices  
8. Compare arrays and assert price difference  

### Notes
- Used Playwright test locators (byTestId, getByText, getByRole).
- Adjust date label if site datepicker changes.
- Simple, one-file design to match a short assignment window (2.5 hrs).
