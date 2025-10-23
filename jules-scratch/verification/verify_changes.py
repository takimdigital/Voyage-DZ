from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Verify packages page
    page.goto("http://localhost:3000/packages")
    page.wait_for_selector("text=Filter by agency")
    page.screenshot(path="jules-scratch/verification/packages-page.png")

    # Verify package detail page
    page.click("text=Tassili n'Ajjer Expedition")
    page.wait_for_selector("text=Agency Information")
    page.screenshot(path="jules-scratch/verification/package-detail-page.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
