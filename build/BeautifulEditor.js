/**
 * BeautifulEditor.js
 * @fileoverview HTML5 WYSIWYG Editor Library
 *
 * Copyright (c) 2013 Tomohiro IKEDA (Korilakkuma)
 * Released under the MIT license
 */
 
 
 
(function(global) {
    'use strict';

    /**
     * This contructor enables to edit iframe.
     * @param {HTMLIFrameElement} iframe This argument is the instance of HTMLIFrameElement for edit.
     * @contructor
     */
    function BeautifulEditor(iframe) {
        this.iframe          = null;
        this.contentWindow   = null;
        this.contentDocument = null;

        if (iframe instanceof HTMLIFrameElement) {
            this.iframe          = iframe;
            this.contentWindow   = iframe.contentWindow;
            this.contentDocument = iframe.contentDocument;
        } else {
            throw new Error('The constructor requires the instance of HTMLIFrameElement.');
        }

        this.contentDocument.body.contentEditable = true;
        this.contentDocument.designMode           = 'on';

        this.editMode = BeautifulEditor.EDIT_MODES.HTML;

        this.range = null;

        /*
        this.range = {
            'startContainer': null,
            'startOffset'   : 0,
            'endContainer'  : null,
            'endOffset'     : 0
        };
        */

        this.histories      = [];
        this.historyPointer = 0;

        this.histories[this.historyPointer] = this.contentDocument.body.outerHTML;

        this.currentBackgroundColor = 'rgba(255, 255, 255, 1.0)';
    }

    /**
     * Class (Static) properties
     */
    BeautifulEditor.EDIT_MODES      = {};
    BeautifulEditor.EDIT_MODES.HTML = 'html';
    BeautifulEditor.EDIT_MODES.TEXT = 'text';

    /**
     * This method is getter for window object of iframe.
     * @return {Window} This is returned as window object of iframe.
     */
    BeautifulEditor.prototype.getWindow = function() {
        return this.contentWindow;
    };

    /**
     * This method is getter for HTMLDocument of iframe.
     * @return {HTMLDocument} This is returned as HTMLDocument of iframe.
     */
    BeautifulEditor.prototype.getDocument = function() {
        return this.contentDocument;
    };

    /**
     * This method is getter for the instance of Selection.
     * @return {Selection} This is returned as the instance of Selection.
     */
    BeautifulEditor.prototype.getSelection = function() {
        return this.contentWindow.getSelection();
    };

    /**
     * This method is getter for the instance of Range.
     * @param {number} index This argument is in order to specify index of the selected range.
     * @return {Range} This is returned as the instance of Range.
     */
    BeautifulEditor.prototype.getRange = function(index) {
        var i = parseInt(index);

        var selection = this.contentWindow.getSelection();

        if ((i >= 0) && (i < selection.rangeCount)) {
            return selection.getRangeAt(i);
        }

        return null;
    };

    /**
     * This method holds range.
     * @param {number} index This argument is in order to specify index of the selected range.
     */
    BeautifulEditor.prototype.holdRange = function(index) {
        var range = this.getRange(index);

        if (range === null) {
            return;
        }

        this.range = range.cloneRange();

        /*
        this.range.startContainer = range.startContainer;
        this.range.startOffset    = range.startOffset;
        this.range.endContainer   = range.endContainer;
        this.range.endOffset      = range.endOffset;
        */
    };

    /**
     * This method reverts range.
     */
    BeautifulEditor.prototype.revertRange = function() {
        // var range = this.contentDocument.createRange();

        if (this.range !== null) {
            /*
            range.setStart(this.range.startContainer, this.range.startOffset);
            range.setEnd(this.range.endContainer, this.range.endOffset);
            */

            var selection = this.getSelection();

            selection.removeAllRanges();
            selection.addRange(this.range);
        }
    };

    /**
     * This method surround the selected range by tag.
     * @param {string} tag This argument is tag string.
     * @return {Element|null} This is returned as the instance of Element or null.
     */
    BeautifulEditor.prototype.surround = function(tag) {
        var selection = this.contentWindow.getSelection();

        if (selection.rangeCount > 0) {
            var range            = selection.getRangeAt(0);
            var element          = document.createElement(tag);
            var documentFragment = range.extractContents();

            element.appendChild(documentFragment);

            range.insertNode(element);

            return element;
        }

        return null;
    };

    /**
     * This method is in order to determine whether text is selected.
     * @return {boolean} If text is selected, this value is true. Otherwise, this value is false.
     */
    BeautifulEditor.prototype.isSelected = function() {
        var range = this.getRange(0);

        if (range === null) {
            return false;
        }

        return !range.collapsed;
    };

    /**
     * This method moves caret.
     * @param {boolean} isStart This argument is in order to select position of caret.
     */
    BeautifulEditor.prototype.moveCaret = function(isStart) {
        this.contentDocument.execCommand('selectAll', false, null);

        var selection = this.getSelection();
        var range     = this.getRange(0);

        if (range === null) {
            return;
        }

        range.collapse(Boolean(isStart));

        selection.removeAllRanges();
        selection.addRange(range);
    };

    /**
     * This method pushes history.
     */
    BeautifulEditor.prototype.pushHistory = function() {
        this.histories[++this.historyPointer] = this.contentDocument.body.outerHTML;

        if (this.historyPointer < (this.histories.length - 1)) {
            this.histories = this.histories.slice(0, (this.historyPointer + 1));
        }
    };

    /**
     * This method adds event listener for undo.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     * @param {function} callback This argument is invoked when undo failed.
     */
    BeautifulEditor.prototype.undo = function(eventTarget, eventType, callback) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                if (self.historyPointer === (self.histories.length - 1)) {
                    self.histories[self.historyPointer + 1] = self.contentDocument.body.outerHTML;
                }

                if (self.historyPointer > 0) {
                    self.contentDocument.body.outerHTML = self.histories[--self.historyPointer];
                } else {
                    if (Object.prototype.toString.call(callback) === '[object Function]') {
                        callback();
                    }
                }
            }, false);
        }
    };

    /**
     * This method adds event listener for redo.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     * @param {function} callback This argument is invoked when redo failed.
     */
    BeautifulEditor.prototype.redo = function(eventTarget, eventType, callback) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                if (self.historyPointer < (self.histories.length - 2)) {
                    self.contentDocument.body.outerHTML = self.histories[++self.historyPointer];
                } else {
                    if (Object.prototype.toString.call(callback) === '[object Function]') {
                        callback();
                    }
                }
            }, false);
        }
    };

    /**
     * This method adds event listener for background color.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.backgroundColor = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.body.style.backgroundColor = this.value;
                self.currentBackgroundColor = this.value;
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for fore color.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.foreColor = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('foreColor', false, this.value);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for background color.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.backColor = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('backColor', false, this.value);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for font name.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.fontName = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('fontName', false, this.value);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for font size.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.fontSize = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('fontSize', false, this.value);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for bold.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.bold = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('bold', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for italic.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.italic = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('italic', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for underline.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.underline = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('underline', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for strike through.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.strikeThrough = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('strikeThrough', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for subscript.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.subscript = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('subscript', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for superscript.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.superscript = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('superscript', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for code.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.code = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                var range = self.getRange(0);

                if (range === null) {
                    return;
                }

                var code = self.surround('code');
                var pre  = document.createElement('pre');

                pre.appendChild(code);

                range.insertNode(pre);

                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for indent.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.indent = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('indent', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for outdent.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.outdent = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('outdent', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for horizontal rule.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.insertHorizontalRule = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('insertHorizontalRule', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for ordered list.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.insertOrderedList = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('insertOrderedList', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for unordered list.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.insertUnorderedList = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('insertUnorderedList', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for paragraph.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.insertParagraph = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('insertParagraph', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for inserting checkbox.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.insertCheckbox = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                var label    = self.surround('label');
                var checkbox = document.createElement('input');

                checkbox.setAttribute('type', 'checkbox');

                label.insertBefore(checkbox, label.firstChild);

                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for blockquote.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.insertBlockquote = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.surround('blockquote');
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method inserts HTML.
     * @param {string} html This argument is string as HTML.
     */
    BeautifulEditor.prototype.insertHTML = function(html) {
        this.contentDocument.execCommand('insertHTML', false, String(html));
        this.pushHistory();
    };

    /**
     * This method inserts image.
     * @param {string} src This argument is one of path, Data URL, Object URL.
     */
    BeautifulEditor.prototype.insertImage = function(src) {
        this.contentDocument.execCommand('insertImage', false, String(src));
        this.pushHistory();
    };

    /**
     * This method adds event listener for link.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     * @param {HTMLInputElement} htmlInputElement This argument is in order to get URL.
     */
    BeautifulEditor.prototype.createLink = function(eventTarget, eventType, htmlInputElement) {
        var self = this;

        if ((eventTarget instanceof EventTarget) && (htmlInputElement instanceof HTMLInputElement)) {
            eventTarget.addEventListener(String(eventType), function(event) {
                var a = self.surround('a');

                if (a !== null) {
                    a.setAttribute('href',   htmlInputElement.value);
                    a.setAttribute('target', '_blank');
                }

                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for unlink.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.unlink = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('unlink', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for alignment in center.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.justifyCenter = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('justifyCenter', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for justification.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.justifyFull = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('justifyFull', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for alignment in left.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.justifyLeft = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('justifyLeft', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for alignment in right.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.justifyRight = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('justifyRight', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for removing format.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.removeFormat = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('removeFormat', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for copy.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.copy = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('copy', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for cut.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.cut = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('cut', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for paste.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.paste = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('paste', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method adds event listener for selection.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.selectAll = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('selectAll', false, null);
            }, false);
        }
    };

    /**
     * This method adds event listener for deleting.
     * @param {EventTarget} eventTarget This argument is the instance of EventTarget.
     * @param {string} eventType This argument is string for event type.
     */
    BeautifulEditor.prototype.delete = function(eventTarget, eventType) {
        var self = this;

        if (eventTarget instanceof EventTarget) {
            eventTarget.addEventListener(String(eventType), function(event) {
                self.contentDocument.execCommand('delete', false, null);
                self.pushHistory();
            }, false);
        }
    };

    /**
     * This method switches to editing by HTML.
     */
    BeautifulEditor.prototype.toHTML = function() {
        if (this.editMode === BeautifulEditor.EDIT_MODES.TEXT) {
            this.contentDocument.body.innerHTML = this.contentDocument.body.textContent;
            this.editMode = BeautifulEditor.EDIT_MODES.HTML;
        }
    };

    /**
     * This method switches to editing by text.
     */
    BeautifulEditor.prototype.toText = function() {
        if (this.editMode === BeautifulEditor.EDIT_MODES.HTML) {
            this.contentDocument.body.textContent = this.contentDocument.body.innerHTML;
            this.editMode = BeautifulEditor.EDIT_MODES.TEXT;
        }
    };

    /**
     * This method exports HTML.
     * @return {string} This is returned as HTML string.
     */
    BeautifulEditor.prototype.export = function() {
        return '<div style="background-color: ' + this.currentBackgroundColor + ';">' + this.contentDocument.body.innerHTML + '</div>';
    };

    // Export
    global.BeautifulEditor = BeautifulEditor;

})(window);
