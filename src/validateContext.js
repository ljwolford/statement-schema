/**
 * The context schema.
  *
 */

(   //begin closure
module.exports = function (context, cb) {
    // console.log(`validating context: \n${JSON.stringify(context)}`);
    // So here is my walk through
    const fs = require('fs');
    const V = require('ajv');
    const v = new V();

    let msg = '';
    let str = __dirname;
    str = str.replace('src', 'test/schemas/');

    let valid = v.validate(require(str + 'context'), context);

    if (!valid) {
        msg += 'context errors - ' + v.errorsText();
    } else {
        msg += 'context - validated';
    }
    // additional testing for intructor and team because of agent/group difficulties
    if (context.instructor) {
        let instrPath = str;
        if (context.instructor.objectType === 'Group') {
            // verifiy identified group
            if (context.instructor.mbox || context.instructor.mbox_sha1sum || context.instructor.openid || context.instructor.account) {
                instrPath += 'idgroup';
                msg += '\n\t\tinstructor Identified Group - '
            } else {    // verify anonymous group
                instrPath += 'anongroup';
                msg += '\n\t\tinstructor Anonymous Group - '
            }
        } else {    // verify agent
            instrPath += 'agent';
            msg += '\n\t\tinstructor Agent - '
        }
        let okay = v.validate(require(instrPath), context.instructor);
        if (!okay) {
            msg += v.errorsText();
        } else {
            msg += 'validated';
        }
    }
    if (context.team) {
        let teamPath = str;
        if (context.team.mbox || context.team.mbox_sha1sum || context.team.openid || context.team.account) {
            teamPath += 'idgroup';
            msg += '\n\t\tteam Identified Group - '
        } else {
            teamPath += 'anongroup';
            msg += '\n\t\tteam Anonymous Group - '
        }
        let check = v.validate(require(teamPath), context.team);
        if (!check) {
            msg += v.errorsText();
        } else {
            msg += 'validated';
        }
    }

    cb(null, msg);
}
);  // end closure
