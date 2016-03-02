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
    }

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
            }, false);
        }
    };

    // Export
    global.BeautifulEditor = BeautifulEditor;

})(window);
