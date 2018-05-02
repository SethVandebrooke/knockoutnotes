var formatDate = d => d.getUTCFullYear() + "/" + d.getUTCMonth() + "/" + d.getUTCDate() + " " + d.getUTCHours() + ":" + d.getUTCMinutes();
function KOArrayToArray(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var obj = {};
        for (var k in array[i]) {
            obj[k] = array[i][k]();
        }
        result.push(obj);
    }
    return result;
}
function Note(title,text,date) {
    this.title = ko.observable(title || "Untitled");
    this.created = ko.observable("Created: "+ (date || formatDate(new Date())));
    this.text = ko.observable(text || "");
}
function Bindings() {
    var app = this;
    app.appName = "Knockout Notes!";
    app.appDesc = "Make and take notes using what I can only describe as knockout and bootstrap had a baby.";
    app.notes = ko.observableArray(JSON.parse(localStorage.getItem("notes"))||[]);
    // load Notes
    /*var loadedNotes = JSON.parse(localStorage.getItem("notes"));
    for (var note in loadedNotes) {
      app.notes.push(new Note(note.title,note.text,note.created));
    }*/
    app.note = ko.observable(new Note());
    app.changeNote = false;

    app.newNote = _=> {
        app.note(new Note());
        app.changeNote = false;
    };
    app.loadNote = note => {
        app.note(note);
        app.changeNote = true;
    };
    app.removeNote = _=> {
        app.notes.remove(app.note());
        app.newNote();
    };
    app.saveNote = _=> {
        if (!app.changeNote) {
            app.notes.unshift(app.note());
        }
        app.note(app.note());
        app.changeNote = true;
        localStorage.setItem("notes",JSON.stringify(KOArrayToArray(app.notes())));
    };
}
var vm;
ko.applyBindings(vm = new Bindings());
