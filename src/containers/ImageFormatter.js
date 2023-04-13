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
            <input type="text" value={rawUrl} onChange={handleInputUrl} />
          </label>
        </div>

        <div>
          <label>
            Width
            <input type="number" value={imageWidth} onChange={handleInputWidth} />
          </label>
        </div>

        <input type="submit" value='Format' disabled={rawUrl.length === 0} />
      </form>

      <div>
        Result
        <input type="text" disabled value={formattedImageTag} />
        <button disabled={formattedImageTag.length === 0} onClick={handleCopy}>
          Copy
        </button>
      </div>
    </div>
  )
}

export default ImageFormatter
