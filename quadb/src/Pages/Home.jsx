import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../CSS-files/Home.css"
import { IoMdArrowDropdown } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { IoToggle } from "react-icons/io5";
import DataItem from '../components/DataItem';
const Home = () => {
    const [seconds, setSeconds] = useState(60);
    const [cryptoData, setCryptoData] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(true);

  // Function to toggle the dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/cryptoData');
            const data = response.data;

            setCryptoData(data);
            console.log('Fetched data:', data);
    
            // Perform actions with the data (update UI, etc.)
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
      }, []); 

    useEffect(() => {
        const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
            if (prevSeconds === 1) {
                // Reset to 60 if it's the last second
                return 60;
            }
            // Decrease by 1 for each interval
            return prevSeconds - 1;
        });
    }, 1000);

    // Cleanup the interval when the component unmounts or on re-render
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='fulldiv'> 
        <div className='topmost'>
            <div className='title'>
                HODLINFO
            </div>
            <div className='buttons'>
                <div className='button' id='button1'>
                    <div className='text'>INR</div>
                    <div className='buttonsvg'><IoMdArrowDropdown/></div>
                </div>
                <div className='button' id='button2' onClick={toggleDropdown}>
                    <div className='text'>BTC</div>
                    <div className='buttonsvg'><IoMdArrowDropdown/></div>
                    {isDropdownOpen && (
                        <div className='dropdown-content'>
                        <p>BTC</p>
                        <p>ETH</p>
                        <p>USDT</p>
                        <p>XRP</p>
                        <p>TRX</p>
                        <p>DASH</p>
                        <p>ZEC</p>
                        <p>XEM</p>
                        <p>IOST</p>
                        </div>
                    )}
                </div>
                <div className='button' id='button3'>
                    <div className='text' style={{ marginLeft:0}}>BUY BTC</div>
                </div>
            </div>
            <div className='topleftthings'>
                <div className='outer-circle'>
                    <div className='inner-circle'>
                        <div className='circletext'>{seconds}</div>
                    </div>
                </div>
                <div className='telegrambutton'>
                    <div className='telegramsvg'><FaTelegramPlane/></div>
                    <div className='telegramtext'>Connect Telegram</div>
                </div>
                <div className='mode'><IoToggle/></div>
            </div>
        </div>
        <div className='belowtopmost'>
            <div className='titletopmost'>
                Best Price To Trade
            </div>
        </div>
        <div className='datavalues'>
            <div className='value'>
                <div className='percent'>0.1%</div>
                <div className='time'>5 Mins</div>
            </div>
            <div className='value'>
                <div className='percent'>1.08%</div>
                <div className='time'>1 Hour</div>
            </div>
            <div className='rupeesvalue'>
                <div>₹ 26,56,110</div>
            </div>
            <div className='value'>
                <div className='percent'>0.91%</div>
                <div className='time'>1 Day</div>
            </div>
            <div className='value'>
                <div className='percent'>2.01%</div>
                <div className='time'>7 Days</div>
            </div>
        </div>
        <div className='belowdatvalues'>Average BTC/INR net price including commission</div>
        <div className='headings'>
            <div className='headingtext' id='first'>#</div>
            <div className='headingtext'id='platform'>Platform</div>
            <div className='headingtext'id='ltp'>Last Traded Price</div>
            <div className='headingtext' id='bsp'>Buy / Sell Price</div>
            <div className='headingtext'id='diff'>Difference</div>
            <div className='headingtext' id='last'>Savings</div>
        </div>
        <div className='data'>
            {cryptoData.map((item, index) => (
                <React.Fragment key={index}>
                    {item && (
                        <DataItem
                        number={index + 1}
              platform={item.name || ''}
              ltp={`₹ ${Number(item.last).toFixed(3) || ''}`}
              bsp={`₹ ${Number(item.buy).toFixed(3) || ''}/₹ ${Number(item.sell).toFixed(3) || ''}`}
              diff={`${((item.sell - item.buy) / item.buy * 100).toFixed(2)}%`}
              save={`₹ ${(item.sell - item.buy).toFixed(3)}`}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
        <button className="fixed-button">Add Hodlinfo to home screen</button>
    </div>
  )
}

export default Home