import { Template } from 'meteor/templating';
import '/api/collections.js';
import '/api/accounts.js';
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
      editor.setOption("lineNumbers", true);
      editor.setOption("theme", "cobalt");
      editor.on("change",function(cm_editor, info){
        //console.log(cm_editor.getValue());
        $("#iframe-viewer").contents().find("html").html(cm_editor.getValue());
        Meteor.call("addEditingUser");
      });
    }
  }
});
Template.UsersOnline.helpers({
  users:function(){
    if(Meteor.user()){
    var doc,users , euser;
    doc=Documents.findOne();
    if(!doc){return;}
    euser=EditingUsers.findOne({docid:doc._id});
    if(!euser){return;}
    users=new Array();
    var i =0;
    //console.log();
    for(var user_id in euser.users){
      users[i]=fixObjectKeys(euser.users[user_id]);
      i++;
  }
    return users;
}
  else{
    return ;
  }
    }
});
function fixObjectKeys(obj){
  var newObj ={};
  for (key in obj){
    var key2 =key.replace("-","");
    newObj[key2]=obj[key];
  }return newObj;
}
