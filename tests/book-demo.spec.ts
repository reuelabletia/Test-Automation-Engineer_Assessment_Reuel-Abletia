import { test } from '@playwright/test';
import { BookDemoPage } from '../pages/BookDemoPage';
import { formData } from '../test-data/formData';

//This is only a sample test case: It doesn't provide all the test cases, this is solely for Assessment.

test.describe('Book Demo Form Tests @For Assessment Only', () => {

  let bookDemoPage: BookDemoPage;

  test.beforeEach(async ({ page }) => {
    bookDemoPage = new BookDemoPage(page);
    await bookDemoPage.navigate('https://safetyculture.com/book-demo');
    await bookDemoPage.isPageLoaded();
  });

  // ─── INLINE / REAL-TIME VALIDATION (no submit needed) ───────────────────────

  test('Negative: Gmail email should show validation immediately after input', async () => {
    // Arrange & Act — no submit needed, validation triggers on input/blur
    await bookDemoPage.enterEmail(formData.invalidPersonalEmail);
    await bookDemoPage.blurField(); // click away from the field

    // Assert
    await bookDemoPage.verifyGmailValidation();
  });

  test('Negative: Invalid phone should show validation immediately after input', async () => {
    // Arrange & Act — no submit needed, validation triggers on input/blur
    await bookDemoPage.enterPhone(formData.invalidPhone);
    await bookDemoPage.blurField(); // click away from the field

    // Assert
    await bookDemoPage.verifyPhoneValidation();
  });

  // ─── BLUR VALIDATION (click into field, leave without typing) ───────────────

  test('Negative: Required field should show validation when clicked then left empty', async () => {
    // Act — click inside the email field then leave without typing
    await bookDemoPage.clickAndBlurEmailField();

    // Assert
    await bookDemoPage.verifyRequiredFieldValidation();
  });

  // ─── SUBMIT VALIDATION (all fields empty, click Book a Demo) ────────────────

  test('Negative: All required fields should show validation on empty form submit', async () => {
    // Act — click submit without touching any field
    await bookDemoPage.submitForm();

    // Assert
    await bookDemoPage.verifyRequiredFieldValidation();
  });


  // ─── POSITIVE ──────────────────────────────────────────────────────────────── I commented out this code so that it doesn’t send too many requests to the website.

//   test('Positive: User should submit form successfully with valid business data', async () => {
//     // Arrange
//     await bookDemoPage.enterEmail(formData.validBusinessEmail);
//     await bookDemoPage.enterPhone(formData.validPhone);
//     await bookDemoPage.enterFirstName(formData.firstName);
//     await bookDemoPage.enterLastName(formData.lastName);
//     await bookDemoPage.enterCompanyName(formData.company);
//     await bookDemoPage.selectIndustry(formData.industry);
//     await bookDemoPage.selectEmployees(formData.employees);

//     // Act
//     await bookDemoPage.submitForm();

//     // Assert — confirm redirect or success state
//     await bookDemoPage.waitForPageIdle();
//   });

});