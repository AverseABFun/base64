"use strict";
const Base64 = {
    _alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", // You usually only want to change the last two if you want to change the specification used, this implementaion is using base64url(https://datatracker.ietf.org/doc/html/rfc4648#section-5), and you can see the differences here(https://en.wikipedia.org/wiki/Base64#Variants_summary_table)
    _delimeter: "=", // A single character, or false if no character.
    encode: function(data) { // Currently only supports strings
        let ints = [];
        for (let i = 0; i<data.length; i++) {
            let code = data[i].codePointAt(0);
            ints.push((code & 0xff00).toString(2), (code & 0xff).toString(2));
        }
        ints = ints.join("");
        ints = ints.match(/.{1,6}/g);
        for (let i in ints) {
            if (ints[i]==this._delimeter) {
                continue;
            }
            if (ints[i].length<6) {
                ints.push(this._delimeter)
            }
            if (ints[i].length<4) {
                ints.push(this._delimeter)
            }
            ints[i] = ints[i].padEnd(6,"0")
            ints[i] = parseInt(ints[i], 2);
            ints[i] = this._alphabet[ints[i]];
        }
        return ints.join("");
    },
    decode: function(base64) {

    }
};
Base64.encode("Man")