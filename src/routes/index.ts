import router from "../helpers/router.helper";
import AuthRouter from './auth.route'

router.use(
    [
        AuthRouter,
    ]
)

export default router