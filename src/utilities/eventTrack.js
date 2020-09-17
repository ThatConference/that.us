function track(eventName) {
  if (window.tidioChatApi) window.tidioChatApi.track(eventName);
}

export default track;
