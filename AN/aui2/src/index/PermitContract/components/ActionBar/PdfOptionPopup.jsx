import { isIE, isEdge } from 'react-base-ui/lib/utils/browser';
import OptionPopup from './OptionPopup';
import './index.less';

export default class PdfOptionPopup extends OptionPopup {

  startDownload = (blob, filename) => {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(a.href);
  }

  download = ({ payload: { blob, filename } }) => {
    if (isIE() || isEdge()) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      this.startDownload(blob, filename);
    }
  }

  handlePopupConfirm() {
    const { permitNumber, savePdfAction } = this.props;
    const { option, containsRecurring, showBreakdownFee } = this.state;

    savePdfAction(option, permitNumber, containsRecurring, showBreakdownFee).then(this.download);

    super.handlePopupConfirm();
  }

}
