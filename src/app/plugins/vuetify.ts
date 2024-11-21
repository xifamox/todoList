import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi
		}
	}
});

export default vuetify;
