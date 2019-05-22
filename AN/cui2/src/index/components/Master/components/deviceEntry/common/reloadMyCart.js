import getRoutPathWithOrg from 'shared/utils/getRoutPathWithOrg';

export default function reloadMyCart(myCartUrl) {
  if (
    !this.props ||
    !this.props.router ||
    !this.props.initCartPageAsyncAction
  ) {
    throw new Error(
      `[Function reloadMyCart error]:
          Please check if have bind router and initCartPageAsyncAction on component layer.`
    );
  }
  const { router: { isActive } } = this.props;

  isActive(getRoutPathWithOrg(myCartUrl), true) && this.props.initCartPageAsyncAction();
}
