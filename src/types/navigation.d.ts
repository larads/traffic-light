import { DrawerNavigationOptions } from '@react-navigation/drawer'

export interface CustomOptions extends DrawerNavigationOptions {
  icon: () => React.ReactElement
  isDivider?: boolean
  isFocused?: boolean
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      result_calc: { id: string }
      notice_details: { id: string }
      'result-list': undefined
    }
  }
}