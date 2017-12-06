export enum EDeviceCardButtonVisible {
    REQUEST_BUTTON,
    CANCEL_BUTTON,
    RETURN_BUTTON,
    NO_BUTTON
}

function getButtonMessage(button: EDeviceCardButtonVisible) {
    switch (button) {
        case EDeviceCardButtonVisible.REQUEST_BUTTON:
          return 'Request Device';
        case EDeviceCardButtonVisible.CANCEL_BUTTON:
          return 'Cancel Request';
        case EDeviceCardButtonVisible.RETURN_BUTTON:
          return 'Return Request';
        case EDeviceCardButtonVisible.NO_BUTTON:
          return 'Request Device';
      }
}