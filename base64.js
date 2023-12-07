"use strict";
const Base64 = {
    _alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", // You usually only want to change the last two if you want to change the specification used, this implementaion is using base64url(https://datatracker.ietf.org/doc/html/rfc4648#section-5), and you can see the differences here(https://en.wikipedia.org/wiki/Base64#Variants_summary_table)
    _delimeter: "=", // A single character, or false if no character.
    encode: function(data) {
        data = new ReadableStream(data);

    },
    decode: function(base64) {

    }
};