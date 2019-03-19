import jwt from 'jsonwebtoken'

export const validate = function(req) {
	try {
		return jwt.verify(req.cookies.cm, process.env.STALLION_JWT_SECRET)
	} catch (error) {
		return {
			unauthorized: true,
			message: 'Unauthorized',
		}
	}
}
