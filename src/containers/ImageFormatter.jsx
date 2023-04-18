import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ImageFormatter = () => {
  const [rawUrl, setRawUrl] = useState('')
  const [imageWidth, setImageWidth] = useState('600')
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
    const imgTag = `<img src='${imgSrc}' alt='screenshot' ${imageWidth && `width='${imageWidth}'`} />`
    setFormattedImageTag(imgTag)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedImageTag)
  }

  return (
    <div className='image-formatter'>
      <div className='image-formatter__form'>
        <form onSubmit={formatUrl}>
          <TextField
            label="Markdown image URL *"
            fullWidth
            variant="outlined"
            value={rawUrl}
            onChange={handleInputUrl}
            margin='dense'
          />

          <TextField
            label="Width"
            type="number"
            value={imageWidth}
            onChange={handleInputWidth}
            InputProps={{ inputProps: { min: 100 } }}
            sx={{ width: 100 }}
            margin='normal'
          />

          <div>
            <Button
              variant="contained"
              size="small"
              type='submit'
              disabled={rawUrl.length === 0}
            >
              Format
            </Button>
          </div>
        </form>
      </div>

      <div>
        <TextField
          label="Result"
          fullWidth
          variant="outlined"
          value={formattedImageTag}
          disabled
          margin='normal'
        />

        <Button
          variant="contained"
          size="small"
          disabled={formattedImageTag.length === 0}
          onClick={handleCopy}
        >
          Copy
        </Button>
      </div>
    </div>
  )
}

export default ImageFormatter
