import { myContainer } from './inversify.config'
import { TYPES } from './types'
import { Warrior } from './interfaces'
import { Ninja } from './entities'

const ninja = myContainer.get<Ninja>(TYPES.Warrior)

console.log(ninja.fight())
console.log(ninja)
