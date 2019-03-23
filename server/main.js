import { Meteor } from 'meteor/meteor';
import '/api/collections.js';
Meteor.startup(() => {
  // code to run on server at startup
  if(!Documents.findOne()){
    Documents.insert({title:"My New Document "});
  }
});
Meteor.methods({
  addEditingUser:function(){
    var docs , user ,euser;
    docs=Documents.findOne();
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
}
});
