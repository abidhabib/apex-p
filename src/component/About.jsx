import NavBAr from './NavBAr';
import './About.css';
const About = ({img}) => {
  console.log(img);
  return (
    <>
      <NavBAr />
    <div className="img-container">

<img src={img} alt="" srcset="" />      
    </div>
    <button className='abt-btn'>Keep Work , Keep Earining ❤️</button>

    </>
  );
};

export default About;
