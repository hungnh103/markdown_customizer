import { useState } from 'react'

const TableFormatter = () => {
  const [itemsPerRow, setItemsPerRow] = useState(3)
  const [itemList, setItemList] = useState([])
  const [formattedData, setFormattedData] = useState('')
  const [extractedList, setExtractedList] = useState([])

  const handleInputNumber = (e) => {
    setItemsPerRow(Number(e.target.value))
  }

  const handleInputData = (e) => {
    setItemList(e.target.value.split('\n'))
  }

  const formatData = (e) => {
    e.preventDefault()
    const numRows = Math.ceil(itemList.length / itemsPerRow)
    const cloneItemList = itemList.slice()
    let tempExtractedList = []

    const formattedList = Array(numRows).fill(null).map(_e => {
      const group = cloneItemList.splice(0, itemsPerRow)
      tempExtractedList.push(group.map(e => e.match(/\((.+)\)/)[1]))
      return `| ${group.join(' | ')} |`
    })
    formattedList.splice(1, 0, `| ${Array(itemsPerRow).fill('-').join(' | ')} |`)

    setFormattedData(formattedList.join('\n'))
    setExtractedList(tempExtractedList)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedData)
  }

  return (
    <div>
      <form onSubmit={formatData}>
        <div>
          <label>
            Number of items per row
            <input type="number" value={itemsPerRow} onChange={handleInputNumber} />
          </label>
        </div>

        <div>
          <label>
            Content
            <textarea onChange={handleInputData} cols={50} rows={10}></textarea>
          </label>
        </div>

        <input type='submit' value='Format' disabled={itemList.length === 0} />
      </form>

      <br />

      <div>
        Output
        <textarea value={formattedData} disabled cols={50} rows={10}></textarea>
        <button disabled={formattedData.length === 0} onClick={handleCopy}>Copy</button>
      </div>

      <br />

      <div>
        Preview
        <table>
          <tbody>
            {extractedList.map((row, index) =>
              <tr key={index}>
                {row.map((cell, index) =>
                  <td key={index}>
                    <img src={cell} alt={'screenshot'} width={100} />
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableFormatter
