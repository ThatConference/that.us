import { initAuth0 } from './auth';
import { securityConfig } from '$utils/config.public';
import { securityConfig as securityConfigPrivate } from '$utils/config.private';

export default initAuth0({ ...securityConfig(), ...securityConfigPrivate() });
