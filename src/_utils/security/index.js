import { initAuth0 } from './auth';
import { securityConfig } from '$utils/config';

export default initAuth0(securityConfig());
