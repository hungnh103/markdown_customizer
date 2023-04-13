import { useState } from 'react'

const ImageFormatter = () => {
  const [rawUrl, setRawUrl] = useState('')
  const [imageWidth, setImageWidth] = useState('')
  const [formattedImageTag, setFormattedImageTag] = useState('')

  const handleInputUrl = (e) => {
    setRawUrl(e.target.value)
  }

  const handleInputWidth = (e) => {
    setImageWidth(e.target.value)
  }

  const formatUrl = (e) => {
    e.preventDefault()

    const imgSrc = rawUrl.match(/\((.+)\)/)[1]
    const imgTag = `<img src='${imgSrc}' alt='screenshot' ${imageWidth && `width=${imageWidth}`} />`
    setFormattedImageTag(imgTag)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedImageTag)
  }

  return (
    <div>
      <form onSubmit={formatUrl}>
        <div>
          <label>
            Markdown URL
            <br />
            <input type="text" value={rawUrl} onChange={handleInputUrl} />
          </label>
        </div>

        <br />

        <div>
          <label>
            Width (optional)
            <br />
            <input
              onChange={handleInputWidth}
              style={{ width: '50px' }}
              type="number"
              value={imageWidth}
            />
          </label>
        </div>

        <input type="submit" value='Format' disabled={rawUrl.length === 0} />
      </form>

      <br />

      <div>
        Result
        <br />
        <input type="text" disabled value={formattedImageTag} />
        <button disabled={formattedImageTag.length === 0} onClick={handleCopy}>
          Copy
        </button>
      </div>
    </div>
  )
}

export default ImageFormatter
