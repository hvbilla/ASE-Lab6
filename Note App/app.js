
const fs =  require('fs');
const yargs = require('yargs');

const notes = require('./notes.js');

const idOptions = {
    describe: 'identification of customer',
    demand : true,
    alias : 'inum'
}

const nameOptions = {
    describe: 'Cust Name',
    demand : true,
    alias : 'Cname'
}


const emailOptions = {
    describe: 'Customer Email-ID',
    demand: true,
    alias: 'mailID'
}
const LastnameOptions = {
    describe: 'Cust Last Name',
    demand : true,
    alias : 'CLname'
}

const argv =  yargs

    .command('add','Adding a note to the particular customer',{
        inum: idOptions,
        Cname: nameOptions,
        mailID: emailOptions,
        CLname: LastnameOptions
    })
    .command('list','It displays all the list of notes')
    .command('read','Note will be read',{
        inum: idOptions
    })
    .command('remove','Note will be removed',{
        inum: idOptions
    })
    .command('update','Existing note will be updated',{
        inum: idOptions,
        Cname: nameOptions,
        mailID: emailOptions,
        CLname: LastnameOptions
    })
    .help()
    .argv;

var command = yargs.argv._[0];


if (command === 'add'){
    var note = notes.addCustomer(argv.inum,argv.Cname,argv.mailID,argv.CLname);
    if (note){
        notes.logNote(note);
    } else{
        console.log("it's already defined notes");
    }
}

else if (command === 'list') {
    var AllNotes = notes.getAllCustomers();
    console.log(`Printing ${AllNotes.length} note(s).`);
    AllNotes.forEach((note)=>{
        notes.logNote(note);
    });
}

else if (command === 'read') {
    var note = notes.getCustomer(argv.inum);
    if(note){
        notes.logNote(note);
    }
    else{
        console.log("Note not found");
    }
}
else if (command === 'remove') {
    var noteRemoved = notes.removeCustomer(argv.inum);
    var message = noteRemoved ? 'the note is detached' : 'Note not found';
    console.log(message);
}
else if (command === 'update'){
    var updateNote = notes.updateCustomer(argv.inum,argv.Cname,argv.CLname,argv.mailID);
    if(updateNote){
        notes.logNote(updateNote);
        console.log('updation is success');
    }
    else{
        console.log('failed to update');
    }
}

else{
    console.log('unrecognised command note');
}
