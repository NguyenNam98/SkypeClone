const nodemailer = require('nodemailer')
module.exports.sendMail = async (customerEmail, code) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
    let info = await transporter.sendMail({
        from: '"Michael👻" <sender@gmail.com>', // sender address
        to: customerEmail, // list of receivers
        subject: "Check register account", // Subject line
        html: `<h2>  MichaelName</h2>
        <b> Take this code fill in the blank in website: http://michaelChat.com/register</b><br>
        <h1>Code : ${code} </h1>` // html body
      });
    transporter.sendMail(info, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    })

}