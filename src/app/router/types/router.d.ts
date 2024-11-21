import { NavigationGuardNext, RouterLocationNormalized } from "vue-router"

export interface RouterContext {
	to: RouterLocationNormalized
	from: RouterLocationNormalized
	next: NavigationGuardNext
}
