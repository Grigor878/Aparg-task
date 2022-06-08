import React, { useState, useEffect, useCallback, useRef } from 'react'
import './Home.scss'
import axios from 'axios';
// import Api from '../../../api/Api';
import loader from '../../../assets/loader.gif'
import { IoIosRefresh } from 'react-icons/io';
import { FaFilter } from 'react-icons/fa';
import { BsChevronDown, BsChevronUp, BsBookmark } from 'react-icons/bs';
import { BiLike, BiDislike } from 'react-icons/bi';
import { refreshPage } from '../../../helpers/Utils'

const Home = () => {

    const [accordion, setAccordion] = useState(-1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState('60000');
    const [order, setOrder] = useState('top');
    const [language, setLanguage] = useState('en,fr');

    const selectRef = useRef(null);

    const onToggleClick = (e) => {
        selectRef.current.classList.toggle("active");
    };

    const toggleAccordion = (index) => {
        if (index === accordion) {
            setAccordion(-1);
            return
        }
        setAccordion(index);
    }

    const fetchData = useCallback(async () => {
        const url = `https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories?limit=20&languages=${language}&order=${order}`
        try {
            const response = await axios.get(url);
            // console.log(response.data.stories);
            setData(response.data.stories);
            setLoading(true);
        } catch (error) {
            console.warn(`Error: ${error.message}`);
        }
    }, [language, order])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetchData();
    //         console.log('updated')
    //       }, time)
    //       return () => clearInterval(interval)
    // }, [fetchData,time])

    const handleReset = () => [
        setOrder('top'),
        setLanguage('en,fr,de'),
    ]

    return (
        <main className='home'>
            <div className='home__top'>
                <h2 className='home__title'>Watchlist Name</h2>

                <div className='home__btns'>
                    <button className='refresh__btn' onClick={refreshPage}><IoIosRefresh className='btn__icons refresh' />Refresh</button>
                    <button className='filter__btn' onClick={onToggleClick}><FaFilter className='btn__icons filter' />Filters</button>
                </div>
            </div>

            <div className='filter__card' ref={selectRef}>
                <select className='select__autofresh' name="autofresh" onChange={e => setTime(e.target.value)}>
                    <option value="60000" >1 min</option>
                    <option value="10000">10 sec</option>
                    <option value="30000">30 sec</option>
                    <option value="600000" >10 min</option>
                </select>

                <select className='select__order' name="order" onChange={e => setOrder(e.target.value)}>
                    <option value="top">Top Rated</option>
                    <option value="latest">Latest</option>
                    <option value="most">Most Read</option>
                    <option value="popular">Popular</option>
                </select>

                <select className='select__language' name="languages" onChange={e => setLanguage(e.target.value)}>
                    <option value="en,fr">Select/Unselect All</option>
                    <option value="en">English</option>
                    <option value="de">German</option>
                    <option value="fr">French</option>
                </select>

                <button className='select__reset' onClick={handleReset}>RESET</button>
            </div>

            {!loading ? <img src={loader} alt="loading" style={{ marginTop: "20px", width: "100px" }} /> :
                <div className='accordion'>
                    {data.map((item, index) => (
                        <div key={item.id} onClick={() => toggleAccordion(index)}>
                            <div className='accordion__head'>
                                <div className='accordion__head-left'>
                                    <img className='accordion__head-img' src={item.imageUrls} alt="img" />
                                    <div className="accordion__head-context">
                                        <h3>{item.title}</h3>
                                        <p className={accordion === index ? 'open' : 'close'}>
                                            {item.description}
                                        </p>
                                        <div className='accordion__head-domain'>
                                            <img className='accordion__head-icon' src={item.domain_cached_logo_url} alt="img" />
                                            <p>{item.domain_name}</p>
                                            <span>{item.publishTime.slice(0, -14).slice(5)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='accordion__head-right'>
                                    <p>{item.score}%</p>
                                    <div className='accordion__head-icons'>
                                        {accordion === index ?
                                            (
                                                <BsChevronUp className='accordion__chevron' />
                                            )
                                            :
                                            (
                                                <BsChevronDown className='accordion__chevron' />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='accordion__open'>
                                <div className={accordion === index ? 'open accordion__open-btns' : 'close'}>
                                    <button className='accordion__open-btn'><BiLike className='accardion__open-icon' />Like</button>
                                    <button className='accordion__open-btn'><BiDislike className='accardion__open-icon' />Dislike</button>
                                    <button className='accordion__open-btn'><BsBookmark className='accardion__open-icon' />Bookmark</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </main>
    )
}

export default Home
