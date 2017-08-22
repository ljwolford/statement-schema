/**
 * This function uses glob to gather all the example statement stored in a user specified folder in /test/statements/ and process just them against the validator.
 */

(   // begin closure
    // Tom's Stuff
    module.exports = function getFolder (folder, cb) {
        const path = require('path');
        const parseFiles = require('./parseFiles.js');
        const glob = require('glob');
        var stmts = [];
        let count = 0;
        glob.sync(`./test/statements/${folder}/**/*.json`).forEach((file) => {
            count += 1;
            stmts.push(file);
        });
        // console.log(stmts);
        parseFiles(stmts, cb);
    }

);  // end closure