import config from "../../config"
import bcrypt from 'bcryptjs'


export const hashPassword = (password: string) => {
    const salt = Number(config.salt_round)
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}
export const checkPassword = (password: string, hashPassword: string) => {
    // const salt = Number(config.salt_round);
    const isMatched = bcrypt.compareSync(password, hashPassword);
    return isMatched
}

