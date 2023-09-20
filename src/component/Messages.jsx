import NavBAr from './NavBAr';
import './Messages.css';
import MsgBox from './MsgBox';
const About = ({img}) => {
  console.log(img);
  return (
    <>
      <NavBAr />
      <h2 className="msg-m">
        Messages From Admin
      </h2>
      <div className="msg-box-m">
      <MsgBox/>
    
     
     <MsgBox/>
      </div>
   
    </>
  );
};

export default About;
