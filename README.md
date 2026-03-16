# QA Assessment – Test Strategy & Automation Approach

**Page Tested:** [https://safetyculture.com/book-demo](https://safetyculture.com/book-demo)
**Candidate:** Reuel Abletia

---

# 1. Test Strategy

### Critical Areas to Test

The most critical areas of this form are:

**Form validation**

* Required field validation (Email, Phone Number, First Name, Last Name, Company Name, Number of Employees).
* Email format validation and restriction for personal domains (e.g., gmail.com).
* Phone number format validation.

These are critical because they directly affect **data quality and successful form submission**.

**Dynamic field behavior**

* Additional fields (First Name, Last Name, Industry, Company Name, Number of Employees) appear **only after an email is entered**.
* This conditional behavior must work correctly to avoid blocking users.

**Submission logic**

* Clicking **Book a Demo** should validate all required fields.
* Error messages should appear correctly and consistently.

---

### Prioritization

**High Priority**

* Required field validation
* Email validation (format and domain restriction)
* Phone number validation
* Conditional field visibility after email input
* Successful form submission flow

**Medium Priority**

* Dropdown functionality (Industry, Number of Employees)
* Optional checkbox selections

**Low Priority / Deprioritised**

* Visual layout
* Styling or spacing issues
* Minor UI cosmetic behavior

These can be covered later unless they affect usability.

---

### Risks and Edge Cases

Some key risks include:

**Email edge cases**

* Personal domains (gmail, yahoo, etc.)
* Incorrect email formats

**Phone number edge cases**

* Special characters allowed (+()-. or x)
* Very long numbers
* Empty input

**Dynamic form behavior**

* Fields not appearing after email input
* Fields appearing but validation not triggering correctly

**User interaction**

* Clicking inside a field and leaving it empty should trigger validation
* Submitting the form without filling fields

---

# 2. Automation Approach

### Test Suite Structure

I would structure the automation suite using a **Page Object Model (POM)**.

Example structure:

```
project-root
│
├── pages
│   ├── BasePage.ts
│   └── BookDemoPage.ts
│
├── tests
│   └── book-demo.spec.ts
│
├── test-data
│   └── formData.ts

```
This keeps **selectors and actions separated from test logic**, which improves maintainability.

---

### Framework and Tooling

I would use:

**Playwright with TypeScript**

Reasons:

* Fast and reliable browser automation
* Built-in waiting and auto-retry features
* Cross-browser testing support
* Good support for modern web applications

---

### Maintainability Strategy

To keep tests maintainable as the form evolves:

**Use stable selectors**

* Prefer data attributes or accessible roles instead of CSS structure.

**Use Page Objects**

* Centralise UI interactions in reusable methods.

Example:

```
bookDemoPage.enterEmail()
bookDemoPage.submitForm()

```

**Use reusable test data**

* Keep test inputs in a separate file.

**Focus on behavior**

* Test business logic rather than UI layout.

This reduces test failures when small UI changes occur.

---

# 3. Example Test Case

### Test Case: Prevent Personal Email Domain Submission

This test ensures that **personal email domains are rejected**, which is a key business rule.

### Playwright Example

```typescript

import { test } from '@playwright/test';
import { BookDemoPage } from '../pages/BookDemoPage';
import { formData } from '../test-data/formData';

test.describe('Book Demo Form Tests @For Assessment Only', () => { 

  let bookDemoPage: BookDemoPage;

  test.beforeEach(async ({ page }) => {
    bookDemoPage = new BookDemoPage(page);
    await bookDemoPage.navigate('https://safetyculture.com/book-demo');
    await bookDemoPage.isPageLoaded();
  });

  test('Negative: Gmail email should show validation immediately after input', async () => {
    // Arrange & Act — no submit needed, validation triggers on input
    await bookDemoPage.enterEmail(formData.invalidPersonalEmail);
    await bookDemoPage.blurField(); // click away from the field to trigger inline validation

    // Assert
    await bookDemoPage.verifyGmailValidation();
  });

});

```

### Why This Test

I chose this test because:

* It validates an **important business rule**.
* It ensures the system prevents **invalid lead data** from personal email domains.

---
