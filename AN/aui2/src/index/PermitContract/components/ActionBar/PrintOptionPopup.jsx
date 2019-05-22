import OptionPopup from './OptionPopup';
import './index.less';

export default class PrintOptionPopup extends OptionPopup {
  handlePopupConfirm = () => {
    const { option, containsRecurring, showBreakdownFee } = this.state;

    if (option) {
      const printingOptionClass = `printing-${option}`;
      const printingRecurringClass = containsRecurring ? 'printing-recurring' : 'printing-no-recurring';
      const printingBreakdownfeeClass = showBreakdownFee ? 'printing-breakdown-fee' : '';

      const pageContainer = document.querySelector('.page-container');
      if (pageContainer) {
        pageContainer.className = `page-container printing ${printingOptionClass} ${printingRecurringClass} ${printingBreakdownfeeClass}`;
      }
      window.print();
      this._refs.alert.onClose();
    }

    super.handlePopupConfirm();
  };
}
