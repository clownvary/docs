import React from 'react'
import ReactDOM from 'react-dom'
import { FileUpload } from '../src/index'

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
  }

  onChange = e => {
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    console.log(files[0])
    console.log(files[0].name)
  }

  render() {
    return (
      <div>
        <form>
          <div style={{ fontFamily: 'ProximaNova, Arial, sans-serif' }}>
            <FileUpload thumbnailPercentage='5' style={{ border: '1px dotted red', padding: 20 }} ForImage onChange={this.onChange} /><br /><br />
            <FileUpload
              style={{ border: '1px dotted red', padding: 20 }}
              ForImage
              onChange={this.onChange}
              defaultText='没有选择任何文件'
              text='请选择文件'
              formatInfo='格式：只接受图片格式，其他格式都不合法哦。'
              sizeInfo='大小：文件大小不要超过3M哦。'
              dimensions='分辨率：最大宽度为2048，最大高度为1536'
              invalidSizeError='文件过大'
              invalidFormatError='文件格式不正确'
              removeConfirmMessage='您确定要删除已选择文件吗？'
              dropOnDocument={false}
              thumbnailPercentage='10'
            /><br /><br />
            <FileUpload style={{ border: '1px dotted red', padding: 20 }} dropOnDocument ForImage onChange={this.onChange} thumbnailPercentage='20' /><br /><br />
          </div>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
