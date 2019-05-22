import createFieldLayout from './createFieldLayout'

const HFormFieldLayout = createFieldLayout({
  span: [3, 6, 3],
  fluid: false,
  align: 'center',
  className: 'form__group--horizontal',
})

export default HFormFieldLayout
