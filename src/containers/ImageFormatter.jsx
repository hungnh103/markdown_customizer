/*global chrome*/

import { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ImageFormatter = () => {
  const [rawUrl, setRawUrl] = useState('')
  const [disableWidth, setDisableWidth] = useState(false)
  const [imageWidth, setImageWidth] = useState('800')
  const [formattedImageTag, setFormattedImageTag] = useState('')

  const rawData = useRef()

  useEffect(() => {
    if (chrome.storage === undefined) {
      setRawUrl(localStorage.getItem('mc_rawUrl') || rawUrl)
    } else {
      chrome.storage.local.get(["mc_rawUrl"]).then((result) => {
        setRawUrl(result.mc_rawUrl || rawUrl)
      });
    }

    setRawUrl(localStorage.getItem('mc_rawUrl') || rawUrl)
    setDisableWidth(/^true$/i.test(localStorage.getItem('mc_disableWidth')))
    setImageWidth(localStorage.getItem('mc_imageWidth') || imageWidth)
    setFormattedImageTag(localStorage.getItem('mc_formattedImageTag') || formattedImageTag)
  }, [])

  const handleInputUrl = (e) => {
    const url = e.target.value

    if (chrome.storage === undefined) {
      // local environment
      localStorage.setItem('mc_rawUrl', url)
    } else {
      // production environment
      chrome.storage.local.set({ 'mc_rawUrl': url })
    }

    setRawUrl(url)
  }

  const handleToggleWidthOption = () => {
    const toggleFlag = !disableWidth
    localStorage.setItem('mc_disableWidth', toggleFlag)
    setDisableWidth(toggleFlag)
  }

  const handleInputWidth = (e) => {
    const width = e.target.value
    localStorage.setItem('mc_imageWidth', width)
    setImageWidth(width)
  }

  const formatUrl = (e) => {
    e.preventDefault()

    const imgSrc = (rawUrl.match(/!\[.*\]\((.+)\)/) || [])[1] || ''
    const imgTag = imgSrc
      ? `<img alt='info' src='${imgSrc}' ${!disableWidth && imageWidth ? `width='${imageWidth}' ` : ''}/>`
      : ''

    localStorage.setItem('mc_formattedImageTag', imgTag)
    setFormattedImageTag(imgTag)
    rawData.current.select()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedImageTag)
    rawData.current.select()
  }

  return (
    <div className='image-formatter'>
      <div className='image-formatter__form'>
        <form onSubmit={formatUrl}>
          <TextField
            inputRef={rawData}
            autoFocus
            fullWidth
            label="Markdown image URL *"
            margin='dense'
            onChange={handleInputUrl}
            value={rawUrl}
            variant="outlined"
          />

          <div className='image-formatter__form-width-field'>
            <FormGroup>
              <FormControlLabel
                label="Enable width"
                control={
                  <Checkbox
                    checked={!disableWidth}
                    onChange={handleToggleWidthOption}
                  />
                }
              />
            </FormGroup>

            <TextField
              type="number"
              value={imageWidth}
              onChange={handleInputWidth}
              InputProps={{ inputProps: { min: 100 } }}
              sx={{ width: 100 }}
              margin='normal'
              disabled={disableWidth}
            />
          </div>

          <div>
            <Button
              disabled={rawUrl.length === 0}
              size="small"
              type='submit'
              variant="contained"
            >
              Format
            </Button>
          </div>
        </form>
      </div>

      <div>
        <TextField
          disabled
          fullWidth
          label="Result"
          margin='normal'
          value={formattedImageTag}
          variant="outlined"
        />

        <Button
          color='secondary'
          disabled={formattedImageTag.length === 0}
          onClick={handleCopy}
          size="small"
          variant="contained"
        >
          Copy
        </Button>
      </div>
    </div>
  )
}

export default ImageFormatter
