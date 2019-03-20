import { Meteor } from 'meteor/meteor';
import '/api/collections.js';
Meteor.startup(() => {
  // code to run on server at startup
  if(!Documents.findOne()){
    Documents.insert({title:"My New Document "});
  }
});
