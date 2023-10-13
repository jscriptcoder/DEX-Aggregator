import { errorToast } from '../NotificationToast'

export default function notifyError(err: unknown, defaultMsg: string) {
  if (err instanceof Error) {
    errorToast(err.message.split('\n')[0])
  } else if (err && typeof err === 'object' && 'validationErrors' in err && Array.isArray(err.validationErrors)) {
    const validationError = err.validationErrors[0]
    errorToast(validationError.description)
  } else if (typeof err === 'string') {
    errorToast(err)
  } else {
    errorToast(defaultMsg)
  }
}
