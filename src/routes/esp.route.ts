import router from '../helpers/router.helper'
import { getDataFromEsp32 } from '../controllers/esp.controller'

router.post(`get-data`,getDataFromEsp32) // http://localhost:8080/get-data

export default router
