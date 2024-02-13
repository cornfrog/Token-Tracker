import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const seededUsers = [
            {
                username: "test1",
                email: "test1@email.com",
                password: "123"
            },
            {
                username: "test2",
                email: "test2@email.com",
                password: "123"
            },
            {
                username: "test3",
                email: "test3@email.com",
                password: "123"
            }
        ]
        for (const user of seededUsers) {
            console.log("Current User: ", user)
            await User.query().insert(user)
        }
    }
}
export default UserSeeder