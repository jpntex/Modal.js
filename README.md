# Modal.js
Create confirm/alert modals swiftly!

### Check out the examples page:
[https://jpntex.github.io/Modal.js/](https://jpntex.github.io/Modal.js/ "Examples")

## How To Use
```html
...
<link rel="stylesheet" href="css/modal.css">
</head>

<body>
...
<script src="modal.js"></script>
<script>
// Confirm modal options (default settings)
Modal.confirm({
  title: 'Notification',    // modal title
  message: '',              // modal message
  autoOpen: true,           // show modal when declared
  closeOnEscape: true,      // close when escape key pressed
  closeOnBlur: true,        // close when overlay is clicked
  animated: true,           // animate modal
  buttonClass: '',          // confirm button class
  buttonLbl: 'OK',          // confirm button label
  cancelLbl: 'Cancel'       // cancel button label
  onConfirm: function() {}, // callback if the user confirms
  onCancel: function() {},  // callback if the modal is closed without the 
  onClose: function() {},   // callback on modal close, called allways after confirm or cancel
});
// Alert modal options (default settings)
Modal.alert({
  title: 'Notification',  // modal title
  message: '',            // modal message
  autoOpen: true,         // show modal when declared
  closeOnEscape: true,    // close when escape key pressed
  closeOnBlur: true,      // close when overlay is clicked
  animated: true,         // animate modal
  buttonLbl: 'OK',        // alert button label
  onClose: function() {}, // callback on modal close
});
</script>
</body>
```

## License
```
Copyright (c) João Teixeira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
