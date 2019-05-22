import React from 'react'
import ReactDOM from 'react-dom'
import { FileUpload } from '../src/index'

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
  }

  onChange = e => {
    let files = [{}]
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
            <FileUpload size='xs' onChange={this.onChange} text="上传文件">Hello World</FileUpload>
            <br /><br />
            <FileUpload /><br /><br />
            <FileUpload size='sm' onChange={this.onChange} text="Select One" defaultText="No file selected" /><br /><br />
            <FileUpload size='lg' onChange={this.onChange} text="选择文件" defaultText="还没有选择文件哦" /><br /><br />
            <FileUpload size='xl' onChange={this.onChange} text="Choose One" defaultText="No Choose File" /><br /><br />
            <FileUpload size='sm' onChange={this.onChange} text="Select One" className="btn-secondary" /><br /><br />
            <FileUpload size='lg' onChange={this.onChange} className="btn-primary" text="选择文件" defaultText="请先选择文件！" /><br /><br />
            <FileUpload size='xl' onChange={this.onChange} className="btn-strong" text="Choose One" /><br /><br />
          </div>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
