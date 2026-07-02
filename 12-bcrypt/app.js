const bcrypt = require('bcrypt');
const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    return  bcrypt.hash(password, salt)
}
const verifyPassword= async (password, hash)=>{
    return  bcrypt.compare(password,hash)
}

const main = async()=>{
    const hash = await hashPassword('hello123');
    console.log(hash);
    console.log(await verifyPassword('hello123',hash ));
    console.log(await verifyPassword('wrongPass',hash ));

}

main()