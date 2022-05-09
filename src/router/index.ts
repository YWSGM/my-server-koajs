// 封装 router
import * as Router from 'koa-router';
import user from '../api/controller/user';
import role from '../api/controller/role';

const router = new Router();

router.use('/user', user.routes(), user.allowedMethods());
router.use('/role', role.routes(), role.allowedMethods());

export default router;
