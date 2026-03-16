import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from "./BasePage";

export class BookDemoPage extends BasePage {

  private readonly emailField: Locator;
  private readonly phoneField: Locator;
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly companyNameField: Locator;
  private readonly industryDropdown: Locator;
  private readonly employeesDropdown: Locator;
  private readonly submitButton: Locator;

  private readonly gmailValidation: Locator;
  private readonly phoneValidation: Locator;
  private readonly requiredFieldValidation: Locator;

  constructor(page: Page) {
    super(page);

    this.emailField = page.getByRole('textbox', { name: 'Email*' });
    this.phoneField = page.getByRole('textbox', { name: 'Phone number*' });
    this.firstNameField = page.getByRole('textbox', { name: 'First name*' });
    this.lastNameField = page.getByRole('textbox', { name: 'Last name*' });
    this.companyNameField = page.getByRole('textbox', { name: 'Company name*' });

    this.industryDropdown = page.getByRole('combobox', { name: 'Industry' });
    this.employeesDropdown = page.getByRole('combobox', { name: 'Number of employees*' });

    this.submitButton = page.getByRole('button', { name: 'Book a Demo' });

    this.gmailValidation = page.getByText(
      'Please enter a different email address. This form does not accept addresses from gmail.com.',
      { exact: true }
    );

    this.phoneValidation = page.getByText(
      'A valid phone number may only contain numbers, +()-. or x',
      { exact: true }
    );

    this.requiredFieldValidation = page.getByText('Please complete this required field.');
  }

  async isPageLoaded(): Promise<void> {
    await expect(this.emailField).toBeVisible();
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  async enterPhone(phone: string): Promise<void> {
    await this.phoneField.fill(phone);
  }

  async enterFirstName(name: string): Promise<void> {
    await this.firstNameField.fill(name);
  }

  async enterLastName(name: string): Promise<void> {
    await this.lastNameField.fill(name);
  }

  async enterCompanyName(company: string): Promise<void> {
    await this.companyNameField.fill(company);
  }

  async selectIndustry(industry: string): Promise<void> {
    await this.industryDropdown.selectOption({ label: industry });
  }

  async selectEmployees(size: string): Promise<void> {
    await this.employeesDropdown.selectOption(size);
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async verifyGmailValidation(): Promise<void> {
    await expect(this.gmailValidation).toBeVisible();
  }

  async verifyPhoneValidation(): Promise<void> {
    await expect(this.phoneValidation).toBeVisible();
  }

  async verifyRequiredFieldValidation(): Promise<void> {
    await expect(this.requiredFieldValidation.first()).toBeVisible();
  }
  
  // Clicks away from the current focused field to trigger blur validation
  async blurField(): Promise<void> {
    await this.page.keyboard.press('Tab');
  }

  // Clicks into the email field then leaves — triggers required validation
  async clickAndBlurEmailField(): Promise<void> {
    await this.emailField.click();
    await this.page.keyboard.press('Tab');
  }

  // Waits for network to settle after form submit
  async waitForPageIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

}