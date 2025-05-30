# Gauge Taiko Step Examples

This document illustrates each available step in the library along with a basic usage example.

## Accessibility Steps

- **Audit page for accessibility**

```spec
Audit page for accessibility
```

Alternatively you can use:

```spec
Check accessibility for the page
```

## Browser Steps

- **Emulate device `<deviceType>`**

```spec
Emulate device "iPad Pro landscape"
```

- **Emulate network `<networkType>`**

```spec
Emulate network "Good3G"
```

- **Emulate timezone `<timezone>`**

```spec
Emulate timezone "America/New_York"
```

- **Save screenshot**

```spec
Save screenshot
```

- **Set screen size as width `<width>` height `<height>`**

```spec
Set screen size as width "1600" height "900"
```

- **Set viewport size as width `<width>` height `<height>`**

```spec
Set viewport size as width "1600" height "900"
```

## Web Page Steps

### Page navigation

- **Goto `<url>`**

```spec
Goto "https://example.com"
```

- **Goto `<url>` in new tab**

```spec
Goto "https://example.com" in new tab
```

### Switch to window tab

- **Switch to `<url>`**

```spec
Switch to "example" window
```

### Close window tab

- **Close window tab**

```spec
Close window tab
```

### Check for elements with specific text and other conditions

- **Check `<eleType>` with text `<text>` and value `<idx>` matching `<regex>` to be `<val>`**

```spec
Check "span" with text "Status" and value "1" matching "\\d+" to be "200"
```

- **Check `<eleType>` with text `<text>` does not exists**

```spec
Check "button" with text "Delete" does not exists
```

- **Check `<eleType>` with text `<text>` exists**

```spec
Check "button" with text "Submit" exists
```

- **Check `<eleType>` with text `<text>` is disabled**

```spec
Check "button" with text "Save" is disabled
```

- **Check `<eleType>` with text `<text>` is enabled**

```spec
Check "button" with text "Save" is enabled
```

- **Check `<eleType>` with text `<text>` matches `<regex>`**

```spec
Check "div" with text "Version: 1.2.3" matches "\\d+\\.\\d+\\.\\d+"
```

- **Verify `<element>` `<elementText>` `<elementState>`**

```spec
Verify button "Login" is visible
```

- **Verify `<element>` text is `<elementText>`**

```spec
Verify label text is "Hello World"
```

### Proximity selector based steps

- **Check `<eleType>` closer `<proximity>` text `<text>` does not exist**

```spec
Check button closer toRightOf text "Cancel" does not exist
```

- **Check text `<text>` closer `<proximity>` text `<proximityText>` does not exists**

```spec
Check text "Error" closer above text "Password" does not exists
```

- **Check text `<text>` closer `<proximity>` text `<proximityText>` exists**

```spec
Check text "User" closer below text "Name" exists
```

### Check for text on page

- **Check text `<text>` does not exists**

```spec
Check text "404" does not exists
```

- **Check text `<text>` exists**

```spec
Check text "Welcome" exists
```

### Interact with form elements

- **Clear `<textbox>`**

```spec
Clear "search"
```

- **Click `<eleType>` closer `<proximity>` text `<text>`**

```spec
Click button closer below text "Profile"
```

- **Click `<eleType>` with text `<text>`**

```spec
Click button with text "Submit"
```

- **Click `<text>`**

```spec
Click "Submit"
```

- **Click `<text>` in spec memory**

```spec
Click "storedButton" in spec memory
```

- **Click text `<text>` closer `<proximity>` text `<proximityText>`**

```spec
Click text "Edit" closer toLeftOf text "Delete"
```

- **Double click `<text>`**

```spec
Double click "Open"
```

- **Focus text `<text>`**

```spec
Focus text "Username"
```

- **Highlight text `<text>`**

```spec
Highlight text "Important"
```

- **Press `<key>`**

```spec
Press Enter
```

- **Scroll down `<intValue>`**

```spec
Scroll down "200"
```

- **Scroll to `<element>`**

```spec
Scroll to "footer"
```

- **Select `<value>` from dropDown `<dropDown>`**

```spec
Select "Male" from dropDown "gender"
```

- **Write `<text>` from property into `<textbox>`**

```spec
Write "USERNAME" from property into "username"
```

- **Write `<text>` from spec memory into `<textbox>`**

```spec
Write "storedValue" from spec memory into "username"
```

- **Write `<text>` into `<textbox>`**

```spec
Write "hello" into "search"
```

- **Write `<text>` into `<textbox>` closer `<proximity>` text `<proximityText>`**

```spec
Write "name" into "input" closer below text "First Name"
```

- **Write `<text>` into `<textbox>` no error**

```spec
Write "optional" into "comments" no error
```

- **Write `<text>` into dateField with text `<textbox>`**

```spec
Write "05/08/2020" into dateField with text "start date"
```

- **Write `<text>` into textbox array `<textArray>` in data table**

```spec
Write "value" into textbox array "items" in data table
```

- **Enter `<value>` to `<element>` text box**

```spec
Enter "John" to "firstName" text box
```

- **Validate number of `<typeRecords>` records and pagination**

```spec
Validate number of "results" records and pagination
```

### Store element text/value to the scenario state

- **Save `<element>` as `<elementTextKey>`**

```spec
Save "#title" as "pageTitle"
```

### Wait for something

- **Wait `<milliseconds>` milliseconds**

```spec
Wait "500" milliseconds
```

- **Wait `<seconds>` seconds**

```spec
Wait "5" seconds
```

- **Wait for `<text>`**

```spec
Wait for "Loading"
```

### Store page object element(s)

- **On `<pageName>` page**

```spec
On "Login" page
```

### Additional actions

- **Click `<element>`**

```spec
Click "#submit"
```

- **Click `<element>` `<elementText>`**

```spec
Click button "Submit"
```

- **Clear `<element>` text box**

```spec
Clear "username" text box
```

- **Enter `<value>` to `<element>` text box**

```spec
Enter "john" to "firstName" text box
```

- **Clear and enter `<value>` to `<element>` text box**

```spec
Clear and enter "john" to "firstName" text box
```

- **Verify `<element>` `<elementState>`**

```spec
Verify "#message" visible
```

- **Verify `<element>` `<elementText>` `<elementState>`**

```spec
Verify button "Submit" is enabled
```

- **Verify `<element>` text is `<elementText>`**

```spec
Verify heading text is "Dashboard"
```

- **Save `<element>` text as `<elementTextKey>`**

```spec
Save heading text as "header"
```

- **Upload `<filePath>` file to `<element>`**

```spec
Upload "path/to/file.txt" file to "#upload"
```

- **Wait `<seconds>` seconds**

```spec
Wait 2 seconds
```

