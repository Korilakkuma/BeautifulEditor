BeautifulEditor
=========
  
HTML5 WYSIWYG Editor Library
  
## Demo
  
* [Beautiful Editor](https://korilakkuma.github.io/BeautifulEditor/)
  
## Installation
  
    $ npm install beautiful-editor
  
or,
  
    $ bower install beautiful-editor
  
## Usage
  
The 1st, BeautifulEditor class is required.
  
    <script type="text/javascript" src="BeautifulEditor.js"></script>
  
or,
  
    <script type="text/javascript" src="BeautifulEditor.min.js"></script>
  
Next, the instance of BeautifulEditor must be created.  
BeautifulEditor constructor requires 1 arguments.  
The 1st argument is the instance of HTMLIFrameElement.
  
    var beautifulEditor = null;

    try {
        // Create the instance of BeautifulEditor
        beautifulEditor = new BeautifulEditor(document.querySelector('iframe'));
    } catch (error) {
        window.alert(error.message);
        return;
    }
  
## API
  
### backColor
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.backColor(document.querySelector('[type="color"]'), 'change');
  
### backgroundColor
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.backgroundColor(document.querySelector('[type="color"]'), 'change');
  
### bold
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.bold(document.querySelector('button'), 'click');
  
### code
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.code(document.querySelector('button'), 'click');
  
### copy
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.copy(document.querySelector('button'), 'click');
  
### createLink
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type. The 3rd argument is the instance of HTMLInputElement.
  
    beautifulEditor.createLink(document.querySelector('button'), 'click', document.querySelector('[type="url"]'));
  
### cut
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.cut(document.querySelector('button'), 'click');
  
### delete
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.delete(document.querySelector('button'), 'click');
  
### fontName
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.fontName(document.querySelector('select'), 'change');
  
### fontSize
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.fontSize(document.querySelector('select'), 'change');
  
### foreColor
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.foreColor(document.querySelector('[type="color"]'), 'change');
  
### indent
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.indent(document.querySelector('button'), 'click');
  
### insertBlockquote
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.insertBlockquote(document.querySelector('button'), 'click');
  
### insertCheckbox
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.insertCheckbox(document.querySelector('button'), 'click');
  
### insertHorizontalRule
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.insertHorizontalRule(document.querySelector('button'), 'click');
  
### insertImage
  
The 1st argument is one of URL, Data URL, Object URL.
  
    document.querySelector('[type="file"').addEventListener('change', function(event) {
        var file = event.target.files[0];

        if (!(file instanceof Blob)) {
            window.alert('Please Upload File');
        } else if (file.type.indexOf('image') === -1) {
            window.alert('Please Upload Image File');
        } else {
            var reader = new FileReader();

            reader.onload = function() {
                beautifulEditor.insertImage(this.result);

                event.target.value = '';
            };

            reader.readAsDataURL(file);
        }
    }, false);
  
### insertOrderedList
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.insertOrderedList(document.querySelector('button'), 'click');
  
### insertUnorderedList
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.insertUnorderedList(document.querySelector('button'), 'click');
  
### insertParagraph
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.insertParagraph(document.querySelector('button'), 'click');
  
### italic
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.italic(document.querySelector('button'), 'click');
  
### justifyCenter
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.justifyCenter(document.querySelector('button'), 'click');
  
### justifyFull
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.justifyFull(document.querySelector('button'), 'click');
  
### justifyLeft
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.justifyLeft(document.querySelector('button'), 'click');
  
### justifyRight
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.justifyRight(document.querySelector('button'), 'click');
  
### outdent
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.outdent(document.querySelector('button'), 'click');
  
### paste
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.paste(document.querySelector('button'), 'click');
  
### redo
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type. The 3rd argument is callback function.
  
    beautifulEditor.redo(document.querySelector('button'), 'click', function() {
        window.alert('Cannot Redo');
    });
  
### removeFormat
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.removeFormat(document.querySelector('button'), 'click');
  
### selectAll
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.selectAll(document.querySelector('button'), 'click');
  
### strikeThrough
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.strikeThrough(document.querySelector('button'), 'click');
  
### subscript
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.subscript(document.querySelector('button'), 'click');
  
### superscript
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.superscript(document.querySelector('button'), 'click');
  
### surround
  
The 1st argument is string as HTML tag.
  
    beautifulEditor.surround('h1');
  
### underline
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.underline(document.querySelector('button'), 'click');
  
### undo
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type. The 3rd argument is callback function.
  
    beautifulEditor.undo(document.querySelector('button'), 'click', function() {
        window.alert('Cannot Undo');
    });
  
### unlink
  
The 1st argument is the instance of EventTarget. The 2nd argument is string as event type.
  
    beautifulEditor.unlink(document.querySelector('button'), 'click');
  
### toHTML
  
Change to edit by WYSIWYG.
  
    beautifulEditor.toHTML();
  
### toText
  
Change to edit by HTML.
  
    beautifulEditor.toText();
  
### export
  
Export edited content as HTML string.
  
    beautifulEditor.export();
  
## License
  
Copyright (c) 2013 Tomohiro IKEDA (Korilakkuma)  
Released under the MIT license
  
