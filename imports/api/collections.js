import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
this.Documents = new Mongo.Collection("documents");
EditingUsers = new Mongo.Collection("editingusers"); //New collection added for editing user data
Comments = new Mongo.Collection("comments");
Comments.attachSchema(new SimpleSchema({
  title:{
    type: String,
    label: "Title",
    max:200
  },
  body:{
    type: String,
    label: "Comment",
    max:1000
  },
  docid:{
    type: String,
  }
}));
//Documents for our ref && //documents is for Mongo ref
