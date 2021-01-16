import {
  getColumn,
  getFilterInput,
  getHeader,
  getSort,
  getTable,
} from '../support/app.po'

describe('county-list features', () => {
  beforeEach(() => cy.visit('/'))
  it('should display the table', () => {
    getTable().should('exist')
    getHeader('county').should('exist')
    getHeader('state').should('exist')
    getHeader('cases').should('exist')
    getHeader('deaths').should('exist')
  })

  it('sorts the table data', () => {
    // initial sort check
    getSort('state').should('not.have.class', 'placeholder')
    getSort('county').should('have.class', 'placeholder')
    getSort('cases').should('have.class', 'placeholder')
    getSort('deaths').should('have.class', 'placeholder')
    // check that data is sorted
    getColumn('state').first().contains(/^\s*A/)

    // sort on county
    getSort('county').click().should('not.have.class', 'placeholder')
    getSort('state').should('have.class', 'placeholder')
    getSort('cases').should('have.class', 'placeholder')
    getSort('deaths').should('have.class', 'placeholder')

    getColumn('county').first().contains(/^\s*A/)
    // invert sort
    getSort('county').click().children().should('have.class', 'invert')
    getColumn('county').first().contains(/^\s*Z/)

    // sort on cases (numeric)
    getSort('cases').click().should('not.have.class', 'placeholder')
    getSort('state').should('have.class', 'placeholder')
    getSort('county').should('have.class', 'placeholder')
    getSort('deaths').should('have.class', 'placeholder')

    getColumn('cases').first().contains(0)

    // invert sort
    getSort('cases').click().children().should('have.class', 'invert')
    getColumn('cases')
      .first()
      .then(($cell) => expect(Number($cell.text())).to.be.above(10000))
  })

  it('should filter the table data', () => {
    // state
    getFilterInput('state').type('Oregon')
    getColumn('state').each(() => cy.contains('Oregon'))

    // county
    getFilterInput('county').type('Multnomah')
    getColumn('county').each(() => cy.contains('Multnomah'))

    getFilterInput('county').clear()
    getFilterInput('state').clear()

    // cases absolute
    getFilterInput('cases').type('0')
    getColumn('cases').each(() => cy.contains('0'))

    const lessThanValue = 100
    const greaterThanValue = 10000
    // cases less than
    getFilterInput('cases').clear().type(`< ${lessThanValue}`)
    getColumn('cases').each(($cell) =>
      expect(Number($cell.text())).lessThan(lessThanValue)
    )

    // cases greater than
    getFilterInput('cases').clear().type(`> ${greaterThanValue}`)
    getColumn('cases').each(($cell) =>
      expect(Number($cell.text())).greaterThan(greaterThanValue)
    )
    getFilterInput('cases').clear()

    // deaths less than or eq
    getFilterInput('deaths').clear().type(`<= ${lessThanValue}`)
    getColumn('deaths').each(($cell) =>
      expect(Number($cell.text())).to.be.at.most(lessThanValue)
    )

    // deaths greater than
    getFilterInput('deaths').clear().type(`>= ${greaterThanValue}`)
    getColumn('deaths').each(($cell) =>
      expect(Number($cell.text())).to.be.at.least(greaterThanValue)
    )
    getFilterInput('deaths').clear()
  })
})
