const enum PATTERNAME {
  ROLE_FIND_ALL = 'role.find.all-read',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patternNameRead: MessagePattern = {
  ROLE_FIND_ALL: PATTERNAME.ROLE_FIND_ALL,
}
export const { ROLE_FIND_ALL } = patternNameRead
