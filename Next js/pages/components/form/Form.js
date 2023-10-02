import { Input,Button } from 'antd';

export default function Form(){
    return(
        <div>
            <span>Sign Up</span>
            <div className="formDiv"> 
                <div style={{display:'flex', justifyContent:"space-evenly"}}>
                    <span>
                        <label>First name:</label> 
                        <br/>
                        <Input placeholder="John" style={{width:"95%"}}  />
                    </span>
                    <span>
                        <label>Last name:</label> 
                        <br/>
                        <Input placeholder="Doe" style={{width:"95%"}}  />
                    </span>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <span>
                        <label>Email Address:</label> 
                        <br/>
                        <Input placeholder="abc@gmail.com" style={{width:"300px"}}  />
                        <br />
                    </span>
                    <span>
                        <label>Password:</label> 
                        <br/>
                        <Input placeholder="Enter your password" style={{width:"300px"}} />
                        <br />
                    </span>
                    <span>
                        <label>Confirm Password:</label> 
                        <br/>
                        <Input placeholder="Re-enter your password" style={{width:"300px"}} />
                        <br />
                        <Button type="primary" htmlType='submit'>Sign up</Button>
                    </span>
                        
                </div>
            </div>
        </div>
    )
}