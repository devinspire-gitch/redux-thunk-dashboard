function createHeadCells(id, booleanType, disablePadding, label) {
    return { id, booleanType, disablePadding, label }
  }  

export const userHeadCells = [
    createHeadCells('username', false, false, 'username'),
    createHeadCells('name', false, true, 'Name'),
    createHeadCells('website', false, false, 'Website'),
    createHeadCells('email', false, false, 'Email'),
    createHeadCells('phone', false, false, 'Phone'),
    createHeadCells('address', false, false, 'Address'),
    createHeadCells('company', false, false, 'Company'),

    // { id: 'name', numeric: false, disablePadding: false, label: 'Dessert (100g serving)' },
    // { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    // { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
  ];

  export const todoHeadCells = [
      createHeadCells('Id', false, false, 'Id'),
      createHeadCells('username', false, false, 'User Name' ),
      createHeadCells('title', false, false, 'Title'),
      createHeadCells('completed', true, false, 'Completed')
  ]

