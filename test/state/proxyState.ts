import { create } from '../../src/minState/proxyStore'

export const usePerson = create<Person>({
	name: 'jack',
	age: 10,
})

interface Person {
	name: string
	age: number
}
