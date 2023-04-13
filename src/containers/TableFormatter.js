import { useState } from 'react'

const TableFormatter = () => {
  const [itemsPerRow, setItemsPerRow] = useState(3)
  const [itemList, setItemList] = useState([])
  const [formattedData, setFormattedData] = useState('')

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

    const formattedList = Array(numRows).fill(null).map(_e => (
      `| ${cloneItemList.splice(0, itemsPerRow).join(' | ')} |`
    ))
    formattedList.splice(1, 0, `| ${Array(itemsPerRow).fill('-').join(' | ')} |`)

    setFormattedData(formattedList.join('\n'))
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
            <textarea onChange={handleInputData}></textarea>
          </label>
        </div>

        <input type='submit' value='Format' disabled={itemList.length === 0} />
      </form>

      <div>
        Output
        <textarea value={formattedData} disabled></textarea>
        <button disabled={formattedData.length === 0} onClick={handleCopy}>Copy</button>
      </div>
    </div>
  )
}

export default TableFormatter
