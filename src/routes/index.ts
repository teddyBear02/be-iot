import router from "../helpers/router.helper";
import AuthRouter from './auth.route'
import EspRouter from './esp.route'

router.use(
    [
        AuthRouter,
        EspRouter
    ]
)

export default router