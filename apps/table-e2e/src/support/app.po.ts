export const getTable = () => cy.get('table-demo-county-list')

export const getHeader = (columnId: string) =>
  cy.get(`.header.cell.${columnId}`)

export const getFilterInput = (columnId: string) =>
  cy.get(`.${columnId} input.filter-input`)

export const getColumn = (columnId: string) => cy.get(`.${columnId} > .cell`)

export const getSort = (columnId: string) => cy.get(`.${columnId} .sort`)
