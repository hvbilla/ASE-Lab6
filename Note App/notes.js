const fs =  require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json')
        return JSON.parse(notesString);
    } catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addCustomer = (inum, Cname, mailID,CLname) => {
    var notes = fetchNotes();
    var note = {inum, Cname, mailID,CLname }

    var duplicateNotes =  notes.filter((note) => {
        return note.inum === inum;
    });

    if (duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note
    }

};

var updateCustomer =(inum,Cname,CLname,mailID) => {
    var updateNote = {inum,Cname,CLname,mailID};
    removeCustomer(inum);
    var newNote = fetchNotes();
    newNote.push(updateNote);
    saveNotes(newNote);
    console.log("Note Updated Successfully");
    return updateNote;
}



var getAllCustomers = () => {
    return fetchNotes();
};


var getCustomer = (inum) => {

    var notes = fetchNotes();

    var getNotes =  notes.filter((note) => {
        return note.inum === inum;
    });

    return getNotes[0]

};



var removeCustomer = (inum) => {

    var notes = fetchNotes();

    var filteredNotes =  notes.filter((note) => {
        return note.inum !== inum;
    });

    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length

};

var logNote = (note) => {
    console.log('--');
    console.log(`Id of the customer: ${note.inum}`);
    console.log(`Name of the customer: ${note.Cname}`);
    console.log(`Customer's LastName: ${note.CLname}`);
    console.log(`Mail id of the customer: ${note.mailID}`);
};

module.exports = {
    addCustomer, getAllCustomers, removeCustomer, getCustomer,logNote, updateCustomer
};
