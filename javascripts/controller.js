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
    }, true);

})();
