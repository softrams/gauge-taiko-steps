# List of available steps

---

## Accessibility Steps

---

### Audit page for accessibility / Check accessibility for the page
**Description:** Runs an accessibility audit on the current page using axe via taiko-accessibility. Fails the scenario if the score is below the configured threshold (default 80), unless `continue_on_accessibility_fail` is set to true.
**Example:**
```
Audit page for accessibility
```
**Notes:**
- Outputs score and violations in the Gauge report.
- Configure `min_accessibility_score` and `continue_on_accessibility_fail` in your environment properties.

---

## Browser Steps

---

### Emulate device `<deviceType>`
**Description:** Emulates a device (e.g., iPad Pro landscape, iPhone X) for the browser session.
**Example:**
```
Emulate device "iPad Pro landscape"
```
**Notes:**
- See Taiko's device list for valid device names.

---

### Emulate network `<networkType>`
**Description:** Emulates a network type (e.g., Good3G, WiFi, Offline).
**Example:**
```
Emulate network "Good3G"
```

---

### Emulate timezone `<timezone>`
**Description:** Emulates a timezone (e.g., America/New_York).
**Example:**
```
Emulate timezone "America/New_York"
```

---

### Save screenshot
**Description:** Takes a screenshot and saves it to the configured screenshots directory.
**Example:**
```
Save screenshot
```

---

### Set screen size as width `<width>` height `<height>`
**Description:** Sets the browser window size.
**Example:**
```
Set screen size as width "1600" height "900"
```

---

### Set viewport size as width `<width>` height `<height>`
**Description:** Sets the viewport size for the browser.
**Example:**
```
Set viewport size as width "1200" height "800"
```

---

## Web Page Steps

---

### Page navigation

#### Goto `<url>` / Open `<url>` / Goto `<url>` in new tab / Open `<url>` in new tab
**Description:** Navigates to the specified URL, optionally in a new tab.
**Example:**
```
Goto "https://example.com"
Goto "https://example.com" in new tab
```
**Notes:**
- If `url` is an environment variable, its value is used.
- If `APP_ROOT_URL` is set and `url` is empty, it navigates to the root URL.

---

### Switch to window tab

#### Switch to `<urlTitle>` / Switch to `<urlTitle>` window
**Description:** Switches to a browser window/tab with a title matching the given string or regex.
**Example:**
```
Switch to "Example Domain"
```

---

### Close window tab

#### Close window / Close window tab
**Description:** Closes the current browser tab.
**Example:**
```
Close window
```

---

### Check for elements with specific text and other conditions

#### Check `<eleType>` with text `<text>` exists
**Description:** Asserts that an element of the given type with the specified text exists on the page.
**Example:**
```
Check "button" with text "Submit" exists
Check "button" with text "Delete" does not exists
```

#### Check `<eleType>` with text `<text>` does not exists
**Description:** Asserts that an element of the given type with the specified text does not exist on the page.
**Example:**
```
Check "button" with text "Delete" does not exists
```

#### Check `<eleType>` with text `<text>` is disabled / is enabled
**Description:** Asserts that the element is disabled or enabled.
**Example:**
```
Check "button" with text "Submit" is disabled
Check "button" with text "Submit" is enabled
```

#### Check `<eleType>` with text `<text>` matches `<regex>`
**Description:** Asserts that the element's text matches the given regex.
**Example:**
```
Check "label" with text "User ID" matches "User\\d+"
```

#### Check `<eleType>` with text `<text>` and value `<idx>` matching `<regex>` to be `<val>`
**Description:** Asserts that the nth value matching the regex in the element's text equals the expected value.
**Example:**
```
Check "label" with text "Order" and value "2" matching "\\d+" to be "12345"
```

#### Verify `<element>` `<elementState>` / Verify `<element>` is `<elementState>`
**Description:** Verifies the state of an element (exist, visible, enabled, etc.).
**Example:**
```
Verify "loginButton" is enabled
```
**Notes:**
- States: exist, visible, enabled, not exists, not visible, not enabled, disabled

#### Verify `<element>` `<elementText>` `<elementState>` / Verify `<element>` `<elementText>` is `<elementState>`
**Description:** Verifies the state of an element with specific text.
**Example:**
```
Verify "button" "Submit" is visible
```

#### Verify `<element>` text is `<elementText>`
**Description:** Verifies that the element's text contains the expected value.
**Example:**
```
Verify "statusLabel" text is "Success"
```

---

### Proximity selector based steps

#### Check `<eleType>` closer `<proximity>` text `<text>` does not exist
**Description:** Asserts that an element of the given type, near another element with the specified proximity and text, does not exist.
**Example:**
```
Check "button" closer toRightOf text "Cancel" does not exist
```

#### Check text `<text>` closer `<proximity>` text `<proximityText>` exists / does not exists
**Description:** Asserts that text exists or does not exist near another text with the specified proximity.
**Example:**
```
Check text "Error" closer above text "Username" exists
Check text "Error" closer above text "Username" does not exists
```

---

### Check for text on page

#### Check text `<text>` exists / does not exists
**Description:** Asserts that the specified text exists or does not exist on the page.
**Example:**
```
Check text "Welcome" exists
Check text "Error" does not exists
```

---

### Interact with form elements

#### Clear `<textbox>` / Clear `<element>` text box
**Description:** Clears the value of the specified textbox or element.
**Example:**
```
Clear "username"
Clear "searchBox" text box
```

#### Click `<eleType>` closer `<proximity>` text `<text>`
**Description:** Clicks an element of the given type near another element with the specified proximity and text.
**Example:**
```
Click "button" closer toLeftOf text "Next"
```

