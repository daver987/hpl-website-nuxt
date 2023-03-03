<template>
	<div :class="['vue-tel-input', styleClasses, { disabled: disabled }]">
		<div class="vti__dropdown" :class="{ open: open }" @click="toggleDropdown">
			<span class="vti__selection">
				<span
					v-if="dropdownOptions.showFlags"
					:class="['vti__flag', activeCountryCode.toLowerCase()]"
				></span>
			</span>
			<ul v-if="open" ref="list" class="vti__dropdown-list">
				<li
					v-for="(pb, index) in sortedCountries"
					:key="pb.iso2 + (pb.preferred ? '-preferred' : '')"
					@click="choose(pb)"
					:aria-selected="activeCountryCode === pb.iso2 && !pb.preferred"
				>
					<div class="vti__flag-wrapper">
						<span
							v-if="dropdownOptions.showFlags"
							:class="['vti__flag', pb.iso2.toLowerCase()]"
						/>
					</div>
				</li>
			</ul>
		</div>
		<input
			v-model="phone"
			:class="['vti__input', inputOptions.styleClasses]"
			:placeholder="parsedPlaceholder"
			@input="onInput"
		/>
	</div>
</template>

<script>
const props = {
	dropdownOptions: {
		required: false,
		default: false,
	},
}
export default {
	data() {
		return {
			phone: '',
			activeCountryCode: '',
			open: false,
			filteredCountries: [],
			sortedCountries: [],
			phoneObject: {},
		}
	},
	computed: {
		activeCountry() {
			return this.findCountry(this.activeCountryCode)
		},
	},
	watch: {
		activeCountry(value, oldValue) {
			if (!value && oldValue?.iso2) {
				this.activeCountryCode = oldValue.iso2
				return
			}
			if (value?.iso2) {
				this.$emit('country-changed', value)
			}
		},
		'phoneObject.countryCode': function (value) {
			if (!value) {
				return
			}
			this.activeCountryCode = value || ''
		},
		'phoneObject.formatted': function (value) {
			if (!this.autoFormat) {
				return
			}
			this.emitInput(value)
		},
	},
	mounted() {
		this.initializeCountry()
			.then(() => {
				if (!this.phone && this.activeCountryCode) {
					this.phone = `+${this.activeCountryCode}`
				}
				this.$emit('validate', this.phoneObject)
			})
			.catch(console.error)
			.then(() => {
				this.finishMounted = true
			})
	},
	methods: {
		findCountry(iso = '') {
			return this.filteredCountries.find(
				(country) => country.iso2 === iso.toUpperCase()
			)
		},
		choose(country) {
			let parsedCountry = country
			if (typeof parsedCountry === 'string') {
				parsedCountry = this.findCountry(parsedCountry)
			}

			if (!parsedCountry) {
				return
			}

			if (
				this.phone?.[0] === '+' &&
				parsedCountry.iso2 &&
				this.phoneObject.nationalNumber
			) {
				this.activeCountryCode = parsedCountry.iso2
				this.phone = parsePhoneNumberFromString(
					this.phoneObject.nationalNumber,
					parsedCountry.iso2
				).formatInternational()
				return
			}

			if (parsedCountry) {
				this.activeCountryCode = parsedCountry.iso2 || ''
			}

			this.emitInput(this.phone)
		},
		initializeCountry() {
			return new Promise((resolve) => {
				if (this.activeCountryCode) {
					this.choose(this.activeCountryCode)
					resolve()
					return
				}

				this.choose(this.preferredCountries[0] || this.filteredCountries[0])
				resolve()
			})
		},
		emitInput(value) {
			this.$emit('input', value, this.phoneObject, this.$refs.input)
		},
		reset() {
			this.open = false
		},
	},
}
</script>
