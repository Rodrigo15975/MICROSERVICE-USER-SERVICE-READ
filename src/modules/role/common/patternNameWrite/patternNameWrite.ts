const enum PATTERNAME {
  ROLE_CREATE = 'role.create-read',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patternNameRead: MessagePattern = {
  ROLE_CREATE: PATTERNAME.ROLE_CREATE,
}

export const { ROLE_CREATE } = patternNameRead
