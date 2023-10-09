export class NotConnectedError extends Error {
  name = 'NotConnectedError'
}

export class InsufficientBalanceError extends Error {
  name = 'InsufficientBalanceError'
}

export class InsufficientAllowanceError extends Error {
  name = 'InsufficientAllowanceError'
}

export class NoAllowanceRequiredError extends Error {
  name = 'NoAllowanceRequiredError'
}

export class NoTokenAddressError extends Error {
  name = 'NoTokenAddressError'
}

export class NoAccountAddressError extends Error {
  name = 'NoAccountAddressError'
}

export class FailedTransactionError extends Error {
  name = 'FailedTransactionError'
}

export class ApproveError extends Error {
  name = 'ApproveError'
}

export class RevertedWithFailedError extends Error {
  name = 'RevertedWithFailedError'
}

export class PendingBlockError extends Error {
  name = 'PendingBlockError'
}

export class WrongOwnerError extends Error {
  name = 'WrongOwnerError'
}

export class WrongChainError extends Error {
  name = 'WrongChainError'
}

export class NotSupportedChainError extends Error {
  name = 'NotSupportedChainError'
}

export class UnknownTokenTypeError extends Error {
  name = 'UnknownTokenTypeError'
}
