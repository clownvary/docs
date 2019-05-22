"use strict";

import {Emitter} from "resource/FC";
import ObjectAssign from "object-assign";
import Registor from "resource/tools/Registor";

export default class ResourceManager extends Emitter{

  constructor(calendar) {
    super(calendar);
    this.calendar = calendar;
    this.idBuilder = this.calendar.options["resourceIdBuilder"];
    this.registor = new Registor(this.calendar.options["resourceIdField"] || "id", "rsId-");
    this._reset();
  }

  fetch() {
    let fetchingStatus = this.fetchingStatus;

    fetchingStatus.start();
    // setTimeout(() => {
      this.setResources(this.calendar.options["resources"] || [], true);
      fetchingStatus.end(this.getResources());
    // }, 0);

  }

  reFetch() {
    this._reset();
    this.fetch();
  }

  setAllowedResources(resources) {
    this.allowedResources = [];
    resources.forEach((rsc) => {
      this.registor.register(rsc, this.idBuilder);
      if(rsc.id) {
        this.allowedResources.push(rsc);
      }
    });
  }

  getAllowedResources() {
    return this.allowedResources;
  }

  addAllowedResource(resource) {
    let regResource = this.registor.register(resource, this.idBuilder);
    if(regResource){
      let alreadyHas = false;
      this.allowedResources = this.allowedResources.map((aldRs) => {
        if(regResource.id == aldRs.id){
          alreadyHas = true;
        }
        return regResource.id != aldRs.id ? aldRs : regResource;
      });
      if(!alreadyHas){
        this.allowedResources.push(regResource);
      }
    }
  }

  removeAllowedResource(resource) {
    return this.allowedResources = this.allowedResources.filter((aldRs) => {
      return aldRs.id != resource.id;
    });
  }

  toggleAllowResourceById(id) {
    let resource = this.getAllowedResourceById(id);
    if(resource){
      this.removeAllowedResource(resource);
    }else{
      resource = this.getResourceById(id);
      this.addAllowedResource(resource);
    }
  }

  getAllowedResourceById(id) {
    let reource = null;
    this.allowedResources.forEach((aldRs) => {
      if(id == aldRs.id){
        reource = aldRs;
      }
    });
    return reource;
  }

  isAllowedResource(resource) {
    let alreadyHas = false;
    this.allowedResources.forEach((aldRs) => {
      if(resource.id == aldRs.id){
        alreadyHas = true;
      }
    });
    return alreadyHas;
  }

  getResourceById(id) {
    return this.registor.getMember(id);
  }

  getResources() {
    return this.resources;
  }

  setResources(resources, isFetch) {
    if(!isFetch){
      this.registor.destory();
    }
    resources.forEach((rsc) => {
      this.registor.register(rsc, this.idBuilder);
    });
    this.resources = this.registor.getMembers();
    if(!isFetch){
      var newAllowedResources = [];
      this.allowedResources.forEach((aldRs) => {
        let registedResource = this.registor.getMember(aldRs.id);
        if(registedResource){
          newAllowedResources.push(registedResource);
        }
      });
      this.allowedResources = newAllowedResources;
      this.trigger("setAll", this.resources);
    }
  }

  addResource(resource) {
    this.registor.register(resource, this.idBuilder);
    this.resources = this.registor.getMembers();
    this.trigger("add", resource);
  }

  deleteResource(resource, noTrigger) {
    if(!resource.id || !this.registor.getMember(resource.id)){
      return;
    }
    this.registor.unregister(resource);
    this.resources = this.registor.getMembers();
    this.cleanAllowedResources();
    if(!noTrigger){
      this.trigger("delete", resource);
    }
  }

  cleanAllowedResources() {
    this.allowedResources = this.allowedResources.filter((aldRs) => {
      return this.registor.getMember(aldRs.id) ? true : false;
    });
  }

  getEventResourceId(event) {
    return String(event[this.getEventResourceField()] || '');
  }

  _reset() {
    this.resources = [];
    this.allowedResources = [];
    this.registor.destory();
    this.fetchingStatus = new FetchingStatus();
  }
}

class FetchingStatus {

  constructor(){
    this.defer = $.Deferred();
    this.promise = this.defer.promise();
    this.doing = false;
    this.done = false;
  }

  start(){
    this.doing = true;
  }

  end(resources){
    this.doning = false;
    this.done = true;
    this.defer.resolve(resources);
  }

}
