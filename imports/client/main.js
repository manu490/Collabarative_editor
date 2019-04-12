import './main.html';
Meteor.subscribe("documents");
Meteor.subscribe("editingusers");
Template.editor.helpers({
  docid:function(){
    setupCurrentDocument();
    return Session.get("docid");
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
})
Template.docInfo.helpers({
  document:function(){
    return Documents.findOne({_id:Session.get("docid")});
  },
  Owner:function(){
    var doc = Documents.findOne({_id:Session.get("docid")});
    if (doc){
      if(doc.owner == Meteor.userId()){
        return true ;
      }
    }
    return false ;
  }
})
Template.editableText.helpers({
  userCanEdit:function(){
    var doc = Documents.findOne({_id:Session.get("docid") , owner : Meteor.userId()});
    if (doc){
      return true;
    }
    else{
      return false;
    }
  }
})
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
})
Template.navbar.helpers({
  documents:function(){
    return Documents.find();
  }
})
Template.navbar.events({
  'click .js-add-doc' : function(event){
    event.preventDefault();
    console.log("Add new Document");
    if(!Meteor.user()){
      alert("Login to Add New Document");
    }
    else{
      var id = Meteor.call("AddDoc",function(err ,res){
        if(!err){
          console.log("event got an Id",res);
          Session.set("docid" , res);
        }
      });

    }
  },
  'click .js-load-doc' : function(event){
    Session.set("docid",this._id);
  }
})

Template.docInfo.events({
  'click .js-tog-private' : function(event){
    console.log(event.target.checked);
    var doc = {_id:Session.get("docid"), isPrivate:event.target.checked};
    Meteor.call("updateDocPrivacy",doc);
  }
})
function setupCurrentDocument(){
  var doc;
  if(!Session.get("docid")){
    doc = Documents.findOne();
    if(doc){
      Session.set("docid", doc._id)
    }
  }
}
function fixObjectKeys(obj){
  var newObj ={};
  for (key in obj){
    var key2 =key.replace("-","");
    newObj[key2]=obj[key];
  }return newObj;
}
