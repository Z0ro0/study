import React, { useEffect, useState } from 'react';
import styles from '../styles/mypage.module.css';
import navStyles from '../styles/Navbar.module.css';
import logo from '../../public/logo.png';
import leftIcon from './free-icon-font-angle-left-3916934.svg';
import rightIcon from './free-icon-font-angle-right-3916924.svg';
import Image from 'next/image';

function MyPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  // calendar, studyTime 월 변경
  useEffect(() => {
    const setCalendar = (year, month) => {
      let firstDate = new Date(year, month - 1, 1);
      let firstDay = firstDate.getDay();
      let lastDate = new Date(year, month, 0).getDate();

      const setTitle = (year, month) => {
        let title_year = document.getElementById('title_year');
        if (title_year) {
          title_year.innerHTML = year;
        }
        let title_month = document.getElementById('title_month');
        if (title_month) {
          title_month.innerHTML = month;
        }
      };
      setTitle(year, month);

      const dateGridContainerDiv = document.getElementsByClassName('date-grid-container')[0];
      if (dateGridContainerDiv) {
        dateGridContainerDiv.innerHTML = '';

        for (let i = 1; i <= lastDate; i++) {
          let newDiv = document.createElement('div');
          newDiv.classList.add('grid-item');
          newDiv.innerHTML = i;
          dateGridContainerDiv.appendChild(newDiv);
        }

        let firstDateDiv = dateGridContainerDiv.getElementsByClassName('grid-item')[0];
        if (firstDateDiv) {
          firstDateDiv.style.gridColumnStart = firstDay + 1;
        }
      }
    };

    setCalendar(year, month);
  }, [year, month]);

  const prevMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth === 0) {
      newYear--;
      newMonth = 12;
    }
    setYear(newYear);
    setMonth(newMonth);
  };

  const nextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth === 13) {
      newYear++;
      newMonth = 1;
    }
    setYear(newYear);
    setMonth(newMonth);
  };

  // 총 studyTime
  var monthTotal = '02:26:00';

  // 최근 studyTime
  const [studyTimeData] = useState([
    { date: '5/25', time: '02:00:00' },
    { date: '5/26', time: '02:00:00' },
    { date: '5/27', time: '02:00:00' },
    { date: '5/28', time: '02:00:00' },
    { date: '5/29', time: '02:00:20' },
    { date: '5/30', time: '02:00:00' },
    { date: '5/31', time: '02:00:00' },
  ]);

  const renderStudyTimeRows = () => {
    return studyTimeData.map((item, index) => (
      <tr key={index}>
        <td className='studyDate'>{item.date}</td>
        <td className='studyTime'>{item.time}</td>
      </tr>
    ));
  };

  return (
    <div className={styles.App}>
      <nav className={navStyles.nav}>
        <div className={navStyles['nav-container']}>
          <a className={navStyles.logo} href="/">
            <Image className={navStyles['logo-img']} src={logo} alt="Logo" />
          </a>
          <ul className={navStyles['nav-list']}>
            <li className={navStyles.community}>
              <a href="Community">Community</a>
            </li>
            <li className={navStyles.mypage}>
              <a href="MyPage">My Page</a>
            </li>
          </ul>
        </div>
      </nav>

      <div id="container" className={styles.container}>
        <div id="container1" className={styles.container1}>
          <div id="user" className={styles.user}>
            <img id="profile" className={styles.profile} src="./img/user1.png" alt="profile" />

            <div id="userinfo" className={styles.userinfo}>
              <p className={styles.username}>yang hyewon</p>
              <p className={styles.useremail}>w2106@e-mirim.hs.kr</p>
              <button className={styles.userLogout}>LOGOUT</button>
            </div>
          </div>

          <div className={styles.totalTime}>
            <h1 className={styles.totalH1}>{year}년 {month}월 총 공부시간</h1>
            <span className={styles.totalSpan}>{monthTotal}</span>
          </div>
        </div>

        <div id="container2" className={styles.container2}>
          <div id="usertimecal" className={styles.usertimecal}>
            <table className={styles.studyTime}>
              <thead>
                <tr>
                  <th className={styles.studyTimeTh}>Date</th>
                  <th className={styles.studyTimeTh}>Time</th>
                </tr>
              </thead>
              <tbody>{renderStudyTimeRows()}</tbody>
            </table>
          </div>

          <div id="usercalendar" className={styles.usercalendar}>
            <div className={styles.calendar}>
              <div className={styles['flex-container']}>
                <div id="prev_btn" className={styles.prev_btn} onClick={prevMonth}>
                  <img src={leftIcon} className={styles['angle-icon']} alt="Prev" />
                </div>
                <h1 className={styles['calendar-h1']}>
                  <span id="title_year" className={styles.title_year}></span>년 <span id="title_month" className={styles.title_month}></span>월
                </h1>
                <div id="next_btn" className={styles.next_btn} onClick={nextMonth}>
                  <img src={rightIcon} className={styles['angle-icon']} alt="Next" />
                </div>
              </div>
              <div id="calendar" className={styles.calendar}>
                <div className={styles['grid-container-calendar']}>
                  <div className={styles['grid-item']}>일</div>
                  <div className={styles['grid-item']}>월</div>
                  <div className={styles['grid-item']}>화</div>
                  <div className={styles['grid-item']}>수</div>
                  <div className={styles['grid-item']}>목</div>
                  <div className={styles['grid-item']}>금</div>
                  <div className={styles['grid-item']}>토</div>
                </div>
                <div className={styles['date-grid-container']}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
