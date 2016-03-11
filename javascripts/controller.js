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
    }, true);

})();
