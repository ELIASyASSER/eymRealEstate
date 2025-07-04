import express from "express"
import { isAdminAuth, logAdmin } from "../controllers/logAdmin.controller.js"
import authenticateAdmin from "../middleware/authAdmin.js"
import { deleteUser } from "../controllers/dashboard.controller.js"

const router = express.Router()

router.route("/logAdmin").post(logAdmin)
router.route("/is-auth").get(authenticateAdmin,isAdminAuth)
export default  router