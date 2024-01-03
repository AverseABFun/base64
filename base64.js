"use strict";
/*************************\
 * This was written by   *
 * Arthur Beck, aka      *
 * AverseABFun.          *
 * Please don't remove   *
 * these credits!        *
\*************************/
const Base64 = {
    _alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", // You usually only want to change the last two if you want to change the specification used, this implementaion is using base64url(https://datatracker.ietf.org/doc/html/rfc4648#section-5), and you can see the differences here(https://en.wikipedia.org/wiki/Base64#Variants_summary_table)
    // also MAKE SURE that each character only appears once, otherwise it messes with decoding
    _delimeter: "=", // A single character, or false if no character.
    encode: function(data) { // Currently only supports strings
        let ints = [];
        for (let i = 0; i<data.length; i++) {
            let code = data.codePointAt(i);
            ints.push((code & 0xff00).toString(2), (code & 0xff).toString(2));
        }
        ints = ints.join("");
        ints = ints.match(/.{1,6}/g);
        for (let i in ints) {
            if (ints[i]==this._delimeter && this._delimeter) {
                continue;
            }
            if (ints[i].length==2 && this._delimeter) {
                ints.push(this._delimeter);
            }
            if (ints[i].length<=4 && this._delimeter) {
                ints.push(this._delimeter);
            }
            ints[i] = ints[i].padEnd(6,"0");
            ints[i] = parseInt(ints[i], 2);
            ints[i] = this._alphabet[ints[i]];
        }
        return ints.join("");
    },
    decode: function(base64) {
        let ints = base64.split("");
        for (let i = 0; i < ints.length; i++) {
            if (ints[i] == this._delimeter) {
                ints[i-1] = ints[i-1].slice(0, ints[i-1].length-2);
                ints.splice(i, 1);
                continue;
            }
            if (!this._alphabet.includes(ints[i])) {
                throw new TypeError(`invalid character '${ints[i]}' in base64 string '${base64}'`);
            }
            ints[i] = this._alphabet.indexOf(ints[i]).toString(2).padStart(6,'0');
        }
        ints = ints.join('');
        ints = ints.match(/.{1,8}/g)
        for (let i in ints) {
            if (ints[i] == this._delimeter) {
                ints.splice(i,1);
                continue;
            }
            ints[i] = String.fromCodePoint(parseInt(ints[i],2));
        }
        return ints.join('');
    }
};
if (typeof window === 'undefined') {
    let testVal = Base64.encode("test");
    console.log(testVal);
    console.log(Base64.decode(testVal));
}