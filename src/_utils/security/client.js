import { initAuth0 } from './auth';
import { securityConfig } from '$utils/config.public';

export default initAuth0({ ...securityConfig() });
