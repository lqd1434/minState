import { injectable, inject } from 'inversify'
import 'reflect-metadata'
import { Weapon, ThrowableWeapon, Warrior } from './interfaces'
import { TYPES } from './types'

@injectable()
class Katana implements Weapon {
	public hit() {
		return 'cut!'
	}
}

@injectable()
class Shuriken implements ThrowableWeapon {
	age: number = 18
	public throw() {
		return 'hit!'
	}
}

@injectable()
class Ninja {
	@inject(TYPES.Weapon) private _katana: Weapon
	@inject(TYPES.ThrowableWeapon) private _shuriken: ThrowableWeapon
	public fight() {
		return this._katana.hit()
	}
	public sneak() {
		return this._shuriken.throw()
	}
}

export { Ninja, Katana, Shuriken }
