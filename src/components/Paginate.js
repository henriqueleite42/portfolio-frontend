// External Import
import React from 'react';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import '../styles/components/Paginate.scss';

// Render
const Paginate = ({ active, total, change }) => {
  /**
   *
   * Buttons
   *
   */
  // Add First Page Button
  let btn = [1];

  // Add Buttons
  if (total <= 9) { // < 1 2 3 4 (5) 6 7 8 9 >
    if (total > 2) {
      for (let i = 2; i < total; i++) {
        btn.push(i)
      }
    }
  } else if (active <= 5) { // < 1 2 3 4 (5) 6 7 ... 10 >
    for (let i = 2; i <= 7; i++) {
      btn.push(i)
    }

    btn.push("...");
  } else if (active >= (total - 4)) { // < 1 ... 14 15 (16) 17 18 19 20 >
    btn.push("...");

    for (let i = (active - 2); i < total; i++) {
      btn.push(i);
    }
  } else { // < 1 ... 4 5 (6) 7 8  ... 20 > || < 1 ... 13 14 (15) 16 17 ... 20 >
    btn.push("...")

    for (let i = (active - 2); i <= (active + 2); i++) {
      btn.push(i);
    }

    btn.push("...")
  }

  // Add Last Page Button
  if (total !== 1) {
    btn.push(total);
  }
  /**
   *
   * Change Page Func
   *
   */
  const changePage = page => {
    if (active !== page) change(page);
  }
  /**
   *
   * Prev And Next Btn
   *
   */
  const getBtn = type => {
    switch (type) {
      case "prev":
        if (active !== 1) {
          return (<div className="paginate-item" onClick={ () => changePage((active - 1)) }>
            <FontAwesomeIcon icon="angle-left"/>
          </div>);
        } else {
          return (<div className="paginate-item disable">
            <FontAwesomeIcon icon="angle-left"/>
          </div>);
        }
      case "next":
        if (active !== total) {
          return (<div className="paginate-item" onClick={ () => changePage((active + 1)) }>
            <FontAwesomeIcon icon="angle-right"/>
          </div>);
        } else {
          return (<div className="paginate-item disable">
            <FontAwesomeIcon icon="angle-right"/>
          </div>);
        }
      default:
        return;
    }
  }
  /**
   *
   * Render
   *
   */
  return (
    <div id="paginate-main">
      { getBtn("prev") }
      {
        btn.map((item, index) => {
          return (
            <div
              key={ index }
              className={
                "paginate-item"+
                (active === item ? " active" : "")+
                (item === "..." ? " disable" : "")
              }
              onClick={ () => changePage(item) }
            >
              { item }
            </div>
          )
        })
      }
      { getBtn("next") }
    </div>
  );
}

export default Paginate;