// fix ie not popup
let message;
const beforeunloadEvent = (e) => {
  (e || window.event).returnValue = message;
  return message;
}
const listenBeforeunload = () => {
  window.addEventListener('beforeunload', beforeunloadEvent);
}
const removeListenBeforeunload = () => {
  window.removeEventListener('beforeunload', beforeunloadEvent);
}

class LocationHelp {
  constructor() {
    this.beforeunloadPrompt = false;
    this.notExecuteUnloadCallback = false;
  }

  initPromptWhenLeavePage(options) {
    message = options.message;
    if (!this.beforeunloadPrompt) {
      this.unloadHook = options.unloadHook;
      listenBeforeunload()
      this.beforeunloadPrompt = true;
    }

  }

  redirect(url, notExecuteUnloadCallback = false) {
    const { beforeunloadPrompt } = this;

    if (!beforeunloadPrompt) {
      location.href = url;
      return;
    }
    const result = confirm(message);
    if (result) {
      this.notExecuteUnloadCallback = notExecuteUnloadCallback;
      this.destroy()
      this.unloadHook()
      location.href = url;
    }
  }

  destroy() {
    removeListenBeforeunload()
    this.beforeunloadPrompt = false;
  }
}
export default new LocationHelp();