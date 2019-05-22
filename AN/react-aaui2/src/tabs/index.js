import Tabs from './Tabs'
import TabsHeader from './TabsHeader'
import TabsTitle from './TabsTitle'
import TabsContainer from './TabsContainer'
import getContext from '../shared/getContext'
import { tabsAPIShape } from '../shared/types'

const childContextTypes = {
  auiTabsAPI: tabsAPIShape,
}

Tabs.Header = TabsHeader
Tabs.Title = getContext(childContextTypes)(TabsTitle)
Tabs.Container = getContext(childContextTypes)(TabsContainer)

export default Tabs
