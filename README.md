# Markdown Customizer

## Setup
### Local development
Clone repo, navigate into it, run below commands:
```
yarn install
yarn start
```
Then open browser at `http://localhost:3000/` to enjoy.

### Local test
Execute script to create a production build:
```
yarn build
```
A new folder `build/` will be appear at project root directory. Go to `chrome://extensions/`, turn on `Developer mode` and load it:

![image](https://user-images.githubusercontent.com/22311747/233917045-10696566-f499-410f-96c3-af255700aee3.png)

Now we can test extension directly at local machine.

## References
Documentation for Chrome extensions developers:
<br>
https://developer.chrome.com/docs/extensions/

Official samples for Chrome Extensions:
<br>
https://github.com/GoogleChrome/chrome-extensions-samples
