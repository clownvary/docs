// import TinyMCE from 'react-tinymce'
// import React, { PureComponent } from 'react'
// import { string, func } from 'prop-types'

// import { noop, omit } from '../shared/utils'

// import { FormFieldAPIPropTypes } from './types'
// import connectForm from './connectForm'

// class TinyMCEEditor extends PureComponent {
//   static displayName = 'AAUITinyMCEEditor'

//   static propTypes = {
//     ...FormFieldAPIPropTypes,
//     defaultValue: string,
//     onBlur: func,
//     onChange: func,
//   }

//   static defaultProps = {
//     onBlur: noop,
//     onChange: noop,
//     defaultValue: '',
//     config: {
//       plugins: 'autolink link image lists print preview textcolor',
//       toolbar:
//         'undo redo | insert | styleselect | fontsizeselect | fontselect | bold italic | forecolor | backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
//       textcolor_cols: '5',
//       font_formats:
//         'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n;ProximaNova=ProximaNova,Arial,sans-serif',
//       fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
//     },
//   }

//   handleBlur = e => {
//     const { api: { onValidate }, onBlur } = this.props
//     const value = e.target.getContent()

//     onValidate(value)
//     onBlur(value)
//   }

//   handleChange = e => {
//     const { api: { setValue }, onChange } = this.props
//     const value = e.target.getContent()

//     setValue(value)
//     onChange(value)
//   }

//   render() {
//     const { defaultValue, value, ...rest } = this.props
//     return (
//       <TinyMCE
//         {...omit(rest, ['rules'])}
//         content={value || defaultValue}
//         onBlur={this.handleBlur}
//         onChange={this.handleChange}
//       />
//     )
//   }
// }

// export default connectForm()(TinyMCEEditor)
"use strict";