#### Click `<eleType>` with text `<text>`
**Description:** Clicks an element of the given type with the specified text.
**Example:**
```
Click "button" with text "Submit"
```

#### Click `<element>` / Click on `<element>`
**Description:** Clicks the specified element.
**Example:**
```
Click "loginButton"
```

#### Click `<element>` `<elementText>` / Click on `<element>` `<elementText>` / Click `<element>` for `<elementText>`
**Description:** Clicks the specified element with the given text.
**Example:**
```
Click "button" "Submit"
```

#### Click `<text>` in spec memory
**Description:** Clicks an element whose selector/text was previously saved in spec memory.
**Example:**
```
Click "savedSelector" in spec memory
```

#### Click text `<text>` closer `<proximity>` text `<proximityText>`
**Description:** Clicks text near another text with the specified proximity.
**Example:**
```
Click text "Edit" closer below text "Profile"
```

#### Double click `<text>`
**Description:** Double-clicks the specified text.
**Example:**
```
Double click "filename.txt"
```

#### Focus text `<text>`
**Description:** Focuses the specified text element.
**Example:**
```
Focus text "Search"
```

#### Highlight text `<text>`
**Description:** Highlights the specified text element.
**Example:**
```
Highlight text "Important"
```

#### Press `<key>`
**Description:** Simulates a key press.
**Example:**
```
Press "Enter"
```

#### Scroll down `<intValue>`
**Description:** Scrolls down by the specified number of pixels.
**Example:**
```
Scroll down "200"
```

#### Scroll to `<element>`
**Description:** Scrolls to the specified element.
**Example:**
```
Scroll to "footer"
```

#### Select `<value>` from dropDown `<element>` / Select `<value>` from `<element>` dropdown
**Description:** Selects a value from a dropdown element.
**Example:**
```
Select "Option 1" from dropDown "countrySelector"
```

#### Write `<text>` from property into `<textbox>`
**Description:** Writes a value from an environment property into a textbox.
**Example:**
```
Write "USERNAME" from property into "username"
```

#### Write `<text>` from spec memory into `<textbox>`
**Description:** Writes a value from spec memory into a textbox.
**Example:**
```
Write "savedValue" from spec memory into "searchBox"
```

#### Write `<text>` into `<textbox>`
**Description:** Writes the specified text into a textbox.
**Example:**
```
Write "hello" into "searchBox"
```

#### Write `<text>` into `<textbox>` closer `<proximity>` text `<proximityText>`
**Description:** Writes text into a textbox near another text with the specified proximity.
**Example:**
```
Write "value" into "inputBox" closer below text "Label"
```

#### Write `<text>` into `<textbox>` no error
**Description:** Writes text into a textbox, ignoring errors.
**Example:**
```
Write "optional" into "optionalField" no error
```

#### Write `<text>` into dateField with text `<textbox>`
**Description:** Writes text into a date field with the specified textbox label or selector.
**Example:**
```
Write "05/08/2020" into dateField with text '{"placeholder":"Filter by Created Date"}'
```

#### Write `<text>` into textbox array `<textArray>` in data table
**Description:** Writes text into each textbox in an array, handling pagination if needed.
**Example:**
```
Write "value" into textbox array "fieldArray" in data table
```

#### Enter `<value>` to `<element>` text box / Enter `<value>` to `<element>`
**Description:** Enters a value into the specified element's text box.
**Example:**
```
Enter "admin" to "username"
```

#### Clear and enter `<value>` to `<element>` text box / Clear and enter `<value>` to `<element>`
**Description:** Clears and then enters a value into the specified element's text box.
**Example:**
```
Clear and enter "admin" to "username"
```

#### Validate number of `<typeRecords>` records and pagination
**Description:** Validates the number of records and pagination controls for a table or list.
**Example:**
```
Validate number of "user" records and pagination
```

#### Upload `<filePath>` file to `<element>`
**Description:** Uploads a file to the specified element (file input).
**Example:**
```
Upload "testfile.pdf" file to "fileInput"
```
**Notes:**
- If `file_upload_directory` is set, the file path is resolved relative to it.

---

### Store element text/value to the scenario state

#### Save `<element>` as `<elementTextKey>` / Save `<element>` text as `<elementTextKey>`
**Description:** Saves the text or value of an element to scenario state for later use.
**Example:**
```
Save "usernameLabel" as "savedUsername"
```

---

### Wait for something

#### Wait `<milliseconds>` milliseconds / Wait `<milliseconds>`ms
**Description:** Waits for the specified number of milliseconds.
**Example:**
```
Wait "500" milliseconds
```

#### Wait `<seconds>` seconds / Wait for `<seconds>` seconds
**Description:** Waits for the specified number of seconds.
**Example:**
```
Wait "5" seconds
```

#### Wait for `<text>`
**Description:** Waits until the specified text appears on the page.
**Example:**
```
Wait for "Loading complete"
```

---

### Store page object element(s)

#### On `<pageName>` page
**Description:** Sets the current page context for page object lookups.
**Example:**
```
On "login" page
```

---

**Note:** For proximity selectors, valid values include: `toLeftOf`, `toRightOf`, `above`, `below`, `near`, `within`.

**Important:** When using dynamic values (such as variables, environment properties, or scenario state), always enclose them in double quotes. For example:
```
Write "{USERNAME}" into "username"
Select "{COUNTRY}" from dropDown "countrySelector"
```
This ensures that dynamic values are correctly parsed and substituted during test execution.

For more advanced usage and dynamic values, see the README and code comments.
