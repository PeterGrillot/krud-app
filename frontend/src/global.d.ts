declare global {
  export type CustomerType = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    joinDate: string,
  }
  
  export type CustomerFormSubmitType = {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    joinDate?: string,
  }
}

export {}