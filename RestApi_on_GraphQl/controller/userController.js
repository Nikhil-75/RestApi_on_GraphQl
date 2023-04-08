const {users} =  require('../models/Users')


const register = async (req, res) => {

    const  { FirstName, LastName, username, email, password } = req.body;
    

    try {
        const user = await users.save({username, FirstName, LastName, email, password})

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({message: 'value is not find'});
    }

}



const  Login = async (req, res) => {
    const { email, password} = req.body;

    try { 
        const user = await users.findOne({ where: {username} });
       if(user && bcrypt.compare(password, user.password)){
           res.status(200)
       }
            const token = authService().issue({ id: user.id });
  
            return res.status(200).json({ token, user });
          
    } catch (error) {
        res.status(400).json({message: "unser not found"})
    }
 
} 

exports.getUser = async (req, res) => {
    try {
      const id = req.headers.user_id;
    
      const user = await userData.findOne({
        where: { id },
        attributes: { exclude: ["password"] },
      });
  
     
      res.status(200).json({ data: user });
    } catch (err) {
      res.status(400).json({ message: "user not get" });
    }
  };
  