import { Template } from 'meteor/templating';
import '/api/collections.js';
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
      editor.on("change",function(cm_editor, info){
        console.log(cm_editor.getValue());
        $("#iframe-viewer").contents().find("html").html(cm_editor.getValue());
      });
    }
  }
});
Template.docList.helpers({
  document:function(){
  doc = Documents.findOne();
  if (doc){
    return {"title":"nothing to see here"};
  } else {
    return doc;
  }
}
});
