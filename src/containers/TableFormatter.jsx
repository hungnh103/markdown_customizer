import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const TableFormatter = () => {
  const [itemsPerRow, setItemsPerRow] = useState(3)
  const [content, setContent] = useState('')
  const [titleIncluded, setTitleIncluded] = useState(false)
  const [customTitles, setCustomTitles] = useState('SP version,PC version')
  const [formattedData, setFormattedData] = useState('')
  const [extractedList, setExtractedList] = useState([])

  useEffect(() => {
    setItemsPerRow(Number(localStorage.getItem('mc_itemsPerRow')) || itemsPerRow)
    setContent(localStorage.getItem('mc_content') || content)
    setTitleIncluded(/^true$/i.test(localStorage.getItem('mc_titleIncluded')))
    setCustomTitles(localStorage.getItem('mc_customTitles') || customTitles)
    setFormattedData(localStorage.getItem('mc_formattedData') || formattedData)
    setExtractedList(JSON.parse(localStorage.getItem('mc_extractedList')) || extractedList)
  }, [])

  const handleInputNumber = (e) => {
    const number = e.target.value
    localStorage.setItem('mc_itemsPerRow', number)
    setItemsPerRow(Number(number))
  }

  const handleInputContent = (e) => {
    const tableData = e.target.value
    localStorage.setItem('mc_content', tableData)
    setContent(tableData)
  }

  const toggleCustomTitles = () => {
    const toggleFlag = !titleIncluded
    localStorage.setItem('mc_titleIncluded', toggleFlag)
    setTitleIncluded(toggleFlag)
  }

  const handleInputTitles = (e) => {
    const titles = e.target.value
    localStorage.setItem('mc_customTitles', titles)
    setCustomTitles(titles)
  }

  const formatData = (e) => {
    e.preventDefault()

    const itemList = content.match(/(!\[[\w-\.]*\]\(https:\/\/[\w-\.\/]+\))/g) || []
    const numRows = Math.ceil(itemList.length / itemsPerRow)
    const cloneItemList = itemList.slice()
    const tempExtractedList = []

    let formattedList = Array(numRows).fill(null).map(_e => {
      const group = cloneItemList.splice(0, itemsPerRow)
      const complementaryItems = Array(itemsPerRow - group.length)

      tempExtractedList.push(
        group.map(e => e.match(/\((.+)\)/)[1])
             .concat(complementaryItems.fill(''))
      )
      return `| ${group.concat(complementaryItems).join(' | ')} |`
    })

    if (titleIncluded && !!customTitles) {
      const selectedTitles = customTitles.split(',').splice(0, itemsPerRow)
      formattedList.unshift(
        `| ${selectedTitles.concat(Array(itemsPerRow - selectedTitles.length)).join(' | ')} |`
      )

      tempExtractedList.unshift(
        selectedTitles.concat(Array(itemsPerRow - selectedTitles.length).fill(''))
      )
    }

    formattedList.splice(1, 0, `| ${Array(itemsPerRow).fill('-').join(' | ')} |`)
    formattedList = formattedList.join('\n')

    localStorage.setItem('mc_formattedData', formattedList)
    localStorage.setItem('mc_extractedList', JSON.stringify(tempExtractedList))

    setFormattedData(formattedList)
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
            InputProps={{ inputProps: { min: 1 } }}
            label="Items per row *"
            margin='dense'
            onChange={handleInputNumber}
            sx={{ width: 110 }}
            type="number"
            value={itemsPerRow}
          />

          <TextField
            fullWidth
            label="Content *"
            margin='dense'
            multiline
            onChange={handleInputContent}
            rows={5}
            value={content}
            helperText={
              <span>
                Paste image markdown URLs, those are in format
                <br />
                ![image](https://user-images.githubusercontent.com/...)
              </span>
            }
          />

          <div className='table-formatter__form-title-field'>
            <FormGroup>
              <FormControlLabel
                label="Custom titles"
                control={
                  <Checkbox
                    checked={titleIncluded}
                    onChange={toggleCustomTitles}
                  />
                }
              />
            </FormGroup>

            <TextareaAutosize
              className='titles-input'
              disabled={!titleIncluded}
              onChange={handleInputTitles}
              placeholder='Titles list with comma delimeter'
              value={customTitles}
            />
          </div>

          <Button
            disabled={!content}
            size="small"
            type='submit'
            variant="contained"
          >
            Format
          </Button>
        </form>
      </div>

      <div className='table-formatter__result'>
        <TextField
          disabled
          fullWidth
          label="Result"
          margin='dense'
          multiline
          rows={5}
          value={formattedData}
        />

        <Button
          disabled={formattedData.length === 0}
          onClick={handleCopy}
          size="small"
          variant="contained"
          color='secondary'
        >
          Copy
        </Button>
      </div>

      <div className='table-formatter__preview'>
        <label>Preview</label>
        {extractedList.length > 0 && (
          <table
            border={1}
            cellPadding={10}
            cellSpacing={0}
            style={{ background: 'lightgrey'}}
          >
            <tbody>
              {extractedList.map((row, r_index) =>
                <tr key={r_index}>
                  {row.map((cell, c_index) =>
                    <td key={c_index}>
                      {cell ? (
                        <>
                          {r_index === 0 && !cell.startsWith('https') ? (
                            `${cell}`
                          ) : (
                            <img src={cell} alt={'screenshot'} width={100} />
                          )}
                        </>
                      ) : ('')}
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
