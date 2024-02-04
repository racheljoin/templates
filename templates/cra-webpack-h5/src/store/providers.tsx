'use client';

/* Core */
import { Provider } from 'react-redux';

/* Instruments */
import { reduxStore } from './redux';

export const Providers = (props: React.PropsWithChildren) => <Provider store={reduxStore}>{props.children}</Provider>;

export default { reduxStore };
