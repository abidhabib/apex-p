import NavBAr from './NavBAr';
import './Messages.css';
import MsgBox from './MsgBox';
const About = ({img}) => {
  console.log(img);
  return (
    <>
      <NavBAr />
      <h2 className="msg">
        Messages From Admin
      </h2>
      <div className="msg-box">
      <MsgBox/>
     <MsgBox Msg={"Hello"}/>
     <MsgBox Msg={"Hello Jani"}/>
     <MsgBox/>
     <MsgBox/>
     
     <MsgBox/>
      </div>
   
    </>
  );
};

export default About;
