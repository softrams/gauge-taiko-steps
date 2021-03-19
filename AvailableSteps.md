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
- Goto `url`

### Check for elements with specific text and other conditions
- Check `eleType` with text `text` and value `idx` matching `regex` to be `val`
- Check `eleType` with text `text` does not exists
- Check `eleType` with text `text` exists
- Check `eleType` with text `text` is disabled
- Check `eleType` with text `text` is enabled
- Check `eleType` with text `text` matches `regex`

### Proximity selector based steps
- Check `eleType` closer `proximity` text `text` does not exist
- Check text `text` closer `proximity` text `proximityText` does not exists
- Check text `text` closer `proximity` text `proximityText` exists

### Check for text on page
- Check text `text` does not exists
- Check text `text` exists

### Interact with form elements
- Clear `textbox`
- Click `eleType` closer `proximity` text `text`
- Click `eleType` with text `text`
- Click `text`
- Click `text` in spec memory
- Click text `text` closer `proximity` text `proximityText`
- Double click `text`
- Focus text `text`
- Highlight text `text`
- Press `key`
- Scroll down `intValue`
- Select `value` from dropDown `dropDown`
- Write `text` from property into `textbox`
- Write `text` from spec memory into `textbox`
- Write `text` into `textbox`
- Write `text` into `textbox` closer `proximity` text `proximityText`
- Write `text` into `textbox` no error
- Write `text` into dateField with text `textbox`
- Write `text` into textbox array `textArray` in data table
- Validate number of `typeRecords` records and pagination

### Wait for something
- Wait `milliseconds` milliseconds
  - or alternatively, Wait `milliseconds`ms
- Wait for `text`
  