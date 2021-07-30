function createHeadCells(id, booleanType, disablePadding, label) {
    return { id, booleanType, disablePadding, label }
  }  

export const userHeadCells = [
    createHeadCells('username', false, false, 'Username'),
    createHeadCells('name', false, true, 'Name'),
    createHeadCells('website', false, false, 'Website'),
    createHeadCells('email', false, false, 'Email'),
    createHeadCells('phone', false, false, 'Phone'),
    createHeadCells('address', false, false, 'Address'),
  ];

  export const todoHeadCells = [
      createHeadCells('Id', false, false, 'Id'),
      createHeadCells('username', false, false, 'Username' ),
      createHeadCells('title', false, false, 'Title'),
      createHeadCells('completed', true, false, 'Completed')
  ]

