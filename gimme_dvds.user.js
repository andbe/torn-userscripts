// ==UserScript==
// @name         Torn: Gimme dvds
// @namespace    hemicrania.gimme_dvds
// @version      0.0.1
// @description  Gimme dvds!
// @author       Hemicrania, copied from Lugburz's code
// @match        https://www.torn.com/shops.php?step=super*
// @updateURL    https://github.com/andbe/torn-userscripts/raw/master/gimme_dvds.user.js
// @grant        none
// ==/UserScript==

function addButton() {
    if ($('div.content-title > h4').size() > 0 && $('#buyDVDBtn').size() < 1) {
        const button = `<button id="buyDVDBtn" style="color: var(--default-blue-color); cursor: pointer; margin-right: 0;">Gimme DVDs!</button>
                        <span id="buyDVDResult" style="font-size: 12px; font-weight: 100;"></span>`;
        $('div.content-title > h4').append(button);
        $('#buyDVDBtn').on('click', async () => {
            $('#buyDVDResult').text('');
            await getAction({
                type: 'post',
                action: 'shops.php',
                data: {
                    step: 'buyShopItem',
                    ID: 956,
                    amount: 100
                },
                success: (str) => {
                    try {
                        const msg = JSON.parse(str);
                        $('#buyDVDResult').html(msg.text).css('color', msg.success ? 'green' : 'red');
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        });
    }
};

(function() {
    'use strict';

    // Your code here...
    addButton();
})();
