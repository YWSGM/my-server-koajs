// 封装 router
import * as Router from 'koa-router';
import config from '../modules/db/default';
import user from '../api/controller/user';
import role from '../api/controller/role';

const router = new Router();

router.use(`${config.api_prefix}user`, user.routes(), user.allowedMethods());
router.use(`${config.api_prefix}role`, role.routes(), role.allowedMethods());

export default router;
