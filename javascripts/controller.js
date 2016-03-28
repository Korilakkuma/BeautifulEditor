(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var beautifulEditor = null;

        try {
            beautifulEditor = new BeautifulEditor(document.querySelector('iframe'));
        } catch (error) {
            window.alert(error.message);
            return;
        }

        beautifulEditor.foreColor(document.getElementById('color-fore-color'), 'change');
        beautifulEditor.backColor(document.getElementById('color-back-color'), 'change');
        beautifulEditor.fontName(document.getElementById('select-font-name'), 'change');
        beautifulEditor.fontSize(document.getElementById('select-font-size'), 'change');
        beautifulEditor.bold(document.getElementById('button-bold'), 'click');
        beautifulEditor.italic(document.getElementById('button-italic'), 'click');
        beautifulEditor.underline(document.getElementById('button-underline'), 'click');
        beautifulEditor.strikeThrough(document.getElementById('button-strike-through'), 'click');
        beautifulEditor.subscript(document.getElementById('button-subscript'), 'click');
        beautifulEditor.superscript(document.getElementById('button-superscript'), 'click');
        beautifulEditor.indent(document.getElementById('button-indent'), 'click');
        beautifulEditor.outdent(document.getElementById('button-outdent'), 'click');
        beautifulEditor.insertOrderedList(document.getElementById('button-ordered-list'), 'click');
        beautifulEditor.insertUnorderedList(document.getElementById('button-unordered-list'), 'click');
        beautifulEditor.insertParagraph(document.getElementById('button-paragraph'), 'click');
        beautifulEditor.insertHorizontalRule(document.getElementById('button-horizontal-rule'), 'click');
        beautifulEditor.justifyCenter(document.getElementById('button-align-center'), 'click');
        beautifulEditor.justifyFull(document.getElementById('button-align-justify'), 'click');
        beautifulEditor.justifyLeft(document.getElementById('button-align-left'), 'click');
        beautifulEditor.justifyRight(document.getElementById('button-align-right'), 'click');
        beautifulEditor.removeFormat(document.getElementById('button-remove-format'), 'click');
        beautifulEditor.copy(document.getElementById('button-copy'), 'click');
        beautifulEditor.cut(document.getElementById('button-cut'), 'click');
        beautifulEditor.paste(document.getElementById('button-paste'), 'click');
    }, true);

})();
