const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body
        const profile_pic = `https://robohash.org/${username}.png`
        const db = req.app.get('db')

        let [user] = await db.find_user_by_username(username)
        if(user){
            return res.status(400).send('username already exists')
        }
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        let [newUser] = await db.create_user(username, hash, profile_pic)

        req.session.user = newUser

        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const{username, password} = req.body
        const db = req.app.get('db')

        let [user] = await db.find_user_by_username(username)
        if(!user){
            return res.status(401).send('Username/Password does not exist')
        }
        let authenticated = bcrypt.compareSync(password, user.password)
        if(!authenticated){
            return res.status(401).send('Username/Password does not exist')
        }
        delete user.password

        req.session.user = user
        res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
    },
    getUser: async (req, res) => {
        let user = req.session.user
        const db = req.app.get('db')
        if(user){
            await db.find_user_by_username(username)
        }else{
            return res.status(404)
        }
    }
}