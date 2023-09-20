import NavBAr from './NavBAr';
import './Messages.css';
import MsgBox from './MsgBox';
const Message = ({msg}) => {
  return (
    <>
      <NavBAr />
      <h2 className="msg-m">
        Messages From Admin
      </h2>
      <div className="msg-box-m">
      <MsgBox Msg={msg}/>
    
     
   
      </div>
   
    </>
  );
};

export default Message;
