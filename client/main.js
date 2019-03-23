import { Template } from 'meteor/templating';
import '/api/collections.js';
import '/client/accounts.js';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Template.editor.helpers({
  docid:function(){
    var doc = Documents.findOne();
    if(doc){
    return doc._id;
    }
    else{
      return undefined;
    }
  },
  config:function(){
    return function(editor){
      editor.setOption("mode", "html");
      editor.on("change",function(cm_editor, info){
        //console.log(cm_editor.getValue());
        $("#iframe-viewer").contents().find("html").html(cm_editor.getValue());
        Meteor.call("addEditingUser");
      });
    }
  }
});
