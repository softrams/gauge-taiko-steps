# List of available steps

## Accessbility Steps
- Audit page for accessibility
  - or alternatively, Check accessibility for the page

## Browser steps
- Emulate device `deviceType`
- Emulate network `networkType`
- Emulate timezone `timezone`
- Save screenshot
- Set screen size as width `width` height `height`

## Web page steps

### Page navigation
- Goto `url` _or_ Open `url`
- Goto `url` in new tab _or_ Open `url` in new tab

### Switch to window tab
- Switch to `url` _or_ Switch to `url` window

### Close window tab
- Close window tab _or_ Close window

### Check for elements with specific text and other conditions
- Check `eleType` with text `text` and value `idx` matching `regex` to be `val`
- Check `eleType` with text `text` does not exists
- Check `eleType` with text `text` exists
- Check `eleType` with text `text` is disabled
- Check `eleType` with text `text` is enabled
- Check `eleType` with text `text` matches `regex`
- Verify `element` `elementText` `elementState` _or_ Verify `element` `elementText` is `elementState`
- Verify `element` text is `elementText`

### Proximity selector based steps
- Check `eleType` closer `proximity` text `text` does not exist
- Check text `text` closer `proximity` text `proximityText` does not exists
- Check text `text` closer `proximity` text `proximityText` exists

### Check for text on page
- Check text `text` does not exists
- Check text `text` exists

### Interact with form elements
- Clear `textbox` _or_ Clear `element` text box
- Click `eleType` closer `proximity` text `text`
- Click `eleType` with text `text`, Click `element with text elementText`, Click on `element with text elementText` _or_ Click `element` for `elementText`
- Click `text` _or_ Click on `text`
- Click `text` in spec memory
- Click text `text` closer `proximity` text `proximityText`
- Double click `text`
- Focus text `text`
- Highlight text `text`
- Press `key`
- Scroll down `intValue`
- Scroll to `element`
- Select `value` from dropDown `dropDown` _or_ Select `value` from `element` dropdown
- Write `text` from property into `textbox`
- Write `text` from spec memory into `textbox`
- Write `text` into `textbox`
- Write `text` into `textbox` closer `proximity` text `proximityText`
- Write `text` into `textbox` no error
- Write `text` into dateField with text `textbox`
- Write `text` into textbox array `textArray` in data table
- Enter `value` to `element` text box _or_ Enter `value` to `element`
- Validate number of `typeRecords` records and pagination

### Store element text/value to the scenario state
- Save `element` as `elementTextKey` _or_ Save `element` text as `elementTextKey`

### Wait for something
- Wait `milliseconds` milliseconds
  - or alternatively, Wait `milliseconds`ms
- Wait `seconds` seconds _or_ Wait for `seconds` seconds
- Wait for `text`

### Store page object element(s)
- On `pageName` page
  