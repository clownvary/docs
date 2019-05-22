import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import classNames from 'classnames'

const propTypes = {
  className: string,
  style: object,
  onChange: func,
  defaultText: string,
  text: string,
  size: string,
  ForImage: bool,
  formatInfo: string,
  sizeInfo: string,
  dimensions: string,
  invalidSizeError: string,
  invalidFormatError: string,
  removeConfirmMessage: string,
  dropOnDocument: bool,
  thumbnailPercentage: string,
}
const defaultProps = {
  size: 'sm',
  text: 'Choose File',
  defaultText: 'No file chosen',
  ForImage: false,
  formatInfo: 'Format: JPG, JPEG, PNG or GIF.',
  sizeInfo: 'Size: Less than 3 MB.',
  dimensions: 'Dimensions: 2048 px width, 1536 px height maximum.',
  showInvalidSize: false,
  showInvalidFormat: false,
  invalidSizeError: 'Invalid file size',
  invalidFormatError: 'Invalid file type',
  removeConfirmMessage: 'Are you sure removing the selected file?',
  dropOnDocument: false,
  thumbnailPercentage: '5',
}

export default class FileUpload extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      selectedFile: null,
      filePreviewSrc: '',
      showInvalidSize: false,
      showInvalidFormat: false,
    }
  }

  componentDidMount() {
    document.addEventListener('dragleave', e => {
      e.preventDefault()
    })
    document.addEventListener('drop', e => {
      e.preventDefault()
    })
    document.addEventListener('dragenter', e => {
      e.preventDefault()
    })
    document.addEventListener('dragover', e => {
      e.preventDefault()
    })
    this.props.dropOnDocument
      ? document.addEventListener('drop', this.onChange, false)
      : this.fileUpload.addEventListener('drop', this.onChange, false)
  }

  onChange = e => {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    if (files && files.length > 0) {
      if (files[0].type.indexOf('image') === -1) {
        this.setState({
          selectedFile: '',
          showInvalidFormat: true,
          showInvalidSize: false,
          filePreviewSrc: '',
        })
      } else {
        const img = window.URL.createObjectURL(files[0])
        const filesize = Math.floor(files[0].size / 1024)
        if (filesize > 3000) {
          this.setState({
            selectedFile: '',
            showInvalidSize: true,
            showInvalidFormat: false,
            filePreviewSrc: '',
          })
        } else {
          this.setState({
            selectedFile: files[0],
            showInvalidSize: false,
            showInvalidFormat: false,
            filePreviewSrc: img,
          })
        }
      }
    } else {
      this.setState({
        selectedFile: null,
        filePreviewSrc: '',
      })
    }

    if (this.props.onChange && typeof this.props.onChange === 'function') {
      this.props.onChange(e)
    }
  }
  /* eslint no-alert: "off"*/
  cancelSelete = () => {
    if (window.confirm(this.props.removeConfirmMessage)) {
      this.setState({
        selectedFile: null,
        showInvalidSize: false,
        showInvalidFormat: false,
        filePreviewSrc: '',
      })
    }
  }

  render() {
    const { className, style, size } = this.props
    const classes = classNames({
      'file-upload': true,
      [`file-upload--${size}`]: size,
    })
    const labelClasses = classNames(
      {
        btn: true,
        [`btn-${size}`]: size,
      },
      className,
    )

    let fileError = ''
    if (this.state.showInvalidFormat) {
      fileError = this.props.invalidFormatError
    } else if (this.state.showInvalidSize) {
      fileError = this.props.invalidSizeError
    }
    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <div
        ref={fileUpload => {
          this.fileUpload = fileUpload
        }}
        className={classes}
        style={style}
      >
        <div className="upload-componet">
          <label className={labelClasses}>
            <input type="file" onChange={this.onChange} />
            {this.props.text}
          </label>
          <input
            disabled
            className="file-upload__text input"
            value={
              this.state.selectedFile ? (
                this.state.selectedFile.name
              ) : (
                this.props.defaultText
              )
            }
          />
          <span className="file-error">{fileError}</span>
        </div>
        {this.props.ForImage ? (
          <div className="format-text">
            <div>
              {this.props.formatInfo} {this.props.sizeInfo}
            </div>
            <div>{this.props.dimensions} </div>
          </div>
        ) : (
          undefined
        )}
        {this.props.ForImage && this.state.selectedFile ? (
          <div className="file-preview">
            <img
              alt=""
              width={`${this.props.thumbnailPercentage}%`}
              height={`${this.props.thumbnailPercentage}%`}
              src={this.state.filePreviewSrc}
            />
            <span className="icon-delete" onClick={this.cancelSelete} />
          </div>
        ) : (
          undefined
        )}
      </div>
    )
  }
}

FileUpload.displayName = 'AAUIFileUpload'
FileUpload.propTypes = propTypes
FileUpload.defaultProps = defaultProps
