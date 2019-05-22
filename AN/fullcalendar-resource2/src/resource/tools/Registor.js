"use strict";

export default class Registor {

  constructor(uniqueName, prefix) {
    this.memberList = [];
    this.memberMap = {};
    this.nextIndex = 0;
    this.prefix = prefix ? prefix : "registor-";
    this.uniqueName = uniqueName ? uniqueName : "uniqueId-";
  }

  register(obj, idBuilder, autoId) {
    let id = obj[this.uniqueName];
    if(id == null && idBuilder) {
      id = idBuilder(obj);
    }
    if (id == null && autoId) {
      id = (this.prefix + this.nextIndex++);
      obj[this.uniqueName] = id;
    }
    if(id){
      if(this.uniqueName != "id"){
        obj.id = id;
      }
      if(!this.memberMap[id]){
        this.memberList.push(obj);
      }
      this.memberMap[id] = obj;
    }
    return id ? obj : null;
  }

  unregister(obj) {
    let id = obj[this.uniqueName];
    if (id == null) {
      return;
    }

    if (this.memberMap[id]) {
      this.memberList.splice(this.memberList.indexOf(obj), 1);
      delete this.memberMap[id];
    }

    try {
      delete obj[this.uniqueName];
    } catch (ex) {
      throw new Error("Can't delete the Attribute [" + this.uniqueName + "]");
    }
  }

  createUnique(obj) {
    let id = obj[this.uniqueName];
    if (id != null) {
      return id;
    }
    id = (this.prefix + this.nextIndex++);
    return obj[this.uniqueName] = id;
  }

  getMember(unique) {
    return this.memberMap[unique] || null;
  }

  getMembers() {
    return this.memberList;
    //return Object.keys(this.memberMap).map((k) => this.memberMap[k]);
  }

  destory() {
    this.memberList = [];
    this.memberMap = {};
    this.nextIndex = 0;
  }

}
