import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const TableFormatter = () => {
  const [itemsPerRow, setItemsPerRow] = useState(3)
  const [itemList, setItemList] = useState([])
  const [formattedData, setFormattedData] = useState('')
  const [extractedList, setExtractedList] = useState([])

  const handleInputNumber = (e) => {
    setItemsPerRow(Number(e.target.value))
  }

  const handleInputData = (e) => {
    setItemList(e.target.value.match(/(!\[[\w-\.]*\]\(https:\/\/[\w-\.\/]+\))/g))
  }

  const formatData = (e) => {
    e.preventDefault()
    const numRows = Math.ceil(itemList.length / itemsPerRow)
    const cloneItemList = itemList.slice()
    let tempExtractedList = []

    const formattedList = Array(numRows).fill(null).map(_e => {
      const group = cloneItemList.splice(0, itemsPerRow)
      const complementaryItems = Array(itemsPerRow - group.length)

      tempExtractedList.push(
        group.map(e => e.match(/\((.+)\)/)[1])
             .concat(complementaryItems.fill(''))
      )
      return `| ${group.concat(complementaryItems).join(' | ')} |`
    })
    formattedList.splice(1, 0, `| ${Array(itemsPerRow).fill('-').join(' | ')} |`)

    setFormattedData(formattedList.join('\n'))
    setExtractedList(tempExtractedList)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedData)
  }

  return (
    <div className='table-formatter'>
      <div className='table-formatter__form'>
        <form onSubmit={formatData}>
          <TextField
            label="Items per row *"
            type="number"
            value={itemsPerRow}
            onChange={handleInputNumber}
            InputProps={{ inputProps: { min: 1 } }}
            sx={{ width: 110 }}
            margin='dense'
          />

          <TextField
            label="Content *"
            multiline
            rows={3}
            onChange={handleInputData}
            fullWidth
            helperText={<span>Paste image markdown URLs, those are in format<br />![image](https://user-images.githubusercontent.com/...)</span>}
            margin='dense'
          />

          <Button
            variant="contained"
            size="small"
            type='submit'
            disabled={itemList.length === 0}
          >
            Format
          </Button>
        </form>
      </div>

      <div className='table-formatter__result'>
        <TextField
          label="Result"
          multiline
          rows={3}
          disabled
          fullWidth
          value={formattedData}
          margin='dense'
        />

        <Button
          variant="contained"
          size="small"
          disabled={formattedData.length === 0}
          onClick={handleCopy}
        >
          Copy
        </Button>
      </div>

      <div className='table-formatter__preview'>
        <label>Preview</label>
        {extractedList.length > 0 && (
          <table
            border={1}
            style={{ background: 'lightgrey'}}
            cellSpacing={0}
            cellPadding={10}
          >
            <tbody>
              {extractedList.map((row, r_index) =>
                <tr key={r_index}>
                  {row.map((cell, c_index) =>
                    <td key={c_index}>
                      {cell ? <img src={cell} alt={'screenshot'} width={100} /> : ''}
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default TableFormatter
