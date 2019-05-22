class CharDescriptor {
  constructor(maskPosition = 0, charType) {
    this.maskPosition = maskPosition;
    this.charType = charType;
    this.isAssigned = false;
    this.caseType = '';
  }
}

export default CharDescriptor;
