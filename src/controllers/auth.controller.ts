import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { comparePassword, hashPassword } from '../helpers/auth.helper'
import { createToken } from '../helpers/jwtOAuth.helper'
import { User } from '../schemas'

//_________________LOGIN____________________//

export const login = async (req: Request, res: Response)   => {

    const data = matchedData(req)

    const result = validationResult(req)

    const user = await User.findOne({ email: data.email }).exec()

    if (!result.isEmpty()) {
        res.status(400).json(
            {
                error: result.array(),
                message: "Just fill empty filed",
                status: 400
            }
        )
        return;
    }

    if( ! user?.email ){
        res.status(401).json(
            {
                message: "Email does'nt exist !",
                status: 401
            }
        )
        return;
    }else if( !comparePassword( data.password, user.password )) {
        res.status(401).json(
            {
                message: "Wrong password !",
                status: 401
            }
        )
        return;
    }

    const token = createToken(user._id)
    const userFilter = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
    }

    
    res.status(200).json(
        {
            result: userFilter,
            message: "Login succeed !!!",
            status: 200,
            token: token
        }
    )
    
}

//__________________REGISTER____________________//

export const resgister = async (req: Request, res: Response) => {
    
    const result = validationResult(req)

    const data = matchedData(req)

    if (!result.isEmpty()) {
        res.status(400).send({
            error: result.array(),
            message: "Just fill empty filed",
            status: 400
        })
        return;
    }

    data.password = hashPassword(data.password)

    const newUser = new User(data)

    try {
        const saveUser = await newUser.save()

        const userFilter = {
            _id: saveUser._id,
            name: saveUser.name,
            email: saveUser.email,
            avatar: saveUser.avatar,
            role: saveUser.role,
        }

        res.status(201).send({
            result: userFilter,
            message: 'Create new user successfully !',
            status: 201
        })
        return;

    } catch (error) {
        res.status(400).send({
            message: "Email already used !!!",
            status: 400
        })
        return;
    }
}

  
//__________________LOGOUT____________________//

// export const logout = async (req:Request, res: Response) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.error('Failed to destroy session:', err);
//             return res.status(500).json({ message: 'Failed to logout' });
//         }
//         res.clearCookie('connect.sid');
//         return res.json(
//             { 
//                 message: 'Logout successful', 
//                 status: 200 
//             }
//             );
//     });
// }
