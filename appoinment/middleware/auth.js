const jwt =require('jsonwebtoken')


const protect=async(req,res,next)=>{
    try {
        const token=req.headers['authorization'].split(' ')[1]

        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err){
               return res.status(401).send({msg:'authorization invalid',success:false})
            }else{
                req.body.userId=decoded.userId


               
                next()
            }
    
        })
    
    } catch (error) {
         res.status(401).send({msg:'authorization invalid',success:false})
        
    }

  
}

module.exports={protect}