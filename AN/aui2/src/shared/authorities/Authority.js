import isNull from 'lodash/isNull';
import AuthorityType from './AuthorityType';

export class Authority {

  constructor() {
    this.authorities = [];
  }

  init(data = []) {
    this.authorities = data;
  }

  getType(id) {
    let type = null;
    const types = this.authorities.filter(authority => authority.id === id);

    if (types && types.length) {
      type = types[0].authorityType;
    }

    return type;
  }

  isDisabled(id) {
    return AuthorityType.DISABLED === this.getType(id);
  }

  isEnabled(id) {
    return AuthorityType.ENABLED === this.getType(id);
  }

  isHidden(id) {
    return AuthorityType.HIDDEN === this.getType(id);
  }

  isDisplayed(id) {
    return AuthorityType.DISPLAYED === this.getType(id);
  }

  is(id, type = '') {
    return type === this.getType(id);
  }

  typeIn(id, types = []) {
    const type = this.getType(id);

    if (isNull(type)) {
      return false;
    }

    return types.indexOf(type) > -1;
  }

  typeNotIn(id, types) {
    return !this.typeIn(id, types);
  }

}


export default new Authority();
