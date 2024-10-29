import router from '../helpers/router.helper'
import { getDataFromEsp32 } from '../controllers/esp.controller'
import { body } from 'express-validator'

router.post(`/get-data`,
    [
        body("status")
            .notEmpty()
            .withMessage("Email can't be empty"),
        body("weather")
            .notEmpty()
            .withMessage("Password can't be empty"),
    ],
    getDataFromEsp32
) 

export default router
