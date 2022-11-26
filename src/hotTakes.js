import {randomInt} from 'crypto'
import {readFileSync} from 'fs'

const hotTakeData = JSON.parse(readFileSync(process.cwd() + '/hotTakeData.json').toString())

const placeholders = {
	language: () => hotTakeData.languages,
	technology: () => hotTakeData.technologies,
	tld: () => hotTakeData.tlds,
	thing: combineSources('languages', 'technologies'),
	anything: combineSources('languages', 'technologies', 'people', 'companies'),
	oneWordAnything: () => mappedPlaceholders('anything', it => it.replace(' ', ''))(),
	person: () => hotTakeData.people,
	company: () => hotTakeData.companies,
	group: combineSources('people', 'companies'),
	problem: () => hotTakeData.problems,
	entity: combineSources('languages', 'technologies', 'people', 'companies'),
	year: () => [randomInt(1500, 2022).toString()],
	age: () => [randomInt(1, 50).toString()],
	bigNumber: () => [randomInt(2, 100000).toString()],
	percentage: () => [randomInt(1, 100).toString()],
	oneWordThing: () => mappedPlaceholders('thing', it => it.replace(' ', ''))(users),
}


function isValidPlaceholder(value) {
	return Object.keys(placeholders).includes(value)
}

function combineSources(...source) {
	return () => hotTakeData[source[0]].concat(source.slice(1).flatMap(it => hotTakeData[it]))
}

function mappedPlaceholders(key, f) {
	return () => placeholders[key]().map(f)
}

function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export default function generateHotTake() {
    const take = randomElement(hotTakeData.takes)
	return take.replace(/{[\w|]+}/g, value => randomElement(value
		.slice(1, -1)// remove the {}
		.split('|') // split into options
		.filter(isValidPlaceholder) // filter out invalid placeholders
		.flatMap(it => placeholders[it]()))  // get the values for each placeholder
	)
}
