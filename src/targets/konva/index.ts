import { ReactType } from 'react'
import * as konva from 'react-konva'
import animated, {
  CreateAnimatedComponent,
} from '../../animated/createAnimatedComponent'
import * as Globals from '../../animated/Globals'
import { interpolate } from '../../interpolate'
import colorNames from '../../shared/colors'
import { config } from '../../shared/constants'
import createStringInterpolator from '../../shared/stringInterpolation'
import { useChain } from '../../useChain'
import { useSpring } from '../../useSpring'
import { useSprings } from '../../useSprings'
import { useTrail } from '../../useTrail'
import { useTransition } from '../../useTransition'

Globals.injectDefaultElement('Group')
Globals.injectStringInterpolator(createStringInterpolator)
Globals.injectColorNames(colorNames)
Globals.injectApplyAnimatedValues(
  (instance, props) => {
    if (instance.nodeType) {
      instance._applyProps(instance, props)
      return
    } else return false
  },
  style => style
)

type KonvaComponents = Pick<
  typeof konva,
  {
    [K in keyof typeof konva]: typeof konva[K] extends ReactType ? K : never
  }[keyof typeof konva]
>

const konvaElements: (keyof KonvaComponents)[] = [
  'Arc',
  'Arrow',
  'Circle',
  'Ellipse',
  'FastLayer',
  'Group',
  'Image',
  'Label',
  'Layer',
  'Line',
  'Path',
  'Rect',
  'RegularPolygon',
  'Ring',
  'Shape',
  'Sprite',
  'Star',
  'Tag',
  'Text',
  'TextPath',
  'Transformer',
  'Wedge',
]

type AnimatedWithKonvaElements = CreateAnimatedComponent<ReactType> &
  {
    [Tag in keyof KonvaComponents]: ReturnType<
      CreateAnimatedComponent<KonvaComponents[Tag]>
    >
  }

const extendedAnimated = konvaElements.reduce(
  (acc, element) => {
    acc[element] = animated(element as ReactType)
    return acc
  },
  animated as AnimatedWithKonvaElements
)

export {
  config,
  extendedAnimated as animated,
  interpolate,
  Globals,
  useSpring,
  useTrail,
  useTransition,
  useChain,
  useSprings,
}