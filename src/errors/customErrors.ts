export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
  }
}

export class InvalidInputError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InvalidInputError"
  }
}

export class EntitieInstanceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "EntitieInstanceError"
  }
}

export class UseCaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UseCaseError"
  }
}

export class AdapterRepoError extends Error {
  constructor(message:string) {
    super(message)
    this.name = "AdapterRepoError"
  }
}