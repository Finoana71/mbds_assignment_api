const { User, UserSchema } = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt.helper');

async function login({ email, motDePasse }) {
  const user = await User.findOne({email});
  console.log("start identification");
  console.log(user);
  if(user == null) throw new Error("Incorrect Email or Password");
  if(bcrypt.compareSync(motDePasse, user.motDePasse)){
      console.log("Compare password");
      const token = jwt.generateAccessToken(email);
      return {...user.toJSON(), token}
  }
  throw new Error("Incorrect Email or Password");
}


async function register(params, execLogin = true){
  const {motDePasse} = params
  const salt = bcrypt.genSaltSync(10);
  params.motDePasse = bcrypt.hashSync(motDePasse, salt);
  params.state = 1;
  var user = new User(params)
  user = await user.save();
  if(!execLogin) return user
  user.motDePasse = motDePasse;
  return login(user);
}

module.exports = { login, register }