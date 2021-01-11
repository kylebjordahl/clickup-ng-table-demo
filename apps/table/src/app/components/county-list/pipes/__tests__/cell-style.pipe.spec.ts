import { Column } from '../../models/column.model'
import { CellStylePipe } from '../cell-style.pipe'

describe('CellStylePipe', () => {
  it('create an instance', () => {
    const pipe = new CellStylePipe()
    expect(pipe).toBeTruthy()
  })

  describe('pipe functionality', () => {
    const pipe = new CellStylePipe()

    it('returns an ngStyle valid object', () => {
      const width = 100
      const result = pipe.transform({ width } as Column)
      expect(
        Object.keys(result).every((k) => typeof k === 'string')
      ).toBeTruthy()
      expect(result).toMatchObject(
        expect.objectContaining({
          'width.px': width.toFixed(0),
          'min-width.px': width.toFixed(0),
          'max-width.px': width.toFixed(0),
        })
      )
    })
  })
})
