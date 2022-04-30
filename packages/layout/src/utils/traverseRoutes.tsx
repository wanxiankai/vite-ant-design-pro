import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RoutesType } from '../types'

let ComponentKeys: string[] = []
let ComponentMemo: Record<string, any> = {}

export const traverseRoutes = (
  routes?: RoutesType,
  clearCache = false
): RoutesType => {
  if (clearCache === true) {
    ComponentMemo = {}
    ComponentKeys = []
  }

  return routes?.map((route) => {
    const { redirect } = route
    let { element, component, icon } = route

    if (typeof component === 'string') {
      // remove ./ or ../
      const name = component.replace(/^\.\.?\//, '')

      if (clearCache === true || !ComponentKeys.length) {
        ComponentMemo = import.meta.glob('$ROOT/**/*.tsx')
        ComponentKeys = Object.keys(ComponentMemo)
      }

      const componentPath = ComponentKeys.find((value) => {
        return [
          `$ROOT/${name}.tsx`,
          `$ROOT/${name}.jsx`,
          `$ROOT/${name}/index.tsx`,
          `$ROOT/${name}/index.jsx`,
        ].includes(value)
      })

      if (componentPath && Reflect.has(ComponentMemo, componentPath))
        component = lazy(ComponentMemo[componentPath])
    }

    if (redirect !== undefined)
      element = <Navigate replace to={redirect}></Navigate>

    if (typeof icon === 'string') {
      const iconName =
        (icon as string).slice(0, 1).toUpperCase() + (icon as string).slice(1)
      const IconComponent = lazy(
        () => import(`@ant-design/icons/es/icons/${iconName}Outlined`)
      )
      icon = <IconComponent />
    }

    return {
      ...route,
      component,
      element,
      icon,
      children: traverseRoutes(route.children),
    }
  }) as RoutesType
}
