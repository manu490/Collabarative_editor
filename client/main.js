import { Template } from 'meteor/templating';
import '/api/collections.js';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Template.editor.helpers({
  docid:function(){
    return Documents.findOne()._id;
  }
});
