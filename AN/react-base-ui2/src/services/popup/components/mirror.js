import * as HAlignment from '../../../consts/HAlignment';
import * as VAlignment from '../../../consts/VAlignment';

const mirrorMap = {};
mirrorMap[HAlignment.LEFT] = HAlignment.RIGHT;
mirrorMap[HAlignment.CENTER] = HAlignment.CENTER;
mirrorMap[HAlignment.RIGHT] = HAlignment.LEFT;
mirrorMap[VAlignment.TOP] = VAlignment.BOTTOM;
mirrorMap[VAlignment.MIDDLE] = VAlignment.MIDDLE;
mirrorMap[VAlignment.BOTTOM] = VAlignment.TOP;

const mirror = pos => mirrorMap[pos];

export default mirror;
