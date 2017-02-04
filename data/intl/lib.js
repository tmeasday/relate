import locales from './locales';
import { setLocale } from './actions';

export function getInitialLocale(ctx) {
  if (!process.browser) {
    if (!ctx.req.session.user) {
      ctx.req.session.user = {}; // eslint-disable-line no-param-reassign
    }
    const locale = ctx.req.session.user.locale || ctx.req.language;

    if (Object.keys(locales).includes(locale)) {
      return locale;
    }
    console.warn('intl/lib warning: Unable to detect locale from HTTP context:', locale);
    ctx.req.session.user.locale = 'en'; // eslint-disable-line no-param-reassign
    return 'en';
  }
  return undefined;
}

export function mapDispatchToSetLocale(dispatch) {
  return {
    setLocale: async locale => dispatch(await setLocale(locale)),
  };
}