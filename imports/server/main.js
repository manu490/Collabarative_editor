Meteor.startup(() => {
  // code to run on server at startup
  if(!Documents.findOne({isPrivate:false})){
    Documents.insert({CreatedOn: new Date() , title:"Welcome Doc" , isPrivate:false});
  }
});
Meteor.publish("documents",function(){
  return Documents.find({
    $or:[{isPrivate:false},{owner:this.userId}]
  });
})
Meteor.publish("editingusers",function(){
  return EditingUsers.find();
})
Meteor.publish("comments",function(){
  return Comments.find();
})
Meteor.methods({
  addcomment:function(comment){
    console.log("Inserted");
    if(this.userId){
      comment.CreatedOn= new Date();
      return Comments.insert(comment);
    }
    return;
  },
  AddDoc:function(){
    var doc;
    if(!this.userId){ return ;}
    else{
      doc ={owner:this.userId , CreateOn:  new Date(), title:"New Document"};
      var id = Documents.insert(doc);
      console.log('addDoc method :' + id);
      return id ;
    }
  },
  addEditingUser:function(docid){
    var docs , user ,euser;
    docs=Documents.findOne({_id:docid});
    if(!docs){
      return; //If no DOC exit
    }
    if(!this.userId){
      return; //If no User loggedin exit
    }
    user=Meteor.user().profile;
    euser= EditingUsers.findOne({docid:docs._id})
    if(!euser){
      euser={docid:docs._id,
      users:{}
    };
  }
  user.lastEdit = new Date();
  euser.users [this.userId]=user;
    EditingUsers.upsert({_id:euser._id}, euser);
},
  updateDocPrivacy:function(doc){
    console.log("updateDocPrivacy");
    console.log(doc);
    var Realdoc = Documents.findOne({_id:doc._id , owner:this.userId});
    if (Realdoc){
      Realdoc.isPrivate = doc.isPrivate;
      Documents.update({_id:doc._id},Realdoc);
    }
  }
});
